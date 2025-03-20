// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title NFTBadgeSystem
 * @dev NFT-based badge system for learning achievements without OpenZeppelin.
 */
contract NFTBadgeSystem {
    string public name = "LearningBadge";
    string public symbol = "LBADGE";
    uint256 private _tokenIdCounter;
    
    // Token data structure
    struct Badge {
        address owner;
        string tokenURI;
    }
    
    // Mapping of token ID to Badge details
    mapping(uint256 => Badge) private _badges;
    
    // Mapping of owner to their badge IDs
    mapping(address => uint256[]) private _badgesOwned;
    
    // Events
    event BadgeIssued(address indexed recipient, uint256 tokenId, string metadataURI);
    
    /**
     * @dev Mint a new NFT badge.
     * @param recipient Address of the badge recipient.
     * @param tokenURI URI pointing to badge metadata.
     */
    function issueBadge(address recipient, string memory tokenURI) public {
        require(recipient != address(0), "Invalid recipient address");

        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        _badges[newTokenId] = Badge(recipient, tokenURI);
        _badgesOwned[recipient].push(newTokenId);
        
        emit BadgeIssued(recipient, newTokenId, tokenURI);
    }

    /**
     * @dev Get badge details.
     * @param tokenId ID of the badge.
     * @return owner Badge owner.
     * @return tokenURI Metadata URI of the badge.
     */
    function getBadge(uint256 tokenId) public view returns (address owner, string memory tokenURI) {
        require(_exists(tokenId), "Badge does not exist");
        Badge memory badge = _badges[tokenId];
        return (badge.owner, badge.tokenURI);
    }

    /**
     * @dev Get all badge IDs owned by a user.
     * @param owner Address of the user.
     * @return List of badge token IDs owned.
     */
    function getBadgesOwned(address owner) public view returns (uint256[] memory) {
        return _badgesOwned[owner];
    }

    /**
     * @dev Check if a badge exists.
     * @param tokenId ID of the badge.
     * @return True if the badge exists, false otherwise.
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _badges[tokenId].owner != address(0);
    }
}
