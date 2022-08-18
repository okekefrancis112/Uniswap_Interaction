require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";
import { BytesLike } from "ethers";
// const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    let provider = {
      PrivateKey: process.env.PRIVATE_KEY as BytesLike,
      URL: process.env.ROPSTEN_RPC_URL,
    };

const provider2 = ethers.getDefaultProvider("ropsten", provider.URL);
let wallet = new ethers.Wallet(provider.PrivateKey, provider2);
const _value = ethers.utils.parseEther("1");

const CONTRACTADDRESS = "0x62EDC54900a15543a84Dd760B5Ca5E0d49896a87";
const piggyBankFactory = await ethers.getContractFactory("PiggyBank");
const PiggyBankFactory = piggyBankFactory.attach(CONTRACTADDRESS);

/// TRANSFER ETHER TO WALLET
 await wallet.sendTransaction({ to: CONTRACTADDRESS, value: _value });

const contractBalance = provider2.getBalance(PiggyBankFactory.address);
 console.log("contractBalance: ", contractBalance);
}

// 0x62EDC54900a15543a84Dd760B5Ca5E0d49896a87