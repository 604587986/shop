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
  const theme1 = () => import('./theme1').then(m => m.default || m)
  const theme2 = () => import('./theme2').then(m => m.default || m)
  const theme3 = () => import('./theme3').then(m => m.default || m)
  import * as API_Shop from '@/api/shop'
  export default {
    name: 'shop-index',
    components: { theme1, theme2, theme3 },
    data() {
      return {
        shop_id: this.$route.params.id,
        shopData: ''
      }
    },
    mounted() {
      this.GET_ShopData()
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
