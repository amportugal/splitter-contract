pragma solidity ^0.4.18;

import "./Killable.sol";

contract Splitter is Killable{

    mapping (address => uint) public balances;

    // Event logger
    event LogSplitter(address indexed recipient1, address indexed recipient2, uint amountRecipient1, uint amountRecipient2);
    event LogWithdrawal(address indexed recipient, uint amount);

    function Splitter() Killable() public{}

    function split(address recipient1, address recipient2) public payable{
        require(msg.value > 0);
        require(areRecipientsValid(msg.sender, recipient1, recipient2));

        uint halfOfValue = (msg.value / 2);
        balances[recipient1] += halfOfValue;
        balances[recipient2] += halfOfValue;

        /* The rest accumulates to owner */
        if(msg.value % 2 != 0) {
            balances[owner] += 1;
        }

        LogSplitter(recipient1, recipient2, halfOfValue, halfOfValue);
    }

    function withdrawFunds() public{
        require(balances[msg.sender] > 0);

        LogWithdrawal(msg.sender, balances[msg.sender]);

        uint amountToTransfer = balances[msg.sender];
        balances[msg.sender] = 0;

        msg.sender.transfer(amountToTransfer);
    }

    function areRecipientsValid(address giver, address recipient1, address recipient2) private returns (bool){
        return giver != recipient1 && giver != recipient2 && recipient1 != recipient2;
    }
}