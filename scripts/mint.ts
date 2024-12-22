import { ethers } from "ethers";
import { vars } from "hardhat/config";
import { Provider, Wallet } from "zksync-ethers";

async function main() {
    // New contract address
    const CONTRACT_ADDRESS = "0x03B870C5C86a27794b3d2C55831b873f41Ba83d3";

    // Your metadata URI from Pinata
    const TOKEN_URI = "ipfs://bafkreibqxx2pciujr4fbvlgthca4areibk5vsbzq3fnkze4nwjboddavme";

    // Initialize provider and wallet
    const provider = new Provider("https://api.testnet.abs.xyz");
    const wallet = new Wallet(vars.get("DEPLOYER_PRIVATE_KEY"), provider);

    // Get the contract ABI
    const contractABI = [
        "function mint(address to, string memory uri) public returns (uint256)"
    ];

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

    // Get the wallet address
    const recipientAddress = await wallet.getAddress();

    try {
        console.log("Minting SBT...");
        const tx = await contract.mint(recipientAddress, TOKEN_URI);
        await tx.wait();
        console.log("Successfully minted SBT to:", recipientAddress);
        console.log("Transaction hash:", tx.hash);
    } catch (error) {
        console.error("Error minting token:", error);
    }
}

main().catch(console.error);