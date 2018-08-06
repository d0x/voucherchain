const Restaurants = artifacts.require('./Restaurants.sol')
const SimpleStorage = artifacts.require('./SimpleStorage.sol')

module.exports = function (deployer) {
  deployer.deploy(Restaurants)
  deployer.deploy(SimpleStorage)
}
