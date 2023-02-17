class Web3Domain {

  constructor(settings) {
    this.privatekey = '7ec24dacf686fd2502bd29064199cd0d46ceaf516b59acb339b8885825391a4d'; //Random wallet private key
    this.matic_rpc_url = settings.matic_rpc_url; //Polygon RPC URL
    this.eth_rpc_url = settings.eth_rpc_url; //Ethereum RPC URL

    var Web3 = require("web3");
    this.Provider = require("@truffle/hdwallet-provider");
    const { abi } = require("./web3domain.json");
    const { default: Resolution } = require("@unstoppabledomains/resolution");
    this.resolution = new Resolution();
    this.SmartContractAddress = "0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0";

    this.SmartContractABI = abi;
    this.provider = new this.Provider(this.privatekey, this.matic_rpc_url);
    this.web3 = new Web3(this.provider);
    this.myContract = new this.web3.eth.Contract(this.SmartContractABI, this.SmartContractAddress);

  }

  getAddress(name, curr) {
    var domain_provider = this.w3d_find_provider(name);
    if (domain_provider == "eth") {
      return this.w3d_eth_addr(name);
    } else if (domain_provider == "unstop") {
      return this.w3d_unstop_resolve_domain(name, curr);
    } else {
      return this.getOwner(name);
    }
  }


  getDomain(addr, provider) {

    if (provider == "ENS") {
      return this.w3d_addr_eth(addr);
    } else if (provider == "unstop") {
      return this.w3d_blank();
    } else {
      return this.w3d_web3_getReverse(addr);
    }
  }


  getWeb(name) {
    var domain_provider = this.w3d_find_provider(name);
    if (domain_provider == "eth") {
      // return this.w3d_blank();
      return this.w3d_eth_website(name);
    } else if (domain_provider == "unstop") {
      return this.w3d_unstop_website(name);
    } else {
      return this.w3d_web3_website(name);
    }
  }

  w3d_blank = async () => {
    return "null";
  }

  w3d_web3_getReverse = async (addr) => {
    try {
      var oldvalue = await this.myContract.methods.getReverse(addr).call();
      return oldvalue;
    } catch (error) {
      return null;
    }
  };

  w3d_unstop_resolve_domain = async (domain, currency) => {
    const { default: Resolution } = require("@unstoppabledomains/resolution");
    const resolution = new Resolution();
    try {
      var addr = await resolution.addr(domain, currency);
      return addr;
    } catch (error) {
      return error;
    }
  }

  w3d_unstop_website = async (domain) => {
    const { default: Resolution } = require("@unstoppabledomains/resolution");
    const resolution = new Resolution();
    try {
      var hash = await resolution.ipfsHash(domain);
      return "https://gateway.ipfs.io/ipfs/" + hash;
    } catch (error) {
      return null;
    }

  }

  w3d_web3_website = async (name) => {

    try {
      var id = await this.myContract.methods.getID(name).call();
      var tokenURI = await this.myContract.methods.tokenURI(id).call();

      if (this.w3d_isValidUrl(tokenURI)) {
        var web_url = await this.w3d_fetch_from_json(tokenURI);
        if (tokenURI != null) {
          return "https://gateway.ipfs.io/ipfs/" + web_url;
        }
        else {
          return null;
        }
      }
      else {
        if (tokenURI != null) {
          return "https://ipfs.io/ipfs/" + tokenURI;
        }
        else {
          return null;
        }
      }


    } catch (error) {
      return null;
    }

  }


  w3d_tokenURI = async (name) => {

    try {
      var id = await this.myContract.methods.getID(name).call();
      var tokenURI = await this.myContract.methods.tokenURI(id).call();

      if (this.w3d_isValidUrl(tokenURI)) {
        return tokenURI;
      }
      else {
        return null;
      }


    } catch (error) {
      return null;
    }

  }


  w3d_eth_addr = async (name) => {
    const ethers = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider(this.eth_rpc_url);
    const address = await provider.resolveName(name);
    return address;
  };

  w3d_addr_eth = async (addr) => {
    const ethers = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider(this.eth_rpc_url);
    const name = await provider.lookupAddress(addr);
    return name;
  };


  w3d_eth_website = async (name) => {
    const ethers = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider(this.eth_rpc_url);

    const resolver = await provider.getResolver(name);
    const contentHash = await resolver.getContentHash();
    return contentHash;
  };

  splitDomain(title, part) {
    //eg.navneet.crypto
    if (part === "subdomain") {
      let subdomain = title.split(".", 2);
      if (subdomain[0]) {
        return subdomain[0]; //navneet
      }
    } else if (part === "primary") {
      let subdomain = title.split(".", 3);
      if (subdomain[1]) {
        if (subdomain[2] !== undefined) {
          return subdomain[2];
        } else {
          return subdomain[1];
        }
      } else {
        return subdomain[0];
      }
    } else {
      return title;
    }
  }

  w3d_isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }


  async w3d_fetch_from_json(url) {
    var axios = require('axios');
    try {
      let response = await axios.get(url);
      let json_data = await response.data;
      var web_url = json_data.records["50"].value;
      var web3_url = '';
      if (json_data.records.hasOwnProperty('51')) {

        var web3_url = json_data.records["51"].value;
      }
      if (web3_url != '') {
        return web3_url;
      }
      else {
        return web_url;

      }

    }
    catch (error) {
      return null;
    }

  }

  w3d_find_provider(name) {
    var unstop = ["crypto", "zil", "nft"];
    var extension = this.splitDomain(name, "primary");
    if (extension === "eth") {
      return "eth";
    } else if (unstop.includes(extension)) {
      return "unstop";
    } else {
      return "web3domain";
    }
  }


  getOwner = async (name) => {
    try {
      var get_id_from_name = await this.myContract.methods.getID(name).call();
      var oldvalue = await this.myContract.methods.getOwner(get_id_from_name).call();
      return oldvalue;
    } catch (error) {
      return null;
    }
  };

}

module.exports = { Web3Domain };