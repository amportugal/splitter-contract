var Splitter = artifacts.require("./Splitter.sol");

contract("Splitter contract", function(accounts) {

    var owner = accounts[0];
    var giver = accounts[1];
    var recipient1 = accounts[2];
    var recipient2 = accounts[3];

    var contract;

    beforeEach(function() {
        return Splitter.new(owner, {from: owner})
                .then( instance => contract = instance);
    })

    it("should split payment to recipient1 and recipient2", function() {
        var recip1Balance = web3.eth.getBalance(recipient1);
        var recip2Balance = web3.eth.getBalance(recipient2);
        var recip1NewBalance;
        var recip2NewBalance;

        return contract.split(recipient1, recipient2,{from: giver, value: 5000})
            .then(function(tx) {
                return contract.withdrawFunds({from: recipient1});
            })
            .then(function(tx) {
                recip1NewBalance = web3.eth.getBalance(recipient1);

                var gasUsed = tx.receipt.gasUsed;
                var gasPrice = web3.eth.getTransaction(tx.tx).gasPrice;

                assert.equal(recip1NewBalance.toString(10), recip1Balance.plus(5000/2).minus(gasPrice.mul(gasUsed)).toString(10), "Recipient 1 balance is wrong.");
                
                return contract.withdrawFunds({from: recipient2});
            })
            .then(function(tx){
                recip2NewBalance = web3.eth.getBalance(recipient2);

                var gasUsed = tx.receipt.gasUsed;
                var gasPrice = web3.eth.getTransaction(tx.tx).gasPrice;

                assert.equal(recip2NewBalance.toString(10), recip2Balance.plus(5000/2).minus(gasPrice.mul(gasUsed)).toString(10), "Recipient 2 balance is wrong.");
            
            })
    })

})