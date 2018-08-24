pragma solidity ^0.4.17;

import "zeppelin/contracts/ownership/Ownable.sol";
import "zeppelin/contracts/ownership/Contactable.sol";

contract Vouchers is Contactable {

    event Inserted(address owner, address buyer, string title, string description, bool sold, bool revoked, uint price, uint index);
    event Sold(uint index);
    event Revoked(uint index);

    struct Voucher {
        // is this voucher sold already?
        bool sold;

        // is this voucher revoked by the voucher owner?
        bool revoked;

        // voucher was created by this owner
        address owner;

        // when sold, this is the owner of the voucher
        address buyer;

        string title;
        string description;

        // in wei
        uint price;

        // used for the vouchers array
        uint index;
    }

    Voucher[] public vouchers;

    bool public stopped = false;

    modifier stopInEmergency {require(!stopped);
        _;}

    modifier voucherExists(uint index) {require(vouchers[index].owner != 0, "A voucher with this index doesn't exist");
        _;}

    constructor() public {
        // Sets the contact information provided by OpenZeppelin and imported with EthPM
        setContactInformation("You can contact me on https://github.com/d0x or https://twitter.com/chrschneider");
    }

    // get the current count of vouchers. This is used to fetch different vouchers.
    function getCount()
    public
    constant
    returns (uint count)
    {
        return vouchers.length;
    }

    // inserts a new voucher at.
    function insert(string title, string description, uint price)
    stopInEmergency
    public
    returns (uint index)
    {
        Voucher memory newVoucher;
        newVoucher.sold = false;
        newVoucher.revoked = false;
        newVoucher.owner = msg.sender;
        newVoucher.title = title;
        newVoucher.description = description;
        newVoucher.price = price;

        index = vouchers.push(newVoucher) - 1;
        newVoucher.index = index;

        emit Inserted(newVoucher.owner, newVoucher.buyer, newVoucher.title, newVoucher.description, newVoucher.sold, newVoucher.revoked, newVoucher.price, newVoucher.index);
    }

    // get a voucher at the given index.
    function get(uint index)
    voucherExists(index)
    public
    constant
    returns (address owner, address buyer, string title, string description, bool sold, bool revoked, uint price){
        Voucher memory voucher = vouchers[index];
        return (voucher.owner, voucher.buyer, voucher.title, voucher.description, voucher.sold, voucher.revoked, voucher.price);
    }

    // buy an available voucher at the given index.
    function buy(uint index)
    stopInEmergency
    voucherExists(index)
    payable
    public {
        require(!vouchers[index].sold, "Voucher is already sold");
        require(msg.value == vouchers[index].price, "Invalid amount of wei");

        vouchers[index].owner.transfer(msg.value);
        vouchers[index].sold = true;
        vouchers[index].buyer = msg.sender;
        emit Sold(index);
    }

    // mark a voucher as "revoked" so that i can't be bought anymore.
    function revoke(uint index)
    stopInEmergency
    voucherExists(index)
    public {
        require(!vouchers[index].sold, "You can't revoke sold vouchers");
        require(vouchers[index].owner != 0, "Invalid voucher index");
        require(vouchers[index].owner == msg.sender, "Only voucher owner can revoke vouchers");

        vouchers[index].revoked = true;
        emit Revoked(index);
    }

    // Circuit Breaker: After calling this, only a subset of functions can be executed
    function emergencyStop()
    onlyOwner
    public {
        stopped = true;
    }

    // Circuit Breaker: After calling this, everything can be exectued again.
    function emergencyStopEnd()
    onlyOwner
    public {
        stopped = false;
    }

    // Mortal Contract: Remove the contract and payout everything (which should be nothing) to the owner.
    function kill()
    onlyOwner
    public {
        selfdestruct(owner);
    }
}
