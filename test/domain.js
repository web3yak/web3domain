var w3d = require("@web3yak/web3domain");

require('dotenv').config() //Remove this line if no environment variable is used


const settings = {
    matic_rpc_url: process.env.MATIC_RPC,
    eth_rpc_url: process.env.ETH_RPC
};

let resolve = new w3d.Web3Domain(settings);

//Retrieves from the Web3Domain
resolve.getDomain("0x8D714B10B719c65B878F2Ed1436A964E11fA3271", "W3D").then(x => {
    console.log("EVM address to Web3Domain Name : " + x);
}).catch(console.error);

//Retrieves from the ENS domain
resolve.getDomain("0x0C82A14EDCF37266889e531e58cA516c10C78f18", "ENS").then(x => {
    console.log("EVM Address to ENS Domain : " + x);
}).catch(console.error);