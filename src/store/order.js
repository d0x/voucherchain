export default {
    strict: true,
    state: {
        account: null,
        balance: null,
        orderCount: null,
        orders: [],
        owner: null,
        contactInfo: null
    },
    getters: {},
    mutations: {
        setOrderCount (state, value) {
            console.log('set orderCount to ', value.toNumber())
            state.orderCount = value
        },
        setOrders (state, value) {
            state.orders = value
        },
        setOwner(state, value) {
            state.owner = value
        },
        setContactInfo(state, value) {
            state.contactInfo = value
        }

    },
    actions: {
        async fetchContractInformation({commit, state, rootState}) {
            console.log('Reading owner from blockchain')

            commit('setOwner', await rootState.web3.ordersInstance().owner.call())
            commit('setContactInfo', await rootState.web3.ordersInstance().contactInformation.call())
        },
        async fetchOrderCount({commit, state, rootState}) {
            console.log('Reading orderCount from blockchain')

            let count = (await rootState.web3.ordersInstance().getCount.call()).toNumber();

            let allOrders = Array.from(Array(count).keys())
                .map(async (i) => {
                        let order = await rootState.web3.ordersInstance().get.call(i);
                        return {
                            owner: order[0],
                            country: order[1],
                            zip: order[2],
                            text: order[3],
                            completed: order[4],
                            price: order[5],
                            index: i
                        }
                    }
                );

            Promise.all(allOrders).then(e => {
                    commit('setOrders', e)
                }
            )

            commit('setOrderCount', await rootState.web3.ordersInstance().getCount.call())
        },
        async placeOrder ({commit, state, rootState}, order) {
            console.log('Sending order', JSON.stringify(order), 'into the blockchain')

            await rootState.web3.ordersInstance().insert(order.country, order.zip, order.text, order.price, {from: rootState.web3.account});
        },
        async buyOrder ({commit, state, rootState}, {index, price}) {
            console.log('Buy order at index', index, 'for', price, state.account)

            await rootState.web3.ordersInstance().buy(index,
                {from: rootState.web3.account, value: web3.toWei(10, 'ether')})
        }
    }
}
