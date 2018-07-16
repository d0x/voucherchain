<template>
  <hellometamask/>
</template>

<script>
import HelloMetamask from '@/components/HelloMetamask'

export default {
  name: 'd-app',
  components: {
    'hellometamask': HelloMetamask
  },
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  }
}
</script>

<style scoped>

</style>
