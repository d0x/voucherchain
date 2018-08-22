<template>
    <p>{{owner}}</p>
</template>

<script>
    export default {
        computed: {
            owner() {
                return this.$store.state.order.owner
            }
        }
    }
</script>

<style scoped>

</style>
