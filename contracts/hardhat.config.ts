import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

// const providerApiKey = process.env.ALCHEMY_API_KEY;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        "*": {
          "*": [
            "abi",
            "evm.bytecode",
            "evm.deployedBytecode",
            "metadata", // <-- add this
          ],
        },
      },
    },
  },
  defaultNetwork: "sepolia",
  // defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: "0xe726c27385c740A9C3B026891BA0e366B344E318",
    },
    wallet5: {
      default: "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D",
    },
  },
  networks: {
    sepolia: {
      url: "https://distinguished-quiet-vineyard.ethereum-sepolia.quiknode.pro/601cc596d2d34815b2b0bd57d6676edf6f4490aa",
      accounts: [deployerPrivateKey!],
      chainId: 11155111,
      verify: {
        etherscan: {
          apiKey: etherscanApiKey,
        },
      },
    },
  },
  verify: {
    etherscan: {
      apiKey: `${etherscanApiKey}`,
    },
  },
};

export default config;
