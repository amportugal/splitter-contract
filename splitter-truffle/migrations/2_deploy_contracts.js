var Splitter = artifacts.require("./Splitter.sol")

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Splitter, accounts[0] /* Alice */, 
                            accounts[1] /* Bob */, 
                            accounts[2] /* Carol */)
          .then(() =>
        console.log("Deployed Splitter contract with........\n ====> Alice (", accounts[0],"),",
                                                            "\n ====> Bob (", accounts[1],"),", 
                                                            "\n ====> Carol (", accounts[2],")."));
};
