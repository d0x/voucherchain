const Vouchers = artifacts.require('./Vouchers.sol')

module.exports = function (deployer) {
    deployer.deploy(Vouchers).then(function (instance) {
        instance.insert("Block Stone Massage", "Relief your chain with a perfect block stone massage.", 300000000000000000)
        instance.insert("Chain Blocker Concert", "Join the distributed concert and have fun with all the block chainers around.", 500000000000000000)
        instance.insert("Voucher 42", "The answer to life, the universe and everything.", 1337000000000000000000)
        instance.revoke(2)
    })
}
