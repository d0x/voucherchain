<template>
    <form id="newOrder" v-on:submit.prevent="placeOrder()">
        <div class="form-group">
            <label for="country">Country:</label>
            <input id="country" class="form-control" v-model="order.country"/>
        </div>
        <div class="form-group">
            <label for="zip">ZIP:</label>
            <input id="zip" class="form-control" v-model="order.zip"/>
        </div>
        <div class="form-group">
            <label for="text">Text:</label>
            <input id="text" class="form-control" v-model="order.text" placeholder="Describe your order here."/>
        </div>
        <div class="form-group">
            <label for="text">Text:</label>
            <input id="price" class="form-control" v-model="order.price" placeholder="Price in wei"/>
        </div>
        <button type="submit" class="btn btn-primary">place Order</button>
    </form>
</template>
<script>
    export default {
        name: 'storeDisplay',
        data: function () {
            return {
                order: {
                    country: 'DE',
                    zip: '60486',
                    text: '',
                    price: 1000
                }
            }
        },
        methods: {
            async placeOrder () {
                await this.$store.dispatch('placeOrder', this.$data.order)
            }
        }
    }
</script>
<style scoped></style>
