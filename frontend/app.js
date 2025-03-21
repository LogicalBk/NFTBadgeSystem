const contractAddress = "0x8904Fc77Cd27d8Ec91b17399569bC3c042f97De2";
const contractABI = [ [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metadataURI",
				"type": "string"
			}
		],
		"name": "BadgeIssued",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "issueBadge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getBadge",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "getBadgesOwned",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ];

let web3;
let contract;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        document.getElementById("walletAddress").innerText = `Connected: ${userAccount}`;
        contract = new web3.eth.Contract(contractABI, contractAddress);
        fetchBadges();
    } else {
        alert("Please install MetaMask!");
    }
}

async function mintBadge() {
    if (!contract || !userAccount) {
        alert("Connect your wallet first!");
        return;
    }

    const goal = document.getElementById("goal").value;
    if (goal.trim() === "") {
        alert("Enter a valid learning goal!");
        return;
    }

    try {
        await contract.methods.mintBadge(goal).send({ from: userAccount });
        alert("Badge Minted Successfully!");
        fetchBadges();
    } catch (error) {
        console.error(error);
        alert("Error minting badge");
    }
}

async function fetchBadges() {
    if (!contract || !userAccount) return;

    try {
        const badgeCount = await contract.methods.balanceOf(userAccount).call();
        let badgeGallery = document.getElementById("badgeGallery");
        badgeGallery.innerHTML = "";

        for (let i = 0; i < badgeCount; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(userAccount, i).call();
            const badge = document.createElement("div");
            badge.classList.add("badge");
            badge.innerText = `#${tokenId}`;
            badgeGallery.appendChild(badge);
        }
    } catch (error) {
        console.error(error);
        alert("Error fetching badges");
    }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("mintBadge").addEventListener("click", mintBadge);
