import Web3 from 'web3'

function initWeb3 () {
    const globalWeb3 = window.web3

    let globalWeb3Provider = null

    // Is there an injected web3 instance?
    if (typeof globalWeb3 !== 'undefined') {
        globalWeb3Provider = globalWeb3.currentProvider
    } else {
        // If no injected web3 instance is detected, fall back to Ganache
        globalWeb3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    const web3 = new Web3(globalWeb3Provider)

    web3.eth.getAccountsPromise = function () {
        return new Promise(function (resolve, reject) {
            web3.eth.getAccounts(function (e, accounts) {
                if (e != null) {
                    reject(e)
                } else {
                    resolve(accounts)
                }
            })
        })
    }

    return {web3: web3, web3Provider: globalWeb3Provider}
}

export default initWeb3
