

import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");


async function main() {

    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETHAddress ="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const amountOut = 5000;
    const amountInMax = 1;

    const USDCHolder = "0x2093b4281990a568c9d588b8bce3bfd7a1557ebd";
    await helpers.impersonateAccount(USDCHolder);
    const impersonatedSigner = await ethers.getSigner(USDCHolder);

    const USDC = await ethers.getContractAt(
        "IERC20",
        USDCAddress,
        impersonatedSigner
      );
      const WETH = await ethers.getContractAt("IERC20", WETHAddress);
      const ROUTER = await ethers.getContractAt(
        "IUniswap",
        UNIRouter,
        impersonatedSigner
      );

      await USDC.approve(UNIRouter, amountOut);

        //   bal
      const USDCBal = await USDC.balanceOf(USDCHolder);
      const wethBal = await WETH.balanceOf(USDCHolder);

      console.log("Eth before swap", USDCBal);
      console.log("DAI before swap", wethBal);


      await ROUTER.swapTokensForExactETH(
        amountOut, 
        amountInMax, 
        [USDCAddress],
        USDCHolder,
        Math.floor(Date.now() /1000) + (60 * 10)
      );
    
      const USDCBalAfter = await USDC.balanceOf(USDCHolder);
      const WETHBalAfter = await WETH.balanceOf(USDCHolder);
  
      console.log("balance after swap", USDCBalAfter, WETHBalAfter);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });