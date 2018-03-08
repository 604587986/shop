<template>
  <div>
    <div class="container">
      <h1>cart</h1>
    </div>
    <tab-bar selected="cart"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TabBar } from '@/components'

  export default {
    name: 'Cart',
    components: {
      TabBar
    },
    computed: {
      ...mapGetters(['cartNum'])
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    margin-bottom: 50px;
  }
</style>
