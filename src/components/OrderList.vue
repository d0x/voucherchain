<template>
    <div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="onlyAvailable" v-model="onlyAvailable">
            <label class="form-check-label" for="onlyAvailable">
                Only available
            </label>
        </div>

        <div class="card-columns">
            <orderCard v-for="order in orders" :key="order.index" :order="order"/>
        </div>
    </div>
</template>
<script>
    import OrderCard from '@/components/OrderCard'
    import OrderInput from '@/components/OrderInput'

    export default {
        components: {
            'orderCard': OrderCard
        },
        data: function () {
            return {
                onlyAvailable: false
            }
        },
        computed: {
            orders () {
                return this.$store.state.order.orders
                    .filter(order => !this.onlyAvailable || !order.completed)
            }
        }
    }
</script>
<style scoped></style>
