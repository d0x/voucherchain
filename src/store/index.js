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
            return state.storeValue
        }
    },
    mutations: {
        setWeb3 (state, result) {
            console.log('Set Web3 instance')
            // state.web3 = () => result.web3
            state.web3 = () => result.web3
            state.web3Provider = () => result.web3Provider
            state.simpleStorageInstance = () => result.simpleStorageInstance
            state.account = () => result.account
        },
        setSimpleStorageContract (state, result) {
            console.log('Set SimpleStorageContract')
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

            const stuff = await getWeb3()

            const web3 = stuff.web3
            const web3Provider = stuff.web3Provider

            const account = (await web3.eth.getAccountsPromise())[0]

            const TruffleContract = require('truffle-contract')
            const SimpleStorage = TruffleContract(SimpleStorageArtifact)
            SimpleStorage.setProvider(web3Provider)

            let simpleStorageInstance = await SimpleStorage.deployed()

            commit('setWeb3', {
                web3, web3Provider, account, simpleStorageInstance
            })
        },
        async fetchStoredValue ({commit, state}) {
            console.log('Update stored value')

            commit('setStoredValue', JSON.stringify(await state.simpleStorageInstance().get.call()))
        },
        async updateStoreValue ({commit, state}, newValue) {
            console.log('Sending', newValue, 'to the Blockchain')

            await state.simpleStorageInstance().set(newValue, {from: state.account()})
        }
    }
})
