<template>
    <div class="card bg-light border-light">
        <div class="card-header">
            Create new Voucher
        </div>
        <!-- shows that i'm writing data to my contract -->
        <form id="newVoucher" v-on:submit.prevent="placeVoucher()">
            <div class="card-body">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input id="title" class="form-control" v-model="voucher.title"
                           placeholder="Headline for your voucher."
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
                               placeholder="A value like 0.5"
                               required/>
                    </div>
                </div>

            </div>
            <div class="card-footer">
                <div class="row">
                    <button type="submit" class="col-sm-push btn btn-primary">place Voucher</button>
                </div>
            </div>
        </form>
    </div>
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
