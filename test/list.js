var w3d = require("@web3yak/web3domain");

require('dotenv').config() //Remove this line if no environment variable is used


const settings = {
    matic_rpc_url: process.env.MATIC_RPC,
    eth_rpc_url: process.env.ETH_RPC,
    fvm_rpc_url: process.env.FVM_RPC
};

let resolve = new w3d.Web3Domain(settings);

resolve.geTotalDomain("0x8D714B10B719c65B878F2Ed1436A964E11fA3271").then(x => {
    console.log("Total Number of Domain : " + x);
}).catch(console.error);

                           
resolve.getDomainList("0x8D714B10B719c65B878F2Ed1436A964E11fA3271").then(x => {
    console.log("Total Array of current address  : " + x);
}).catch(console.error);

resolve.getDomainNameById('5').then(x => {
    console.log("Domain Name of ID 5 : " + x);
}).catch(console.error);