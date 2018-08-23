<template>
    <!-- shows that i'm reading data from my contract -->
    <div class="card" style="width: 18rem;" :class="{ 'bg-dark': voucher.completed}">
        <div class="card-header">
            {{voucher.owner}}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{voucher.country}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{voucher.zip}}</h6>
            <p class="card-text">{{voucher.text}}</p>
        </div>
        <div class="card-footer">
            {{voucher.price}}
            <a v-if="!voucher.completed" href="#" class="card-link pull-right" v-on:click.once.prevent="buy">buy</a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['voucher'],
        methods: {
            buy (e) {
                this.$store.dispatch('buyVoucher',
                    {
                        index: this.voucher.index,
                        price: this.voucher.price
                    })
            }
        }
    }
</script>
<style scoped></style>
