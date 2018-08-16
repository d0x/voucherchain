const Restaurants = artifacts.require('./Restaurants.sol')
const Orders = artifacts.require('./Orders.sol')

module.exports = function (deployer) {
  deployer.deploy(Restaurants)
  deployer.deploy(Orders)
}
