pragma solidity ^0.4.17;

contract Orders {

    struct Order {
        bool exists;
        address owner;
        string country;
        string zip;
        string text;
        bool completed;
        uint index;
    }

    Order[] public orders;

    function insert(string country, string zip, string text)
    public
    returns (uint index)
    {
        Order memory newOrder;
        newOrder.owner = msg.sender;
        newOrder.exists = true;
        newOrder.text = text;
        newOrder.country = country;
        newOrder.zip = zip;
        newOrder.completed = false;

        index = orders.push(newOrder) - 1;
        newOrder.index = index;
        return index;
    }

    function buy(uint index)
    public {
        require(!orders[index].completed, "Order is already completed");
        require(orders[index].exists, "Invalid order index");

        orders[index].completed = true;
    }

    function close(uint index)
    public {
        require(!orders[index].completed, "Order is already completed");
        require(orders[index].exists, "Invalid order index");
        require(orders[index].owner == msg.sender, "Only owner can close orders");

        orders[index].completed = true;
    }

    function get(uint index)
    public
    constant
    returns (address owner, string country, string zip, string text, bool completed){
        require(orders[index].exists, "Invalid order index");

        Order memory order = orders[index];

        return (order.owner, order.country, order.zip, order.text, order.completed);
    }

    function getCount()
    public
    constant
    returns (uint count)
    {
        return orders.length;
    }

}
