import { ethers } from "ethers";
import { vars } from "hardhat/config";
import { Provider, Wallet } from "zksync-ethers";

async function main() {
    const CONTRACT_ADDRESS = "0x03B870C5C86a27794b3d2C55831b873f41Ba83d3";
    const provider = new Provider("https://api.testnet.abs.xyz");
    const wallet = new Wallet(vars.get("DEPLOYER_PRIVATE_KEY"), provider);

    const contractABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function ownerOf(uint256 tokenId) view returns (address)",
        "function tokenURI(uint256 tokenId) view returns (string)"
    ];

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);
    const ownerAddress = await wallet.getAddress();

    try {
        const balance = await contract.balanceOf(ownerAddress);
        console.log("Number of tokens owned:", balance.toString());

        const tokenId = 0;
        const owner = await contract.ownerOf(tokenId);
        console.log("Token ID:", tokenId);
        console.log("Owner:", owner);

        const uri = await contract.tokenURI(tokenId);
        console.log("Token URI:", uri);

    } catch (error) {
        console.error("Error:", error);
    }
}

main().catch(console.error);