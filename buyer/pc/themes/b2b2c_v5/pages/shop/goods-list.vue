<template>
  <div id="shop-goods-list">
    <template v-if="shop">
      <theme1-header v-if="shop.shop_theme === 1" :shop="shop"/>
      <theme2-header v-if="shop.shop_theme === 2" :shop="shop"/>
      <theme3-header v-if="shop.shop_theme === 3" :shop="shop"/>
    </template>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  const theme1Header = () => import('@/pages/-shop-theme/-theme1-header')
  const theme2Header = () => import('@/pages/-shop-theme/-theme2-header')
  const theme3Header = () => import('@/pages/-shop-theme/-theme3-header')
  export default {
    name: 'shop-goods-list',
    validate({ query }) {
      return /^\d+$/.test(query.shop_id)
    },
    asyncData({ query }, callback) {
      API_Shop.getShopData(query.shop_id).then(response => {
        callback(null, { shop: response })
      }).catch(e => {
        callback({ statusCode: e.response.status })
      })
    },
    components: { theme1Header, theme2Header, theme3Header },
    data() {
      return {
        shop: ''
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
