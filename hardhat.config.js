require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-solhint");
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");

const PRIVATE_KEY = process.env.PRIVATE_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  // print the private keys
  const accounts = await hre.ethers.getSigners();
  const address = accounts[0].address;
  const balance = await hre.ethers.provider.getBalance(address);
  console.log("Address: ", address);
  console.log("Balance: ", hre.ethers.utils.formatEther(balance));
});

// Deploy the contract
task("create-nft-collection", "create a new NFT collection")
  .addParam("isERC1155", "Deploying ERC1155 or ERC721", false, types.boolean)
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const erc1155Info = {
      address: "0x3a8c3eA861Ca1Ffc709b27c5187562c298221776",
      name: "FantomArtFactory",
    };
    const erc721Info = {
      address: "0xeC5e93a882b8CB169A93db2dcb45539ec7ffF1F3",
      name: "FantomNFTFactory",
    };

    const factoryInfo = erc1155Info;
    const factory = await hre.ethers.getContractAt(
      factoryInfo.name,
      factoryInfo.address
    );
  });

module.exports = {
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: false,
    gasPrice: 50,
  },
  networks: {
    mainnet: {
      url: `https://fantom-mainnet.public.blastapi.io	`,
      chainId: 250,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    testnet: {
      url: `https://fantom-testnet.public.blastapi.io`,
      chainId: 4002,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    coverage: {
      url: "http://localhost:8555",
    },

    localhost: {
      url: `http://127.0.0.1:8545`,
    },
  },
  etherscan: {
    apiKey: "",
  },
};
