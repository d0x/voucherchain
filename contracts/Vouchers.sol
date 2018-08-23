pragma solidity ^0.4.17;

import "zeppelin/contracts/ownership/Ownable.sol";
import "zeppelin/contracts/ownership/Contactable.sol";

contract Vouchers is Contactable {

    struct Voucher {
        //         this marker is used
        //        bool exists;

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

    Voucher[] private vouchers;

    constructor() public {
        setContactInformation("You can contact me on https://github.com/d0x or https://twitter.com/chrschneider");
    }

    function getCount()
    public
    constant
    returns (uint count)
    {
        return vouchers.length;
    }

    function insert(string title, string description, uint price)
    public
    returns (uint index)
    {
        Voucher memory newVoucher;
        newVoucher.sold = false;
        newVoucher.revoked = false;
        newVoucher.owner = msg.sender;
        //        newVoucher.exists = true;
        newVoucher.title = title;
        newVoucher.description = description;
        newVoucher.price = price;

        index = vouchers.push(newVoucher) - 1;
        newVoucher.index = index;
        return index;
    }

    function get(uint index)
    public
    constant
    returns (address owner, address buyer, string title, string description, bool sold, bool revoked, uint price){
        require(vouchers[index].owner != 0, "Invalid voucher index");

        Voucher memory voucher = vouchers[index];

        return (voucher.owner, voucher.buyer, voucher.title, voucher.description, voucher.sold, voucher.revoked, voucher.price);
    }

    function buy(uint index)
    payable
    public {
        require(vouchers[index].owner != 0, "Invalid voucher index");
        require(!vouchers[index].sold, "Voucher is already sold");
        require(msg.value == vouchers[index].price, "Invalid amount of wei");

        vouchers[index].owner.transfer(msg.value);
        vouchers[index].sold = true;
        vouchers[index].buyer = msg.sender;
    }

    function revoke(uint index)
    public {
        require(!vouchers[index].sold, "You can't revoke sold vouchers");
        require(vouchers[index].owner != 0, "Invalid voucher index");
        require(vouchers[index].owner == msg.sender, "Only voucher owner can revoke vouchers");

        vouchers[index].revoked = true;
    }

}
