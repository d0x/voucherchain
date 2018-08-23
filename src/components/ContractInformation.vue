<template>
    <!--shows that i'm using a libary (zeppelin) from EthPM to get the owner and contact information.-->
    <div class="card">
        <div class="card-header">Contract Information</div>
        <div class="card-body">
            <div class="list-group">
                <div class="list-group-item abbreviate">Owner: {{owner}}</div>
                <div class="list-group-item">Contact Information: {{contactInfo}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            owner () {
                return this.$store.state.voucher.owner
            },
            contactInfo () {
                return this.$store.state.voucher.contactInfo
            }

        }
    }
</script>

<style scoped></style>
