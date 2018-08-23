const Restaurants = artifacts.require('./Restaurants.sol')
const Vouchers = artifacts.require('./Vouchers.sol')

module.exports = function (deployer) {
  deployer.deploy(Restaurants)
  deployer.deploy(Vouchers)
}
