// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PayLock Protocol
 * @notice A protocol for secure service payments and escrow management using PYUSD
 */
contract PayLockProtocol is Ownable, ReentrancyGuard {
	using EnumerableSet for EnumerableSet.UintSet;
	using Counters for Counters.Counter;

	IERC20 public immutable PYUSD;
	Counters.Counter private _serviceIds;
	Counters.Counter private _transactionIds;
	uint256 public currentPYUSDRate; // Rate with 18 decimals (1e18 = 1 USDC)
	address public rateUpdater;

	// Structs
	struct SettlementDetails {
		uint256 pyusdAmount;
		uint256 pyusdRate; // Rate against USDC (e.g., 0.93 * 1e18)
		uint256 settlementTime;
		bool isSettled;
	}

	struct Service {
		address vendor;
		string name;
		string description;
		uint256 priceUSD; // Price in USD (with 18 decimals)
		bool isEscrow; // If true, requires confirmation before release
		bool isActive;
		SettlementDetails settlementDetails;
	}

	struct Transaction {
		uint256 serviceId;
		address client;
		TransactionStatus status;
		uint256 timestamp;
		string encryptedAccessId; // Stored encrypted access ID (generated off-chain)
	}

	enum TransactionStatus {
		PENDING,
		PAID,
		COMPLETED,
		DISPUTED,
		REFUNDED
	}

	// State Variables
	mapping(address => EnumerableSet.UintSet) private vendorServices;
	mapping(uint256 => Service) public services;
	mapping(uint256 => Transaction) public transactions;
	mapping(address => EnumerableSet.UintSet) private clientTransactions;

	// Events
	event ServiceCreated(
		uint256 indexed serviceId,
		address indexed vendor,
		string name,
		uint256 priceUSD
	);
	event ServiceUpdated(
		uint256 indexed serviceId,
		string name,
		uint256 priceUSD
	);
	event PaymentProcessed(
		uint256 indexed transactionId,
		uint256 indexed serviceId,
		address indexed client
	);
	event EscrowReleased(
		uint256 indexed transactionId,
		address indexed vendor,
		address indexed client
	);
	event AccessIdGenerated(
		uint256 indexed transactionId,
		string encryptedAccessId
	);
	event DisputeRaised(uint256 indexed transactionId, address indexed client);
	event DisputeResolved(uint256 indexed transactionId, bool refunded);
	event PYUSDRateUpdated(uint256 payrate, uint256 timestamp);

	// Constructor
	constructor(address _pyusd, address _rateUpdater) {
		PYUSD = IERC20(_pyusd);
		rateUpdater = _rateUpdater;
		currentPYUSDRate = 1e18; // Initialize at 1:1
	}

	// Vendor Functions
	function createService(
		string memory name,
		string memory description,
		uint256 priceUSD,
		bool isEscrow
	) external returns (uint256) {
		_serviceIds.increment();
		uint256 newServiceId = _serviceIds.current();

		services[newServiceId] = Service({
			vendor: msg.sender,
			name: name,
			description: description,
			priceUSD: priceUSD,
			isEscrow: isEscrow,
			isActive: true,
			settlementDetails: SettlementDetails({
				pyusdAmount: 0,
				pyusdRate: 0,
				settlementTime: 0,
				isSettled: false
			})
		});

		vendorServices[msg.sender].add(newServiceId);

		emit ServiceCreated(newServiceId, msg.sender, name, priceUSD);
		return newServiceId;
	}

	function updateService(
		uint256 serviceId,
		string memory name,
		string memory description,
		uint256 priceUSD
	) external {
		require(services[serviceId].vendor == msg.sender, "Not service owner");
		require(services[serviceId].isActive, "Service not active");

		Service storage service = services[serviceId];
		service.name = name;
		service.description = description;
		service.priceUSD = priceUSD;

		emit ServiceUpdated(serviceId, name, priceUSD);
	}

	// Payment Functions
	function processPayment(
		uint256 serviceId,
		uint256 pyusdAmount,
		uint256 currentPyusdRate,
		string memory encryptedAccessId
	) external nonReentrant {
		Service storage service = services[serviceId];
		require(service.isActive, "Service not active");
		require(pyusdAmount > 0, "Invalid amount");

		// Calculate required PYUSD amount based on USD price and current rate
		uint256 requiredPyusdAmount = calculatePYUSDAmount(service.priceUSD);

		require(pyusdAmount >= requiredPyusdAmount, "Insufficient payment");

		// Process payment
		require(
			PYUSD.transferFrom(msg.sender, address(this), pyusdAmount),
			"Transfer failed"
		);

		// Create transaction
		_transactionIds.increment();
		uint256 transactionId = _transactionIds.current();

		transactions[transactionId] = Transaction({
			serviceId: serviceId,
			client: msg.sender,
			status: TransactionStatus.PAID,
			timestamp: block.timestamp,
			encryptedAccessId: encryptedAccessId
		});

		clientTransactions[msg.sender].add(transactionId);

		// If not escrow, release payment immediately
		if (!service.isEscrow) {
			require(
				PYUSD.transfer(service.vendor, pyusdAmount),
				"Transfer failed"
			);
			transactions[transactionId].status = TransactionStatus.COMPLETED;
		}

		service.settlementDetails = SettlementDetails({
			pyusdAmount: pyusdAmount,
			pyusdRate: currentPyusdRate,
			settlementTime: block.timestamp,
			isSettled: !service.isEscrow
		});

		emit PaymentProcessed(transactionId, serviceId, msg.sender);
		emit AccessIdGenerated(transactionId, encryptedAccessId);
	}

	// Escrow Functions
	function releaseEscrow(uint256 transactionId) external {
		Transaction storage txn = transactions[transactionId];
		Service storage service = services[txn.serviceId];

		require(msg.sender == service.vendor, "Not vendor");
		require(txn.status == TransactionStatus.PAID, "Invalid status");
		require(service.isEscrow, "Not escrow service");

		require(
			PYUSD.transfer(
				service.vendor,
				service.settlementDetails.pyusdAmount
			),
			"Transfer failed"
		);
		txn.status = TransactionStatus.COMPLETED;
		service.settlementDetails.isSettled = true;

		emit EscrowReleased(transactionId, service.vendor, txn.client);
	}

	// Verification Functions
	function verifyAccessId(
		uint256 transactionId,
		string memory accessId
	) external view returns (bool) {
		Transaction storage txn = transactions[transactionId];
		// In production, implement proper verification logic
		return
			keccak256(abi.encodePacked(accessId)) ==
			keccak256(abi.encodePacked(txn.encryptedAccessId));
	}

	function calculatePYUSDAmount(
		uint256 usdAmount
	) public view returns (uint256) {
		// usdAmount is in USD with 18 decimals
		// currentPYUSDRate is PYUSD/USDC rate with 18 decimals
		// Result should be in PYUSD with 6 decimals

		// Example:
		// If paying $100 USD and PYUSD = 0.93 USDC
		// usdAmount = 100 * 1e18
		// currentPYUSDRate = 0.93 * 1e18
		// Required PYUSD = (100 * 1e18) * 1e6 / (0.93 * 1e18)

		uint256 pyusdAmount = (usdAmount * 1e6) / currentPYUSDRate;
		return pyusdAmount;
	}

	//Admin functions

	function updatePYUSDRate(uint256 newRate) external {
		require(msg.sender == rateUpdater, "Not authorized");
		require(newRate > 0, "Invalid rate");
		currentPYUSDRate = newRate;
		emit PYUSDRateUpdated(newRate, block.time);
	}

	// View Functions
	function getVendorServices(
		address vendor
	) external view returns (uint256[] memory) {
		uint256 length = vendorServices[vendor].length();
		uint256[] memory result = new uint256[](length);
		for (uint256 i = 0; i < length; i++) {
			result[i] = EnumerableSet.at(vendorServices[vendor], i);
		}
		return result;
	}

	function getClientTransactions(
		address client
	) external view returns (uint256[] memory) {
		uint256 length = clientTransactions[client].length();
		uint256[] memory result = new uint256[](length);
		for (uint256 i = 0; i < length; i++) {
			result[i] = EnumerableSet.at(clientTransactions[client], i);
		}
		return result;
	}
}
