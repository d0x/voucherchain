<template>
    <div class="container">
        <order/>
    </div>
</template>

<script>
    import StoredValue from '@/components/StoredValue'
    import Order from '@/components/Order'

    export default {
        components: {
            'storedValue': StoredValue,
            'order': Order
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
