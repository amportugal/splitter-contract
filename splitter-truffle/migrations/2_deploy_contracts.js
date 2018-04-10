var Splitter = artifacts.require("./Splitter.sol")

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Splitter, accounts[0])
          .then(() =>
        console.log("Deployed Splitter contract, owner ==> (", accounts[0], "),"));
};
