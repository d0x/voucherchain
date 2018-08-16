<template>
    <div class="container">
        <MetaMask/>
        <Order/>
    </div>
</template>

<script>
    import MetaMask from "./MetaMask";
    import Order from "./Order";

    export default {
        components: {
            Order,
            MetaMask
        },
        async beforeCreate () {
            console.log('Init components')
            await this.$store.dispatch('initWeb3')
            await this.$store.dispatch('fetchStoredValue')
            await this.$store.dispatch('fetchOrderCount')
        }
    }
</script>

<style scoped>

</style>
