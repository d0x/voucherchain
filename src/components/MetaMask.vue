<template>
    <div class="card">
        <div class="card-header">Your MetaMask account</div>
        <div class="card-body">
            <ul class="list-group">
                <!-- shows that i'm reading account information from MetaMask -->
                <li class="list-group-item abbreviate">Account: {{account}}</li>
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
