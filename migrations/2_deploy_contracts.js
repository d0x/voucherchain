const Restaurants = artifacts.require('./Restaurants.sol')
const SimpleStorage = artifacts.require('./SimpleStorage.sol')
const Orders = artifacts.require('./Orders.sol')

module.exports = function (deployer) {
  deployer.deploy(Restaurants)
  deployer.deploy(SimpleStorage)
  deployer.deploy(Orders)
}
