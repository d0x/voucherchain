<template>
    <div class="card" style="width: 18rem;" :class="{ 'bg-dark': order.completed}">
        <div class="card-header">
            {{order.owner}}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{order.country}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{order.zip}}</h6>
            <p class="card-text">{{order.text}}</p>
            <a v-if="!order.completed" href="#" class="card-link" v-on:click.once.prevent="buy">buy</a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['order'],
        methods: {
            buy (e) {
                this.$store.dispatch('buyOrder', this.order.index)
            }
        }
    }
</script>
<style scoped></style>
