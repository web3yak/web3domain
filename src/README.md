# Web3 Domain Name Tool
A library for interacting with blockchain domain names. It can be used to retrieve wallet addresses and IPFS hashes for decentralized websites.

Resolution supports different decentralized domains across multiple chains.

*Supports all major Web3 Domain provider.*

**Ethereum Name Service (ENS)**

**Unstoppable Domains**

**Web3Domain - W3D**

## Installing Web3Domain Tool
To install the library use npm.

`npm i @web3yak/web3domain`

# Using Web3Domain Tool

Create a new project.

    `mkdir W3D && cd $_
    yarn init -y
    npm i @web3yak/web3domain`
	
**Look up a domain for cryptocurrency address**

Create a new file in your project, *address.js*.

    var w3d = require("@web3yak/web3domain");
    
    const settings = {
      matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/..........",  //Get your own RPC free URL
      eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/................" //Get your own RPC free URL
    };
    
    let resolve = new w3d.Web3Domain(settings);
    
    //Retrieves from the Web3Domain
    resolve.getAddress("jack.demo","ETH").then(x => {
      console.log("Wallet address of jack.demo is : " + x);
    }).catch(console.error);
    
    //Retrieves from the ENS domain
    resolve.getAddress("brad.eth","ETH").then(x => {
      console.log("Wallet address of brad.eth is : " + x);
    }).catch(console.error);
    
    //Retrieves from the UnstoppableDomain
    resolve.getAddress("brad.crypto","ETH").then(x => {
      console.log("Wallet address of brad.crypto is : " + x);
    }).catch(console.error);
	

Execute the script

    PS D:\W3D> node address.js
    Wallet address of brad.crypto is : 0x8aaD44321A86b170879d7A244c1e8d360c99DdA8
    Wallet address of jack.demo is : 0x8D714B10B719c65B878F2Ed1436A964E11fA3271
    Wallet address of brad.eth is : 0x0C82A14EDCF37266889e531e58cA516c10C78f18

**Look up a cryptocurrency address for Web3 Domain Name**

Create a new file in your project, domain.js

    var w3d = require("@web3yak/web3domain");
    
        const settings = {
          matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/..........",  //Get your own RPC free URL
          eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/................", //Get your own RPC free URL
          fvm_rpc_url: "https://api.node.glif.io/rpc/v1"
        };
        let resolve = new w3d.Web3Domain(settings);
    
        //Retrieves from the Web3Domain
    resolve.getDomain("0x8D714B10B719c65B878F2Ed1436A964E11fA3271","W3D").then(x => {
        console.log("EVM address to Web3Domain Name : " + x);
      }).catch(console.error);
      
      //Retrieves from the ENS domain
      resolve.getDomain("0x0C82A14EDCF37266889e531e58cA516c10C78f18","ENS").then(x => {
        console.log("EVM Address to ENS Domain : " + x);
      }).catch(console.error);

Execute the script

    PS D:\W3D> node domain.js
    EVM address to Web3Domain Name : jack.demo
    EVM Address to ENS Domain : brad.eth


**Find the IPFS hash for a decentralized website from Web3 Domain Name**

Create a new file in your project, hash.js.

    var w3d = require("@web3yak/web3domain");
        const settings = {
          matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/..........",  //Get your own RPC free URL
          eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/................", //Get your own RPC free URL
          fvm_rpc_url: "https://api.node.glif.io/rpc/v1"
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
    

Execute the script

    PS D:\W3D> node hash.js
    brad.crypto website url is: https://gateway.ipfs.io/ipfs/QmTiqc12wo2pBsGa9XsbpavkhrjFiyuSWsKyffvZqVGtut
    jack.demo website url is: https://gateway.ipfs.io/ipfs/bafkreif6fr5oapdrsrv7ccdonuaqa5ysijubsoqzy323ocrr4gobbegg4i
	

**Help us improve**

We are always looking for ways to improve how developers use and integrate our products into their applications. 
