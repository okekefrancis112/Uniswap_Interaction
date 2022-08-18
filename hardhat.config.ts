
require("dotenv").config({ path: ".env" });
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-chai-matchers";


require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-ethers");

require("hardhat-gas-reporter")
require("solidity-coverage")


const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY 
// @ts-ignore
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

=

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/6517c516ef6e4f6da040bf37f647633e",
      },
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 3,
      blockConfirmations: 6,
    },
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY
  // },
  solidity: {
    compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
  },
  blockGasLimit: 200000000000,
  gasPrice: 10000000000,
};

