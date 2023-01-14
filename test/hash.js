var w3d = require("@web3yak/web3domain");

require('dotenv').config() //Remove this line if no environment variable is used


const settings = {
    matic_rpc_url: process.env.MATIC_RPC,
    eth_rpc_url: process.env.ETH_RPC
};

let resolve = new w3d.Web3Domain(settings);

//Retrieve website address from Web3Domain
resolve.getWeb("jack.demo").then(x => {
    console.log("jack.demo website url is: " + x);
}).catch(console.error);

//Retrieve website address from UnstoppableDomain
resolve.getWeb("brad.crypto").then(x => {
    console.log("brad.crypto website url is: " + x);
}).catch(console.error);