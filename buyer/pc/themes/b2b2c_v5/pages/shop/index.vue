<template>
  <div id="shop-list">
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  export default {
    name: 'shopList',
    data() {
      return {
        // 店铺列表
        shopList: '',
        // 参数
        params: {
          page_no: 1,
          page_size: 10,
          ...this.$route.query
        }
      }
    },
    mounted() {
      this.GET_ShopList()
    },
    methods: {
      GET_ShopList() {
        API_Shop.getShopList(this.params).then(response => {
          this.shopList = response
        })
      }
    }
  }
</script>
