import { ethers, run, network } from "hardhat";

async function main() {
  const PiggyBank = await ethers.getContractFactory(
    "PiggyBank"
  )
  const piggyBank = await PiggyBank.deploy();
  await piggyBank.deployed();

  console.log("PiggyBank deployed to: ", piggyBank.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
