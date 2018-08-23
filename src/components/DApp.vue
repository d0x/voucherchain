<template>
    <div class="container">
        <h1>Voucher DApp</h1>
        <p>Buy and sell custom vouchers.</p>
        <div class="card-deck">
            <ContractInformation/>
            <MetaMask/>
            <VoucherInput/>
        </div>

        <VoucherList/>
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
        async beforeCreate () {
            console.log('Init components')
            await this.$store.dispatch('initWeb3')
            await this.$store.dispatch('fetchVoucherCount')
            await this.$store.dispatch('fetchContractInformation')
        }
    }
</script>

<style scoped>

</style>
