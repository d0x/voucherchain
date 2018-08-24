import Web3 from 'web3'

export default function initWeb3 () {
    const globalWeb3 = window.web3
    let globalWeb3Provider = null

    // Is there an injected web3 instance?
    if (typeof globalWeb3 !== 'undefined') {
        globalWeb3Provider = globalWeb3.currentProvider
    } else {
        return {web3: null, web3Provider: null}
    }

    const web3 = new Web3(globalWeb3Provider)

    web3.eth.getAccountsPromise = function () {
        return new Promise(function (resolve, reject) {
            web3.eth.getAccounts((e, accounts) => {
                if (e != null) {
                    reject(e)
                } else {
                    resolve(accounts)
                }
            })
        })
    }

    web3.eth.getBalancePromise = function (address) {
        return new Promise(function (resolve, reject) {
            web3.eth.getBalance(address, (e, balance) => {
                if (e != null) {
                    reject(e)
                } else {
                    resolve(web3.fromWei(balance, "ether") + " ETH")
                }
            })
        })
    }

    return {web3: web3, web3Provider: globalWeb3Provider}
}
