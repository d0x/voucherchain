<template>
    <div>
        <h1>MetaMask</h1>

        <ul>
            <li>Account: {{account}}</li>
            <li>Balance: {{balance}}</li>
        </ul>

    </div>
</template>
<script>

    export default {
        computed: {
            account () {
                return this.$store.state.account;
            },
            balance () {
                return this.$store.state.balance;
            }
        }
    }
</script>
<style scoped></style>
