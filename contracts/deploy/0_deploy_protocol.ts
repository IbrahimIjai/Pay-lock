import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

const pyusd_sepolia = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9";
const INITIAL_RATE = 0.932; //pyusd price against usd
const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: // getChainId,
HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const realRate = ethers.utils.parseUnits(INITIAL_RATE.toString(), 18);
  console.log({ deployer });
  await deploy("PayLockProtocol", {
    from: deployer,
    args: [pyusd_sepolia, deployer],
    log: true,
    // deterministicDeployment: false,
    autoMine: true,
  });
};

func.tags = ["PayLockProtocol", "PY"];

export default func;
