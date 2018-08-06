<template>
    <div>
        <storedValue/>
    </div>
</template>

<script>
    import StoredValue from '@/components/StoredValue'

    export default {
        name: 'd-app',
        components: {
            'storedValue': StoredValue
        },
        async beforeCreate () {
            console.log('Init components')
            await this.$store.dispatch('initWeb3')
            await this.$store.dispatch('fetchStoredValue')
        }
    }
</script>

<style scoped>

</style>
