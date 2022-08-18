import "@nomiclabs/hardhat-ethers";
require("dotenv").config({ path: ".env" });

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY 
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL


module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        // url: "https://mainnet.infura.io/v3/6517c516ef6e4f6da040bf37f647633e",
        url: MAINNET_RPC_URL,
      },
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  }
}


