pragma solidity ^0.4.18;

contract Killable{
    address     public owner;

    function Killable() public {
        owner = msg.sender;
    }

    function killNow() public{
        require(owner == msg.sender);

        selfdestruct(owner);
    }
}