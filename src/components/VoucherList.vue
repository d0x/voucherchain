<template>
    <div>
        <h3>Vouchers</h3>
        <div>
            <label class="form-check-label" for="onlyAvailable">Options:</label>
            <a id="onlyAvailable" href="#" class="btn btn-primary"
               v-on:click="toggleFilter">{{buttonText}}
            </a>
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
        data: () => (
            {
                onlyAvailable: false
            }
        ),
        computed: {
            vouchers () {
                return this.$store.state.voucher.vouchers
                    .filter(voucher => !this.onlyAvailable || (!voucher.sold && !voucher.revoked))
            },
            buttonText () {
                return this.onlyAvailable ? "show all" : "only available";
            }
        },
        methods: {
            toggleFilter () {
                this.onlyAvailable = !this.onlyAvailable
            }
        },
    }
</script>
<style scoped></style>
