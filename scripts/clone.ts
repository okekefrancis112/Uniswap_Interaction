require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";
import { BytesLike } from "ethers";

async function main() {
    let provider = {
      PrivateKey: process.env.PRIVATE_KEY as BytesLike,
      URL: process.env.ROPSTEN_RPC_URL,
    };

const provider2 = ethers.getDefaultProvider("ropsten", provider.URL);
let wallet = new ethers.Wallet(provider.PrivateKey, provider2);
const _value = ethers.utils.parseEther("1");

const CONTRACTADDRESS = "0x62EDC54900a15543a84Dd760B5Ca5E0d49896a87";
const PiggyBankFactory = await ethers.getContractAt("IPiggyBank", CONTRACTADDRESS);

/// TRANSFER ETHER TO WALLET
 await wallet.sendTransaction({ to: CONTRACTADDRESS, value: _value });
 console.log("contractBalanc", await PiggyBankFactory.contractBalance());
 await wallet.sendTransaction({ to: CONTRACTADDRESS, value: _value });

const contractBalance = provider2.getBalance(PiggyBankFactory.address);
 console.log("contractBalance: ", contractBalance);

const withdrawBalance =await PiggyBankFactory.withdraw();
const bal = withdrawBalance.wait();
console.log("Collect your money", bal);
}

// 0x62EDC54900a15543a84Dd760B5Ca5E0d49896a87