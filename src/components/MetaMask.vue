<template>
    <div>
        <h1>MetaMask</h1>
        <div class="card">
            <ul class="list-group">
                <!-- shows that i'm reading account information from MetaMask -->
                <li class="list-group-item">Account: {{account}}</li>
                <li class="list-group-item">Balance: {{balance}}</li>
            </ul>
        </div>
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
