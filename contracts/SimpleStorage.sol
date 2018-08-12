pragma solidity ^0.4.17;

contract SimpleStorage {
    uint storedData = 42;

    event LogStoredDataChanged(address indexed adr, uint newValue, uint oldValue);

    function set(uint x) public {
        emit LogStoredDataChanged(msg.sender, x, storedData);
        storedData = x * 2;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
