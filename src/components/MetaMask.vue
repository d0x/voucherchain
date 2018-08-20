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
                return this.$store.state.web3.account;
            },
            balance () {
                return this.$store.state.web3.balance;
            }
        }
    }
</script>
<style scoped></style>
