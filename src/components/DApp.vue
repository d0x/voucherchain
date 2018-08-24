<template>
    <div class="container">
        <h1>Voucher DApp</h1>
        <div v-if="web3Available">
            <div>Buy and sell custom vouchers.</div>
            <div class="card-deck">
                <ContractInformation/>
                <MetaMask/>
                <VoucherInput/>
            </div>

            <VoucherList/>
        </div>
        <div v-else class="alert alert-danger" role="alert">
            <div>No Web3 instance detected. Please configure MetaMask correctly and then reload this page.</div>
        </div>
    </div>
</template>

<script>
    import MetaMask from "./MetaMask";
    import VoucherList from "./VoucherList";
    import VoucherInput from "./VoucherInput";
    import ContractInformation from "./ContractInformation";

    export default {
        components: {
            ContractInformation,
            VoucherInput,
            VoucherList,
            MetaMask
        },
        computed: {
            web3Available () {
                return this.$store.state.web3.web3 != null;
            }
        },
        async beforeCreate () {
            console.log('Init components')
            await this.$store.dispatch('initWeb3')
            if (this.$store.state.web3.web3) {
                await this.$store.dispatch('fetchVoucherCount')
                await this.$store.dispatch('fetchContractInformation')
            }
        }
    }
</script>

<style scoped>

</style>
