<template>
  <nuxt-child/>
</template>

<script>
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout',
    layout: 'full',
    middleware: 'auth-user',
    mounted() {
      API_Trade.getCarts()
    }
  }
</script>
