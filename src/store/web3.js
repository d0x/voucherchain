import getWeb3 from "../util/getWeb3";
import OrdersArtifact from '../../build/contracts/Orders.json'

export default {
    strict: true,
    state: {
        web3: null,
        web3Provider: null,
        ordersInstance: null,
        account: null,
        balance: null
    },
    getters: {},
    mutations: {
        setWeb3 (state, result) {
            console.log('Set Web3 instance', result)
            state.web3 = result.web3
            state.web3Provider = result.web3Provider
            state.ordersInstance = result.ordersInstance
            state.balance = result.balance
            state.account = result.account
        },
        setAccount (state, {account, balance}) {
            state.account = account
            state.balance = balance
        }
    },
    actions: {
        async initWeb3 ({commit}) {
            console.log('Init Web3')

            const {web3, web3Provider} = await getWeb3()

            const TruffleContract = require('truffle-contract')

            const Orders = TruffleContract(OrdersArtifact)
            Orders.setProvider(web3Provider)
            let ordersInstance = await Orders.deployed()

            const account = (await web3.eth.getAccountsPromise())[0]
            const balance = await web3.eth.getBalancePromise(account)

            web3Provider.publicConfigStore.on('update', async e => {
                const account = e.selectedAddress
                const balance = await web3.eth.getBalancePromise(account)
                commit('setAccount', {account, balance})
            });

            commit('setWeb3', {
                web3: () => web3,
                web3Provider: () => web3Provider,
                ordersInstance: () => ordersInstance,
                account: account,
                balance: balance
            })
        }
    }
}
