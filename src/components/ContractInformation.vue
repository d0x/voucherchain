<template>
    <!--shows that i'm using a libary (zeppelin) from EthPM -->
    <div class="list-group">
        <div class="list-group-item">This contract is owned by: {{owner}}</div>
        <div class="list-group-item">Contact Information: {{contactInfo}}</div>
    </div>
</template>

<script>
    export default {
        computed: {
            owner () {
                return this.$store.state.order.owner
            },
            contactInfo () {
                return this.$store.state.order.contactInfo
            }

        }
    }
</script>

<style scoped>

</style>
