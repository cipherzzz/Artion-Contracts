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

    // const tx = await factory.updatePlatformFee(hre.ethers.utils.parseEther("0.1"));
    // const receipt = await tx.wait();
    // console.log("Platform Fee Changed:", receipt);

    // const platformFee = await factory.platformFee();
    // console.log("Platform fee: ", hre.ethers.utils.formatEther(platformFee));

    const tx = await factory.createNFTContract("Shrek", "SHRK", {
      value: hre.ethers.utils.parseEther("0.1")
    });
    const receipt = await tx.wait();
    console.log("NFT contract deployed to:", receipt);

    // const { ethers } = hre;
    // const [deployer] = await ethers.getSigners();
    // const signer = deployer; // for simplicity
    // console.log("Deploying contracts with the account:", deployer.address);
    // console.log("Account balance:", (await deployer.getBalance()).toString());
    // console.log("Signer address:", signer.address);

    // const transactionCount = await deployer.getTransactionCount();
    // const airdropDeployedAddress = getContractAddress({
    //   from: deployer.address,
    //   nonce: transactionCount + 1, //add 1 to the nonce to get the address of the airdrop contract since it will be deployed after the ParaToken contract
    // });

    // const ParaToken = await ethers.getContractFactory("ParaToken");
    // const paraToken = await ParaToken.deploy(
    //   "Para Token",
    //   "para",
    //   airdropDeployedAddress
    // );
    // console.log("ParaToken deployed to:", paraToken.address);

    // const authorizedMerkleClaimant = {
    //   claimer: taskArgs.merkleClaimAddress,
    //   amount: ethers.utils.parseUnits(taskArgs.merkleClaimAmount, 18),
    // };
    // const merkleTree = generateMerkleTree([authorizedMerkleClaimant]);
    // const merkleRoot = merkleTree.getHexRoot();
    // console.log(
    //   "Merkle root:",
    //   merkleRoot,
    //   " calculated for claimant: ",
    //   authorizedMerkleClaimant.claimer,
    //   " with amount: ",
    //   authorizedMerkleClaimant.amount.toString(),
    //   " in wei"
    // );

    // const Airdrop = await ethers.getContractFactory("Airdrop");
    // const airdrop = await Airdrop.deploy(
    //   merkleRoot,
    //   signer.address,
    //   paraToken.address
    // );
    // console.log("Airdrop deployed to:", airdrop.address);
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
    apiKey: "46DD6NK19R2AZQQIJIY1FXR85HKM2XSNBE",
  },
};
