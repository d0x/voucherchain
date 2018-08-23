/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import voucher from "./voucher";
import web3 from "./web3";

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    modules: {
        web3,
        voucher
    }
})
