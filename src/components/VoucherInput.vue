<template>
    <!-- shows that i'm writing data to my contract -->
    <form id="newVoucher" v-on:submit.prevent="placeVoucher()">
        <div class="form-group">
            <label for="title">Title:</label>
            <input id="title" class="form-control" v-model="voucher.title" placeholder="Headline for your voucher."
                   required/>
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <input id="description" class="form-control" v-model="voucher.description"
                   placeholder="Describe your voucher here."/>
        </div>
        <div class="form-group">
            <label for="priceInEther">Price:</label>
            <div class="input-group-prepend">
                <span class="input-group-text">Ether</span>
                <input id="priceInEther" class="form-control" v-model="voucher.priceInEther"
                       placeholder="Voucher price in Ether. Something like 0.5"
                       required/>
            </div>
        </div>

        <button type="submit" class="btn btn-primary">place Voucher</button>
    </form>
</template>
<script>
    export default {
        data: () => (
            {
                voucher: {
                    title: '',
                    description: '',
                    priceInEther: null
                }
            }),
        methods: {
            async placeVoucher () {
                if (/^[0-9]+$/.test(this.voucher.priceInEther))
                    await this.$store.dispatch('placeVoucher', this.voucher)
                else {
                    alert("Should be a positive number like 0.5.")
                }
            }
        }
    }
</script>
<style scoped></style>
