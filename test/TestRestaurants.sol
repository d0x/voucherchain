pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Restaurants.sol";

contract TestRestaurants {

    Restaurants restaurants = Restaurants(DeployedAddresses.Restaurants());

    function test_empty_table() public {
        uint actual = restaurants.getCount();

        Assert.equal(actual, 0, "It should be empty on creation");
    }

    function test_insert() public {
        uint index = restaurants.insert(0x00, "Restaurant1", "www.example.com");
        Assert.equal(index, 0, "It should be on the first index.");
    }

    function test_count_after_insert() public {
        Assert.equal(restaurants.getCount(), 1, "After insert it should be 1 element");
    }

    function test_insert_second_restaurant() public {
        uint index = restaurants.insert(0x01, "Restaurant2", "www.example2.com");
        Assert.equal(index, 1, "It should be on the first index.");
        Assert.equal(restaurants.getCount(), 2, "Two Restaurants should be present");
    }

    function test_get() public {
        uint index;
        string memory url;
        string memory name;

        (url, name, index) = restaurants.get(0x00);
        Assert.equal(name, "Restaurant1", "Wrong name");
        Assert.equal(url, "www.example.com", "Wrong Url");
        Assert.equal(index, 0, "Wrong Url");

        (url, name, index) = restaurants.get(0x01);
        Assert.equal(name, "Restaurant2", "Wrong name");
        Assert.equal(url, "www.example2.com", "Wrong Url");
        Assert.equal(index, 1, "Wrong Url");
    }

    function test_delete_restaurant() public {
        uint oldIndex = restaurants.remove(0x00);
        Assert.equal(oldIndex, 0, "Should be deleted");
        Assert.equal(restaurants.getCount(), 1, "Should only be one after deletion");
    }

    function test_remaining_restaurant() public {
        uint index;
        string memory url;
        string memory name;

        (url, name, index) = restaurants.get(0x01);
        Assert.equal(name, "Restaurant2", "Wrong name");
        Assert.equal(url, "www.example2.com", "Wrong Url");
        Assert.equal(index, 0, "Wrong Url");
        Assert.equal(restaurants.getCount(), 1, "1 remaining restaurant");
    }


}
