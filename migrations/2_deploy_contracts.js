var Restaurants = artifacts.require("./Restaurants.sol");

module.exports = function(deployer) {
  deployer.deploy(Restaurants);
};
