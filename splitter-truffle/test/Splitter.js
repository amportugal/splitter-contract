var Splitter = artifacts.require("./Splitter.sol");

contract("Splitter contract", function(accounts) {

    var owner = accounts[0];
    var aliceAddress = accounts[1];
    var bobAddress = accounts[2];
    var carolAddress = accounts[3];

    var aliceWeiPay = 2000;
    var bobWeiPay = 1000;
    var carolWeiPay = 5000;

    var contract;

    beforeEach(function() {
        return Splitter.new(aliceAddress, bobAddress, carolAddress, {from: owner})
                .then( instance => contract = instance);
    })

    it("should have starting balance equal to 0", function() {
        return contract.balance({from: owner})
                .then(_balance => assert.strictEqual(_balance.toString(10), '0', "Balance is not 0"));
    });

    it("should have correct addresses", function() {
        return contract.aliceAddress({from: owner})
                .then(function(_aliceAddress) {
                    assert.strictEqual(_aliceAddress, aliceAddress, "Incorrect Alice's address");
                    return contract.bobAddress({from: owner});
                })
                .then(function(_bobAddress) {
                    assert.strictEqual(_bobAddress, bobAddress, "Incorrect Bob's address");
                    return contract.carolAddress({from: owner});
                })
                .then(function(_carolAddress) {
                    assert.strictEqual(_carolAddress, carolAddress, "Incorrect Carol's address");
                })
    })

    it("should process payments to the contract", function() {
        var bobBalance;
        var carolBalance;
        
        var bobNewBalance;
        var carolNewBalance;

        var contractBalance;

        return contract.sendTransaction({from: bobAddress, value: bobWeiPay})
            .then(function(tx) {
                contractBalance = web3.eth.getBalance(contract.address).toString(10);

                assert.equal(contractBalance, bobWeiPay.toString(10), "Contract's balance is wrong.");
                return contract.sendTransaction({from: carolAddress, value: carolWeiPay})
            })
            .then(function(tx) {
                contractBalance = web3.eth.getBalance(contract.address).toString(10);

                bobBalance = web3.eth.getBalance(bobAddress).toString(10);
                carolBalance = web3.eth.getBalance(carolAddress).toString(10);

                assert.equal(contractBalance, (bobWeiPay + carolWeiPay).toString(10), "Contract's balance is wrong.");
                return contract.sendTransaction({from: aliceAddress, value: aliceWeiPay})
            })
            .then(function(tx) {
                bobNewBalance = web3.eth.getBalance(bobAddress).toString(10);
                carolNewBalance = web3.eth.getBalance(carolAddress).toString(10);

                assert.equal(contractBalance, (bobWeiPay + carolWeiPay).toString(10), "Contract's balance mustn't be different.");
                assert.equal(bobNewBalance, (bobBalance + (aliceWeiPay/2)).toString(10), "Bob's balance is wrong.");
                assert.equal(carolNewBalance, (carolBalance + (aliceWeiPay/2)).toString(10), "Carol's balance is wrong.");
            });
    })

})