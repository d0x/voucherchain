<template>
    <div>
        <p>Current Store value {{storeValue}}</p>

        <form v-on:submit.prevent="sendNewValue()">
            <input v-model="newStoreValue" placeholder="Enter new Value and press enter to submit."/>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'storeDisplay',
        data: function () {
            return {
                newStoreValue: ''
            }
        },
        computed: {
            storeValue () {
                return this.$store.getters.storeValue
            }
        },
        methods: {
            async sendNewValue () {
                let newStoreValue = this.$data.newStoreValue

                await this.$store.dispatch('updateStoreValue', newStoreValue)
                await this.$store.dispatch('fetchStoredValue')
            }
        }
    }
</script>
<style scoped></style>
