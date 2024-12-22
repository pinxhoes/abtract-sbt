import { ethers } from "ethers";
import { vars } from "hardhat/config";
import { Provider, Wallet } from "zksync-ethers";

async function main() {
    // New contract address
    const CONTRACT_ADDRESS = "0x03B870C5C86a27794b3d2C55831b873f41Ba83d3";

    // Your new metadata URI
    const NEW_TOKEN_URI = "ipfs://bafkreih32pya27luccsxgr3w6qvyhgfzifkgydwgf7eaz6pdyajbgie42m";

    // Initialize provider and wallet
    const provider = new Provider("https://api.testnet.abs.xyz");
    const wallet = new Wallet(vars.get("DEPLOYER_PRIVATE_KEY"), provider);

    // Contract ABI for the update function
    const contractABI = [
        "function updateTokenURI(uint256 tokenId, string memory newUri) public"
    ];

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

    try {
        console.log("Updating token URI...");
        const tx = await contract.updateTokenURI(0, NEW_TOKEN_URI);
        await tx.wait();
        console.log("Successfully updated token URI");
        console.log("Transaction hash:", tx.hash);
    } catch (error) {
        console.error("Error updating token URI:", error);
    }
}

main().catch(console.error);