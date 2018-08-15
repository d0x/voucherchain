pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Orders.sol";

contract TestOrders {

    Orders orders = Orders(DeployedAddresses.Orders());

    function test_empty_table() public {
        uint actual = orders.getCount();

        Assert.equal(actual, 0, "It should be empty on creation");
    }

    function test_insert() public {
        uint index = orders.insert("DE", "60486", "Pizza Hawaii");
        Assert.equal(index, 0, "It should be on the first index.");
    }

    function test_count_after_insert() public {
        Assert.equal(orders.getCount(), 1, "After insert it should be 1 element");
    }

    function test_insert_second_order() public {
        uint index = orders.insert("DE", "60486", "Pizza Diablo");
        Assert.equal(index, 1, "It should be on the first index.");
        Assert.equal(orders.getCount(), 2, "Two Orders should be present");
    }

    function test_order_is_open() public {
        address owner;
        string memory country;
        string memory zip;
        string memory text;
        bool completed;

        (owner, country, zip, text, completed) = orders.get(0);
        Assert.equal(completed, false, "Initial Order state check");
        Assert.equal(text, "Pizza Hawaii", "Initial Order state check");
        Assert.equal(country, "DE", "Initial Order state check");
        Assert.equal(zip, "60486", "Initial Order state check");
    }

    function test_buy_order() public {
        orders.buy(0);

        address owner;
        string memory country;
        string memory zip;
        string memory text;
        bool completed;

        (owner, country, zip, text, completed) = orders.get(0);
        Assert.equal(completed, true, "Should be completed after buy");
    }

    //    function test_get() public {
    //        uint index;
    //        string memory url;
    //        string memory name;
    //
    //        (url, name, index) = orders.get(0x00);
    //        Assert.equal(name, "Order1", "Wrong name");
    //        Assert.equal(url, "www.example.com", "Wrong Url");
    //        Assert.equal(index, 0, "Wrong Url");
    //
    //        (url, name, index) = orders.get(0x01);
    //        Assert.equal(name, "Order2", "Wrong name");
    //        Assert.equal(url, "www.example2.com", "Wrong Url");
    //        Assert.equal(index, 1, "Wrong Url");
    //    }
    //
    //    function test_delete_order() public {
    //        uint oldIndex = orders.remove(0x00);
    //        Assert.equal(oldIndex, 0, "Should be deleted");
    //        Assert.equal(orders.getCount(), 1, "Should only be one after deletion");
    //    }
    //
    //    function test_remaining_order() public {
    //        uint index;
    //        string memory url;
    //        string memory name;
    //
    //        (url, name, index) = orders.get(0x01);
    //        Assert.equal(name, "Order2", "Wrong name");
    //        Assert.equal(url, "www.example2.com", "Wrong Url");
    //        Assert.equal(index, 0, "Wrong Url");
    //        Assert.equal(orders.getCount(), 1, "1 remaining order");
    //    }


}
