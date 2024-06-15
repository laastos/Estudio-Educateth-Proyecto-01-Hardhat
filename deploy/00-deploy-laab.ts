import { run } from "hardhat";
import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config.ts";
import verify from "../helper-functions.ts";

const deployLAAB: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args: any[] = [];

  log("------------------------------------");
  log("Deploying LAAB \n");
  log("Account: " + deployer + "\n");
  log("Balance: " + (await hre.ethers.provider.getBalance(deployer)) + "\n");

  const laab: DeployResult = await deploy("LAAB", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  // Verify Contract on Etherscan
  if (network.name === "arbitrumSepolia") {
    log("------------------------------------");
    log("Verifying LAAB \n");

    await run("verify:verify", {
      address: laab.address,
      constructorArguments: args,
    });
  }

  if (!developmentChains.includes(network.name)) {
    await verify(laab.address, args);
  }
};

export default deployLAAB;
