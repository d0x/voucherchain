/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
// import pollWeb3 from '../util/pollWeb3'
// import RestaurantsContract from '../build/contracts/Restaurants.json'
import SimpleStorageArtifact from '../../build/contracts/SimpleStorage.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    state,
    getters: {
        storeValue (state) {
            return JSON.stringify(state.storeValue)
        }
    },
    mutations: {
        setWeb3 (state, result) {
            console.log('Set Web3 instance')
            state.web3 = result.web3
            state.web3Provider = result.web3Provider
            state.simpleStorageInstance = result.simpleStorageInstance
            state.account = result.account
        },
        setSimpleStorageContract (state, result) {
            console.log('set SimpleStorageContract')
            state.simpleStorageContract = result
        },
        setStoredValue (state, value) {
            console.log('set store value to ', value)
            state.storeValue = value
        }
    },
    actions: {
        async initWeb3 ({commit}) {
            console.log('Init Web3')

            const {web3, web3Provider} = await getWeb3()

            const TruffleContract = require('truffle-contract')
            const SimpleStorage = TruffleContract(SimpleStorageArtifact)
            SimpleStorage.setProvider(web3Provider)

            let simpleStorageInstance = await SimpleStorage.deployed()

            const account = (await web3.eth.getAccountsPromise())[0]

            commit('setWeb3', {
                web3: () => web3,
                web3Provider: () => web3Provider,
                simpleStorageInstance: () => simpleStorageInstance,
                account: account
            })
        },
        async fetchStoredValue ({commit, state}) {
            console.log('Reading stored value from blockchain')

            commit('setStoredValue', await state.simpleStorageInstance().get.call())
        },
        async updateStoreValue ({commit, state}, x) {
            console.log('Sending', x, 'to the Blockchain')

            try {
                const {logs} = await state.simpleStorageInstance().set(x, {from: state.account})

                const {newValue} = logs.find(e => {
                    return e.event === "LogStoredDataChanged"
                }).args
                commit('setStoredValue', newValue)

                console.log('Events', logs)
            } catch (e) {
                console.log("Error!")
            }
        }
    }
})
