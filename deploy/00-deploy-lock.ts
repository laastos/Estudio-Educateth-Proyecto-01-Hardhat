import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config.ts";
import verify from "../helper-functions.ts";

const deployLock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const currentTime: number = Math.floor(Date.now() / 1000);
  const unlockTime: number = currentTime + 60;

  const args: any[] = [
    unlockTime, // _unlockTime (1 minute)
  ];

  log("------------------------------------");
  log("Deploying Lock with unlock time of 1 minute \n");

  const lock: DeployResult = await deploy("Lock", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name)) {
    await verify(lock.address, args);
  }
};

export default deployLock;
