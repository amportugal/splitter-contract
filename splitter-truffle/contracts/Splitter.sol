pragma solidity ^0.4.18;

contract Splitter {
    address     public owner;

    // Address of people
    address     public bobAddress;
    address     public carolAddress;

    mapping (address => uint) balances;

    // Event logger
    event LogSplitter(address recipient1, address recipient2, uint amountRecipient1, uint amountRecipient2);
    event LogWithdrawal(address recipient, uint amount);

    function Splitter(address aliceAddr, address bobAddr, address carolAddr) public {
        owner = aliceAddr;

        bobAddress = bobAddr;
        carolAddress = carolAddr;
    }

    function() public payable{
        require(msg.value > 0);
        require(owner == msg.sender);

        uint halfOfValue = (msg.value / 2);
        balances[bobAddress] += halfOfValue;
        balances[carolAddress] += halfOfValue;

        /* The rest accumulates to owner */
        if(msg.value % 2 != 0) {
            balances[owner] += 1;
        }

        LogSplitter(bobAddress, carolAddress, halfOfValue, halfOfValue);
    }

    function withdrawFunds() public{
        require(balances[msg.sender] > 0);

        msg.sender.transfer(balances[msg.sender]);

        LogWithdrawal(msg.sender, balances[msg.sender]);
    }
}