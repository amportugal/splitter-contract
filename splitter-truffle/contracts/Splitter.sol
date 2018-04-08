pragma solidity ^0.4.18;

contract Splitter {
    address     public owner;
    uint        public balance;
    
    // Address of people
    address     public aliceAddress;
    address     public bobAddress;
    address     public carolAddress;

    // Event logger
    event LogContractPay(address sender, uint amount);

    function Splitter(address aliceAddr, address bobAddr, address carolAddr) public {
        owner = msg.sender;

        aliceAddress = aliceAddr;
        bobAddress = bobAddr;
        carolAddress = carolAddr;
    }

    /*function getBalance() public constant returns (uint balance) {
        return balance;
    }*/

    //Fallback function
    function() public payable{
        require(msg.value > 0);
        require(isContractAllowedAddrs(msg.sender));

        if(msg.sender == aliceAddress) {
            uint halfOfValue = msg.value / 2;
            bobAddress.send(halfOfValue);
            carolAddress.send(halfOfValue);
        } else {
            balance += msg.value;
            LogContractPay(msg.sender, msg.value);
        }
    }

    function isContractAllowedAddrs(address addr) private constant returns (bool) {
        return  (addr == aliceAddress && addr == bobAddress && addr == carolAddress);
    }
}