export const PAYLOCK_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_pyusd",
				type: "address",
			},
			{
				internalType: "address",
				name: "_rateUpdater",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "encryptedAccessId",
				type: "string",
			},
		],
		name: "AccessIdGenerated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "client",
				type: "address",
			},
		],
		name: "DisputeRaised",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "refunded",
				type: "bool",
			},
		],
		name: "DisputeResolved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "vendor",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "client",
				type: "address",
			},
		],
		name: "EscrowReleased",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "payrate",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
		],
		name: "PYUSDRateUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "serviceId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "client",
				type: "address",
			},
		],
		name: "PaymentProcessed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "serviceId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "vendor",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "priceUSD",
				type: "uint256",
			},
		],
		name: "ServiceCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "serviceId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "priceUSD",
				type: "uint256",
			},
		],
		name: "ServiceUpdated",
		type: "event",
	},
	{
		inputs: [],
		name: "PYUSD",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "usdAmount",
				type: "uint256",
			},
		],
		name: "calculatePYUSDAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "priceUSD",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isEscrow",
				type: "bool",
			},
		],
		name: "createService",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "currentPYUSDRate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "client",
				type: "address",
			},
		],
		name: "getClientTransactions",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "vendor",
				type: "address",
			},
		],
		name: "getVendorServices",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "serviceId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "pyusdAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "currentPyusdRate",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "encryptedAccessId",
				type: "string",
			},
		],
		name: "processPayment",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "rateUpdater",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
		],
		name: "releaseEscrow",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "services",
		outputs: [
			{
				internalType: "address",
				name: "vendor",
				type: "address",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "priceUSD",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isEscrow",
				type: "bool",
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool",
			},
			{
				components: [
					{
						internalType: "uint256",
						name: "pyusdAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "pyusdRate",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "settlementTime",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isSettled",
						type: "bool",
					},
				],
				internalType: "struct PayLockProtocol.SettlementDetails",
				name: "settlementDetails",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "transactions",
		outputs: [
			{
				internalType: "uint256",
				name: "serviceId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "client",
				type: "address",
			},
			{
				internalType: "enum PayLockProtocol.TransactionStatus",
				name: "status",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "encryptedAccessId",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newRate",
				type: "uint256",
			},
		],
		name: "updatePYUSDRate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "serviceId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "priceUSD",
				type: "uint256",
			},
		],
		name: "updateService",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "transactionId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "accessId",
				type: "string",
			},
		],
		name: "verifyAccessId",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
] as const;
