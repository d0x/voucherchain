<template>
    <!-- shows that i'm reading data from my contract -->
    <div class="card" style="width: 18rem;" :class="{ 'bg-dark': voucher.completed}">
        <div class="card-header">
            <div v-if="voucher.sold" class="sold-ribbon"><span>SOLD</span></div>
            <div v-if="voucher.revoked" class="revoked-ribbon"><span>REVOKED</span></div>
            {{voucher.title}}
        </div>
        <div class="card-body">
            <p class="card-text">{{voucher.description}}</p>
            <div class="owner abbreviate">Owner: {{voucher.owner}}</div>
        </div>
        <div class="card-footer">
            <div class="container">
                <div class="row">
                    <div class="col-sm" v-if="voucher.sold || voucher.revoked"></div>
                    <a class="col-sm" href="#" v-if="revokeable" v-on:click.once.prevent="revoke"> revoke </a>
                    <a class="col-sm" href="#" v-if="available && !soldByMe" v-on:click.once.prevent="buy"> buy </a>
                    <div class="col-sm-push">{{ price }} Ether</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['voucher'],
        computed: {
            price () {
                return web3.fromWei(this.voucher.price).toNumber()
            },
            available () {
                return !this.voucher.sold && !this.voucher.revoked
            },
            soldByMe () {
                return this.voucher.owner === this.$store.state.web3.account
            },
            revokeable () {
                return this.soldByMe && this.available
            }
        },
        methods: {
            buy (e) {
                this.$store.dispatch('buyVoucher',
                    {
                        index: this.voucher.index,
                        price: this.voucher.price
                    })
            },
            revoke (e) {
                this.$store.dispatch('revokeVoucher', this.voucher.index)
            }

        }
    }
</script>
<style scoped>
    .owner {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* created by https://www.cssportal.com/css-ribbon-generator/ */
    .sold-ribbon {
        position: absolute;
        right: -5px;
        top: -5px;
        z-index: 1;
        overflow: hidden;
        width: 75px;
        height: 75px;
        text-align: right;
    }

    .sold-ribbon span {
        font-size: 10px;
        font-weight: bold;
        color: #FFF;
        text-transform: uppercase;
        text-align: center;
        line-height: 20px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        width: 100px;
        display: block;
        background: #79A70A;
        background: linear-gradient(#F70505 0%, #8F0808 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px;
        right: -21px;
    }

    .sold-ribbon span::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 100%;
        z-index: -1;
        border-left: 3px solid #8F0808;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #8F0808;
    }

    .sold-ribbon span::after {
        content: "";
        position: absolute;
        right: 0px;
        top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-right: 3px solid #8F0808;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #8F0808;
    }

    .revoked-ribbon {
        position: absolute;
        right: -5px;
        top: -5px;
        z-index: 1;
        overflow: hidden;
        width: 75px;
        height: 75px;
        text-align: right;
    }

    .revoked-ribbon span {
        font-size: 10px;
        font-weight: bold;
        color: #FFF;
        text-transform: uppercase;
        text-align: center;
        line-height: 20px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        width: 100px;
        display: block;
        background: #79A70A;
        background: linear-gradient(#B6BAC9 0%, #808080 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px;
        right: -21px;
    }

    .revoked-ribbon span::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 100%;
        z-index: -1;
        border-left: 3px solid #808080;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #808080;
    }

    .revoked-ribbon span::after {
        content: "";
        position: absolute;
        right: 0px;
        top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-right: 3px solid #808080;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #808080;
    }
</style>
