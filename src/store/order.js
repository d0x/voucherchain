export default {
    strict: true,
    state: {
        account: null,
        balance: null,
        orderCount: null,
        orders: []
    },
    getters: {},
    mutations: {
        setOrderCount (state, value) {
            console.log('set orderCount to ', value.toNumber())
            state.orderCount = value
        },
        setOrders (state, value) {
            state.orders = value
        }
    },
    actions: {
        async fetchOrderCount ({commit, state, rootState}) {
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
        async placeOrder ({commit, state}, order) {
            console.log('Sending order', JSON.stringify(order), 'into the blockchain')

            await state.ordersInstance().insert(order.country, order.zip, order.text, {from: state.account});
        },
        async buyOrder ({commit, state}, orderIndex) {
            console.log('Buy order at index', orderIndex, state.account)

            await state.ordersInstance().buy(orderIndex, {from: state.account})
        }
    }
}
