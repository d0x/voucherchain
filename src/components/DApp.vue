<template>
    <div class="container">
        <div class="card-deck">
            <ContractInformation/>
            <MetaMask/>
        </div>

        <VoucherList/>

        <div class="card">
            <div class="card-header">
                Place Voucher
            </div>
            <div class="card-body">
                <VoucherInput/>
            </div>
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
