var w3d = require("@web3yak/web3domain");

require('dotenv').config() //Remove this line if no environment variable is used


const settings = {
  matic_rpc_url: process.env.MATIC_RPC,
  eth_rpc_url: process.env.ETH_RPC
};

let resolve = new w3d.Web3Domain(settings);

//Retrieves from the Web3Domain
resolve.getAddress("jack.demo", "ETH").then(x => {
  console.log("Wallet address of jack.demo is : " + x);
}).catch(console.error);

//Retrieves from the ENS domain
resolve.getAddress("brad.eth", "ETH").then(x => {
  console.log("Wallet address of brad.eth is : " + x);
}).catch(console.error);

//Retrieves from the UnstoppableDomain
resolve.getAddress("brad.crypto", "ETH").then(x => {
  console.log("Wallet address of brad.crypto is : " + x);
}).catch(console.error);