pragma solidity ^0.4.18;

contract Splitter {
    address     public owner;
    uint        public balance;

    function Splitter() public {
        owner = msg.sender;
    }

    function getBalance() public constant returns uint {
        return balance;
    }

    //Fallback function
    function() {
        // TODO: to implement
    }
}