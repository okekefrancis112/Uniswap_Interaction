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

    // const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETHAddress ="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const amountOut = ethers.utils.parseUnits("10", "18");

    // const EthHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    const EthHolder = "0x2093b4281990a568c9d588b8bce3bfd7a1557ebd";
    await helpers.impersonateAccount(EthHolder);
    const impersonatedSigner = await ethers.getSigner(EthHolder);

    const WETH = await ethers.getContractAt(
        "IERC20",
        WETHAddress,
        impersonatedSigner
      );
      const DAI = await ethers.getContractAt("IERC20", DAIAddress);
      const ROUTER = await ethers.getContractAt(
        "IUniswap",
        UNIRouter,
        impersonatedSigner
      );

      await WETH.approve(UNIRouter, amountOut);

        //   bal
      const EthBal = await impersonatedSigner.getBalance();
      const daiBal = await DAI.balanceOf(EthHolder);

      console.log("Eth before swap", EthBal);
      console.log("DAI before swap", daiBal);

    //   await ROUTER.swapTokensForExactTokens(
    //     amountOut, 
    //     ethers.utils.parseUnits("1980", "18"), 
    //     [USDCAddress, DAIAddress],
    //     USDCHolder,
    //     Math.floor(Date.now() /1000) + (60 * 10)
    //   );



    //   await ROUTER.swapTokensForExactETH(
    //     amountOut, 
    //     ethers.utils.parseUnits("1980", "18"), 
    //     [ DAIAddress],
    //     EthHolder,
    //     Math.floor(Date.now() /1000) + (60 * 10)
    //   );
    
      const EthBalAfter = await impersonatedSigner.getBalance();
      const daiBalAfter = await DAI.balanceOf(EthHolder);
  
      console.log("balance after swap", EthBalAfter, daiBalAfter);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });