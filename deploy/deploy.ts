import { Deployer } from "@matterlabs/hardhat-zksync";
import { vars } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";

export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running deploy script`);

    const PRIVATE_KEY = vars.get("DEPLOYER_PRIVATE_KEY");
    if (!PRIVATE_KEY) {
        throw new Error("Private key not provided");
    }

    // Create provider and wallet
    const provider = new Provider("https://api.testnet.abs.xyz");
    const wallet = new Wallet(PRIVATE_KEY).connect(provider);

    // Create deployer object and load the artifact
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact("SoulBoundToken");

    // Deploy this contract
    console.log("Deploying SoulBoundToken...");
    const sbtContract = await deployer.deploy(artifact);
    const contractAddress = await sbtContract.getAddress();
    console.log(`SoulBoundToken was deployed to ${contractAddress}`);
}