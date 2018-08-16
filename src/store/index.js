/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
// import pollWeb3 from '../util/pollWeb3'
import SimpleStorageArtifact from '../../build/contracts/SimpleStorage.json'
import OrdersArtifact from '../../build/contracts/Orders.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    state,
    getters: {
    },
    mutations: {
        setWeb3 (state, result) {
            console.log('Set Web3 instance')
            state.web3 = result.web3
            state.web3Provider = result.web3Provider
            state.ordersInstance = result.ordersInstance
            state.balance = result.balance
            state.account = result.account
        },
        setOrderCount (state, value) {
            console.log('set orderCount to ', value)
            state.orderCount = value
        },
        setOrders (state, value) {
            state.orders = value
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
        },
        async fetchOrderCount ({commit, state}) {
            console.log('Reading orderCount from blockchain')

            let count = (await state.ordersInstance().getCount.call()).toNumber();

            let allOrders = Array.from(Array(count).keys())
                .map(async (i) => {
                        let order = await state.ordersInstance().get.call(i);
                        return {
                            owner: order[0],
                            country: order[1],
                            zip: order[2],
                            text: order[3],
                            completed: order[4],
                            index: i
                        }
                    }
                );

            Promise.all(allOrders).then(e => {
                    commit('setOrders', e)
                }
            )

            commit('setOrderCount', await state.ordersInstance().getCount.call())
        },
        async placeOrder ({commit, state}, order) {
            console.log('Sending order', order, 'into the blockchain')

            await state.ordersInstance().insert(order.country, order.zip, order.text, {from: state.account})
        },
        async buyOrder ({commit, state}, orderIndex) {
            console.log('Buy order at index', orderIndex, state.account)

            await state.ordersInstance().buy(orderIndex, {from: state.account})
        }

    }
})
