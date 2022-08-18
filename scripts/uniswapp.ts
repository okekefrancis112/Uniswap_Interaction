 //interact with uniswap swapTokenforExactToken function
  //swap usdt to dai
  //TO-DO
  //erc20 token interface
  //Approve the uniswap contract
  //check balance of signer before swap
  //swap token caling the function
  //check balance after swap.


//   What do we need 

// 1.contract address (token and router addr) done
// 2. helper from hardhat
// 3. contract function interface 
// 1660833648

import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");


async function main() {

    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    // const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const amountOut = 5000;

    const USDCHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    await helpers.impersonateAccount(USDCHolder);
    const impersonatedSigner = await ethers.getSigner(USDCHolder);

    const USDC = await ethers.getContractAt(
        "IERC20",
        USDCAddress,
        impersonatedSigner
      );
      const WETH = await ethers.getContractAt("IERC20", wethAddress);
      const ROUTER = await ethers.getContractAt(
        "IUniswap",
        UNIRouter,
        impersonatedSigner
      );

      await USDC.approve(UNIRouter, amountOut);

        //   bal
      const USDCBal = await USDC.balanceOf(USDCHolder);
      const wethBal = await WETH.balanceOf(USDCHolder)

      const amountInMax = 1;

      console.log("USDC before swap", USDCBal);
      console.log("DAI before swap", wethBal);

      await ROUTER.swapExactTokensForTokens(
        amountOut, 
        amountInMax, 
        [USDCAddress, wethAddress],
        USDCHolder,
        Math.floor(Date.now() /1000) + (60 * 10)
      );


    
      const usdcBalAfter = await USDC.balanceOf(USDCHolder);
      const wethBalAfter = await WETH.balanceOf(USDCHolder);
  
      console.log("balance after swap", usdcBalAfter, wethBalAfter);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });