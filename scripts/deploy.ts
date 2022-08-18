import { ethers, run, network } from "hardhat";

async function main() {
  const PiggyBank = await ethers.getContractFactory(
    "piggyBank"
  )
  const piggyBank = await PiggyBank.deploy();
  await piggyBank.deployed();

  console.log("PiggyBank deployed to: ", piggyBank.address);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block txes...")
    await piggyBank.deployTransaction.wait(6)
    await verify(piggyBank.address, [])
  }
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verify contract...")
  try {
    await run("verify:verify", {
      address: contractAddress, 
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
