pragma solidity ^0.4.18;

contract Splitter {
    address     public owner;

    // Address of people
    address     public bobAddress;
    address     public carolAddress;

    // Event logger
    event LogContractPay(address recipient1, address recipient2, uint amountRecipient1, uint amountRecipient2);

    function Splitter(address aliceAddr, address bobAddr, address carolAddr) public {
        owner = aliceAddr;

        bobAddress = bobAddr;
        carolAddress = carolAddr;
    }

    function() public payable{
        require(msg.value > 0);
        require(owner == msg.sender);

        uint halfOfValue = msg.value / 2;
        if(!bobAddress.send(halfOfValue)) revert();
        if(!carolAddress.send(halfOfValue)) revert();

        LogContractPay(bobAddress, carolAddress, halfOfValue, halfOfValue);
    }
}