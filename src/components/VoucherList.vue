<template>
    <div>
        <h1>Vouchers</h1>
        <div class="card-columns">
            <VoucherCard v-for="voucher in vouchers" :key="voucher.index" :voucher="voucher"/>
        </div>
    </div>
</template>
<script>
    import VoucherCard from '@/components/VoucherCard'

    export default {
        components: {
            VoucherCard
        },
        computed: {
            vouchers () {
                return this.$store.state.voucher.vouchers
            }
        }
    }
</script>
<style scoped></style>
