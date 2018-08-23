<template>
    <!-- shows that i'm writing data to my contract -->
    <form id="newVoucher" v-on:submit.prevent="placeVoucher()">
        <div class="form-group">
            <label for="country">Country:</label>
            <input id="country" class="form-control" v-model="voucher.country"/>
        </div>
        <div class="form-group">
            <label for="zip">ZIP:</label>
            <input id="zip" class="form-control" v-model="voucher.zip"/>
        </div>
        <div class="form-group">
            <label for="text">Text:</label>
            <input id="text" class="form-control" v-model="voucher.text" placeholder="Describe your voucher here."/>
        </div>
        <div class="form-group">
            <label for="text">Price in ETH:</label>
            <input id="price" class="form-control" v-model="voucher.price" placeholder="Price in wei"/>
        </div>
        <button type="submit" class="btn btn-primary">place Voucher</button>
    </form>
</template>
<script>
    export default {
        data: function () {
            return {
                voucher: {
                    country: 'DE',
                    zip: '60486',
                    text: '',
                    price: 1000
                }
            }
        },
        methods: {
            async placeVoucher () {
                await this.$store.dispatch('placeVoucher', this.$data.voucher)
            }
        }
    }
</script>
<style scoped></style>
