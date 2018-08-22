<template>
    <div class="container">
        <MetaMask/>

        <h1>Orders</h1>
        <OrderList/>

        <div class="card">
            <div class="card-header">
                Place Order
            </div>
            <div class="card-body">
                <OrderInput/>
            </div>
        </div>
    </div>
</template>

<script>
    import MetaMask from "./MetaMask";
    import OrderList from "./OrderList";
    import OrderInput from "./OrderInput";

    export default {
        components: {
            OrderInput,
            OrderList,
            MetaMask
        },
        async beforeCreate() {
            console.log('Init components')
            await this.$store.dispatch('initWeb3')
            await this.$store.dispatch('fetchOrderCount')
        }
    }
</script>

<style scoped>

</style>
