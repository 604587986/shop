<template>
  <div id="shop-index">
    <template v-if="shopData">
      <theme1 v-if="shopData.shop_theme === 1" :shop="shopData"/>
      <theme2 v-if="shopData.shop_theme === 2" :shop="shopData"/>
      <theme3 v-if="shopData.shop_theme === 3" :shop="shopData"/>
    </template>
  </div>
</template>

<script>
  const theme1 = () => import('@/pages/-shop-theme/-theme1').then(m => m.default || m)
  const theme2 = () => import('@/pages/-shop-theme/-theme2').then(m => m.default || m)
  const theme3 = () => import('@/pages/-shop-theme/-theme3').then(m => m.default || m)
  import * as API_Shop from '@/api/shop'
  export default {
    name: 'shop-index',
    validate({ query }) {
      return /^\d+$/.test(query.shop_id)
    },
    asyncData({ query }, callback) {
      API_Shop.getShopData(query.shop_id).then(response => {
        callback(null, { shopData: response })
      }).catch(e => {
        callback({ statusCode: e.response.status })
      })
    },
    components: { theme1, theme2, theme3 },
    data() {
      return {
        shop_id: this.$route.query.shop_id,
        shopData: ''
      }
    },
    methods: {
      GET_ShopData() {
        API_Shop.getShopData(this.shop_id).then(response => {
          this.shopData = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
