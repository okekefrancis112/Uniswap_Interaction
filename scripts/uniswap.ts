// const helpers = require("@nomicfoundation/hardhat-network-helpers");
// import { ethers } from "hardhat";

// async function main() {
//   //interact with uniswap swapTokenforExactToken function
//   //swap usdt to dai
//   //TO-DO
//   //erc20 token interface
//   //Approve the uniswap contract
//   //check balance of signer before swap
//   //swap token caling the function
//   //check balance after swap.

//   const USDTAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
//   const DAIAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//   const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
//   const amountOut = 2e6;
//   const amountInMax = 3e6;

//   const USDTHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
//   await helpers.impersonateAccount(USDTHolder);
//   const impersonatedSigner = await ethers.getSigner(USDTHolder);

//   const USDT = await ethers.getContractAt(
//     "IERC20",
//     USDTAddress,
//     impersonatedSigner
//   );




//   const DAI = await ethers.getContractAt("IERC20", DAIAddress);

//   const ROUTER = await ethers.getContractAt(
//     "IUniswap",
//     UNIRouter,
//     impersonatedSigner
//   );


//   await USDT.approve(UNIRouter, amountInMax);
//   const usdtBal = await USDT.balanceOf(USDTHolder);
//   const daiBal = await DAI.balanceOf(USDTHolder);

//   console.log("balance before swap", usdtBal, daiBal);

//   const result = await ROUTER.swapTokensForExactTokens(
//     amountOut,
//     amountInMax,
//     [USDTAddress, DAIAddress],
//     USDTHolder,
//     1660821643
//   );

//   console.log(await result.wait());

//   const usdtBalAfter = await USDT.balanceOf(USDTHolder);
//   const daiBalAfter = await DAI.balanceOf(USDTHolder);

//   console.log("balance after swap", usdtBalAfter, daiBalAfter);
// }

// //usdt   149376720600308
// //dai    500000764750

// //after
// //usdt  149376718595593
// //dai   500002764750

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {

// 0xe2b406ec9227143a8830229eeb3eb6e24b5c60be
  // 0xdAC17F958D2ee523a2206206994597C13D831ec7
  const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  // 0x6B175474E89094C44Da98b954EedeAC495271d0F
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNISWAPRouter = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
  const amountOut = 2000e6;


  const USDTHolder = "0xe2b406ec9227143a8830229eeb3eb6e24b5c60be";
  await helpers.impersonateAccount(USDTHolder);
  const impersonatedSigner = await ethers.getSigner(USDTHolder);

  const USDT = await ethers.getContractAt(
    "IERC20",
    USDTAddress,
    impersonatedSigner
  );
  
  const DAI = await ethers.getContractAt("IERC20", DAIAddress);

  const ROUTER = await ethers.getContractAt(
    "IUniswap",
    UNISWAPRouter,
    impersonatedSigner
  );

  await USDT.approve(UNISWAPRouter, amountOut);
  const usdtBal = await USDT.balanceOf(impersonatedSigner.address);
  const daiBal = await DAI.balanceOf(impersonatedSigner.address);
  console.log("BALANCE BEFORE SWAP: ", usdtBal, daiBal);

  await ROUTER.swapTokensForExactTokens(
    amountOut,
    2000e6,
    [USDTAddress, DAIAddress],
    impersonatedSigner.address,
    1660826443
  );

  const usdtBalAfter = await USDT.balanceOf(impersonatedSigner.address);
  const daiBalAfter = await DAI.balanceOf(impersonatedSigner.address);

  console.log("BALANCE AFTER SWAP: ", usdtBalAfter, daiBalAfter);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});