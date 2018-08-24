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
        addVoucher (state, value) {
            state.vouchers.push(value)
            state.voucherCount++
        },
        setOwner (state, value) {
            state.owner = value
        },
        setContactInfo (state, value) {
            state.contactInfo = value
        },
        setSold (state, {index, buyer}) {
            state.vouchers[index].buyer = buyer
            state.vouchers[index].sold = true
        },
        setRevoked (state, index) {
            state.vouchers[index].revoked = true
        }
    },
    actions: {
        async fetchContractInformation ({commit, state, rootState}) {
            console.log('Reading owner from blockchain')

            commit('setOwner', await rootState.web3.vouchersInstance().owner.call())
            commit('setContactInfo', await rootState.web3.vouchersInstance().contactInformation.call())
        },
        async fetchVoucherCount ({commit, state, rootState}) {
            console.log('Reading voucherCount from blockchain')

            let count = (await rootState.web3.vouchersInstance().getCount.call()).toNumber();

            let allVouchers = Array.from(Array(count).keys())
                .map(async (i) => {
                        let voucher = await rootState.web3.vouchersInstance().get.call(i);
                        let [owner, buyer, title, description, sold, revoked, price]
                            = await rootState.web3.vouchersInstance().get.call(i);
                        return {owner, buyer, title, description, sold, revoked, price, index: i}
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
            const result = await rootState.web3.vouchersInstance().insert(voucher.title, voucher.description, web3.toWei(voucher.priceInEther), {from: rootState.web3.account});

            const event = result.logs.find(res => res.event === "Inserted")
            commit('addVoucher', {
                sold: event.args.sold,
                revoked: event.args.revoked,
                owner: event.args.owner,
                title: event.args.title,
                description: event.args.description,
                buyer: event.args.buyer,
                price: event.args.price,
                index: event.args.index.toNumber(),
            })
        },
        async buyVoucher ({commit, state, rootState}, {index, price: priceInWei}) {
            console.log('Buy voucher at index', index, 'for', priceInWei, "wei with account:", state.account)

            const result = await rootState.web3.vouchersInstance().buy(index, {
                from: rootState.web3.account,
                value: priceInWei
            })
            const event = result.logs.find(res => res.event === "Sold")
            commit('setSold', {index: event.args.index.toNumber(), buyer: rootState.web3.account})
        },
        async revokeVoucher ({commit, state, rootState}, index) {
            console.log('Revoke voucher at index', index, "wei with account:", state.account)

            const result = await rootState.web3.vouchersInstance().revoke(index, {from: rootState.web3.account})
            const event = result.logs.find(res => res.event === "Revoked")
            commit('setRevoked', event.args.index.toNumber())
        }

    }
}
