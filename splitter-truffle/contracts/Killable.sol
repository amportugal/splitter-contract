pragma solidity ^0.4.18;

contract Killable{
    address     public owner;

    function Killable(address _owner) public {
        owner = _owner;
    }

    function killNow() public{
        require(owner == msg.sender);

        selfdestruct(owner);
    }
}