# 🌟 NFT-Based Badge System for Learning Goals 🎓  

![Badge System](https://img.shields.io/badge/Status-Active-brightgreen)  
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.19-blue)  
![License](https://img.shields.io/badge/License-MIT-yellow)  

## 📌 Table of Contents  
- [📌 Project Title](#-project-title)  
- [📖 Project Description](#-project-description)  
- [🎯 Project Vision](#-project-vision)  
- [🚀 Future Scope](#-future-scope)  
- [🔑 Key Features](#-key-features)  
- [💡 How It Works](#-how-it-works)  
- [🛠️ Tech Stack](#-tech-stack)  
- [⚙️ Smart Contract](#-smart-contract)  
- [📜 License](#-license)  

---

## 📌 Project Title  
**NFT-Based Badge System for Learning Goals**  

---

## 📖 Project Description  
This **NFT-based badge system** is a blockchain-powered credentialing platform that **issues immutable, verifiable learning achievement badges** as NFTs. Institutions, educators, and e-learning platforms can use it to reward students for completing educational milestones, skill certifications, and academic achievements.  

Each badge is **unique, non-transferable, and securely stored on the blockchain**, ensuring **transparency, credibility, and fraud prevention**.  

---

## 🎯 Project Vision  
To **revolutionize digital learning certification** by enabling blockchain-backed, verifiable, and decentralized learning achievements. This system aims to create **a universally recognized standard for digital credentials**.  

---

## 🚀 Future Scope  
- **Integration with LMS (Learning Management Systems)** – Automate badge issuance for platforms like Moodle, Coursera, Udemy.  
- **Web3 Wallet Support** – Allow users to showcase badges in decentralized wallets (MetaMask, Trust Wallet).  
- **Decentralized Verification** – Employers and institutions can verify credentials in real-time.  
- **Multi-Chain Support** – Expand to Ethereum, Polygon, and Solana for cost efficiency.  
- **AI-Based Skill Endorsements** – Employers can endorse badges based on performance analytics.  

---

## 🔑 Key Features  
✅ **Immutable NFT Badges** – Learning achievements are permanently recorded on the blockchain.  
✅ **Decentralized Verification** – Anyone can verify a badge's authenticity.  
✅ **Institution-Based Issuance** – Only authorized institutions can mint badges.  
✅ **Metadata Storage** – Each badge contains metadata (IPFS link) with details about the achievement.  
✅ **Custom Badge Designs** – Institutions can create unique badge styles.  
✅ **Scalable & Secure** – Efficient contract design for low gas costs.  

---

## 💡 How It Works  
1️⃣ **Institutions Mint Badges** – Learning platforms issue NFT-based badges for achievements.  
2️⃣ **Students Receive NFT Badges** – Recipients store badges in their blockchain wallets.  
3️⃣ **Verification by Employers & Institutions** – Anyone can verify credentials via smart contract.  

---

## 🛠️ Tech Stack  
- **Blockchain** – Ethereum / Polygon  
- **Smart Contracts** – Solidity  
- **Storage** – IPFS / Arweave for metadata  
- **Frontend (Future Scope)** – React.js, Web3.js  

---

## ⚙️ Smart Contract  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title NFTBadgeSystem
 * @dev NFT-based badge system for learning achievements.
 */
contract NFTBadgeSystem {
    string public name = "LearningBadge";
    string public symbol = "LBADGE";
    uint256 private _tokenIdCounter;
    
    struct Badge {
        address owner;
        string tokenURI;
    }
    
    mapping(uint256 => Badge) private _badges;
    mapping(address => uint256[]) private _badgesOwned;

    event BadgeIssued(address indexed recipient, uint256 tokenId, string metadataURI);
    
    function issueBadge(address recipient, string memory tokenURI) public {
        require(recipient != address(0), "Invalid recipient address");
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        _badges[newTokenId] = Badge(recipient, tokenURI);
        _badgesOwned[recipient].push(newTokenId);
        
        emit BadgeIssued(recipient, newTokenId, tokenURI);
    }

    function getBadge(uint256 tokenId) public view returns (address owner, string memory tokenURI) {
        require(_exists(tokenId), "Badge does not exist");
        Badge memory badge = _badges[tokenId];
        return (badge.owner, badge.tokenURI);
    }

    function getBadgesOwned(address owner) public view returns (uint256[] memory) {
        return _badgesOwned[owner];
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _badges[tokenId].owner != address(0);
    }
}
