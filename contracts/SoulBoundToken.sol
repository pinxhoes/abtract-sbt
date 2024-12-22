// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulBoundToken is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("SoulBoundToken", "SBT") {}

    function mint(
        address to,
        string memory uri
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    // Add new function to update token URI
    function updateTokenURI(
        uint256 tokenId,
        string memory newUri
    ) public onlyOwner {
        require(_exists(tokenId), "URI update for nonexistent token");
        _tokenURIs[tokenId] = newUri;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "URI set for nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        revert("SoulBound tokens cannot be transferred");
    }

    function _approve(address to, uint256 tokenId) internal virtual override {
        revert("SoulBound tokens cannot be approved for transfer");
    }
}
