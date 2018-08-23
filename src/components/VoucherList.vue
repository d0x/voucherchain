<template>
    <div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="onlyAvailable" v-model="onlyAvailable">
            <label class="form-check-label" for="onlyAvailable">
                Only available
            </label>
        </div>

        <div class="card-columns">
            <voucherCard v-for="voucher in vouchers" :key="voucher.index" :voucher="voucher"/>
        </div>
    </div>
</template>
<script>
    import VoucherCard from '@/components/VoucherCard'

    export default {
        components: {
            'voucherCard': VoucherCard
        },
        data: function () {
            return {
                onlyAvailable: false
            }
        },
        computed: {
            vouchers () {
                return this.$store.state.voucher.vouchers
                    .filter(voucher => !this.onlyAvailable || !voucher.completed)
            }
        }
    }
</script>
<style scoped></style>
