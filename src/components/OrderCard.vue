<template>
    <!-- shows that i'm reading data from my contract -->
    <div class="card" style="width: 18rem;" :class="{ 'bg-dark': order.completed}">
        <div class="card-header">
            {{order.owner}}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{order.country}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{order.zip}}</h6>
            <p class="card-text">{{order.text}}</p>
        </div>
        <div class="card-footer">
            {{order.price}}
            <a v-if="!order.completed" href="#" class="card-link pull-right" v-on:click.once.prevent="buy">buy</a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['order'],
        methods: {
            buy (e) {
                this.$store.dispatch('buyOrder',
                    {
                        index: this.order.index,
                        price: this.order.price
                    })
            }
        }
    }
</script>
<style scoped></style>
