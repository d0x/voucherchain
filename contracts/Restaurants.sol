pragma solidity ^0.4.17;

// Adjusted CRUD-Pattern from: https://medium.com/@robhitchens/solidity-crud-part-1-824ffa69509a
contract Restaurants {

    struct Restaurant {
        string name;
        string url;
        uint index;
    }

    mapping(address => Restaurant) private restaurants;
    address[] public restaurantIndex;

    event LogNewRestaurant   (address indexed adr, uint index, string name, string url);
    event LogUpdateRestaurant(address indexed adr, uint index, string name, string url);
    event LogDeleteRestaurant(address indexed adr, uint index);

    modifier exists(address restaurant) {
        require(isRestaurant(restaurant), "Restaurant Address doesn't exist");
        _;
    }

    modifier available(address restaurant) {
        require(!isRestaurant(restaurant), "Restaurant Address exist");
        _;
    }

    function isRestaurant(address adr)
    public
    constant
    returns (bool isIndeed)
    {
        if (restaurantIndex.length == 0) return false;
        return (restaurantIndex[restaurants[adr].index] == adr);
    }

    function insert(address adr, string name, string url)
    public
    available(adr)
    returns (uint index)
    {
        restaurants[adr].url = url;
        restaurants[adr].name = name;
        restaurants[adr].index = restaurantIndex.push(adr) - 1;
        emit LogNewRestaurant(adr, restaurants[adr].index, name, url);
        return restaurantIndex.length - 1;
    }

    function remove(address adr)
    public
    exists(adr)
    returns (uint index)
    {
        uint rowToDelete = restaurants[adr].index;
        address keyToMove = restaurantIndex[restaurantIndex.length - 1];
        restaurantIndex[rowToDelete] = keyToMove;
        restaurants[keyToMove].index = rowToDelete;
        restaurantIndex.length--;
        emit LogDeleteRestaurant(adr, rowToDelete);
        emit LogUpdateRestaurant(keyToMove, rowToDelete, restaurants[keyToMove].name, restaurants[keyToMove].url);
        return rowToDelete;
    }

    function get(address adr)
    public
    exists(adr)
    constant
    returns (string url, string name, uint index)
    {
        return (restaurants[adr].url, restaurants[adr].name, restaurants[adr].index);
    }

    function updateUrl(address adr, string url)
    public
    exists(adr)
    returns (bool success)
    {
        restaurants[adr].url = url;
        emit LogUpdateRestaurant(adr, restaurants[adr].index, url, restaurants[adr].name);
        return true;
    }

    function updateName(address adr, string name)
    public
    exists(adr)
    returns (bool success)
    {
        restaurants[adr].name = name;
        emit LogUpdateRestaurant(adr, restaurants[adr].index, restaurants[adr].url, name);
        return true;
    }

    function getCount()
    public
    constant
    returns (uint count)
    {
        return restaurantIndex.length;
    }

    function getRestaurantAtIndex(uint index)
    public
    constant
    returns (address adr)
    {
        require(index < restaurantIndex.length);
        return restaurantIndex[index];
    }

}
