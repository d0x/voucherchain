export default {
    strict: true,
    state: {
        account: null,
        balance: null,
        voucherCount: null,
        vouchers: [],
        owner: null,
        contactInfo: null
    },
    getters: {},
    mutations: {
        setVoucherCount (state, value) {
            console.log('set voucherCount to ', value.toNumber())
            state.voucherCount = value
        },
        setVouchers (state, value) {
            state.vouchers = value
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

            commit('setOwner', await rootState.web3.vouchersInstance().owner.call())
            commit('setContactInfo', await rootState.web3.vouchersInstance().contactInformation.call())
        },
        async fetchVoucherCount({commit, state, rootState}) {
            console.log('Reading voucherCount from blockchain')

            let count = (await rootState.web3.vouchersInstance().getCount.call()).toNumber();

            let allVouchers = Array.from(Array(count).keys())
                .map(async (i) => {
                        let voucher = await rootState.web3.vouchersInstance().get.call(i);
                        return {
                            owner: voucher[0],
                            country: voucher[1],
                            zip: voucher[2],
                            text: voucher[3],
                            completed: voucher[4],
                            price: voucher[5],
                            index: i
                        }
                    }
                );

            Promise.all(allVouchers).then(e => {
                    commit('setVouchers', e)
                }
            )

            commit('setVoucherCount', await rootState.web3.vouchersInstance().getCount.call())
        },
        async placeVoucher ({commit, state, rootState}, voucher) {
            console.log('Sending voucher', JSON.stringify(voucher), 'into the blockchain')

            await rootState.web3.vouchersInstance().insert(voucher.country, voucher.zip, voucher.text, voucher.price, {from: rootState.web3.account});
        },
        async buyVoucher ({commit, state, rootState}, {index, price}) {
            console.log('Buy voucher at index', index, 'for', price, state.account)

            await rootState.web3.vouchersInstance().buy(index,
                {from: rootState.web3.account, value: web3.toWei(10, 'ether')})
        }
    }
}
