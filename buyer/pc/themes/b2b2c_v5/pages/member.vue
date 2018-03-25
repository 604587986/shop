<template>
  <div id="member">
    <en-header/>
    <en-nav/>
    <div class="member-layout w">
      <en-menu/>
      <nuxt-child style="width: calc(1190px - 220px); margin-bottom: 20px"/>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Nav from './member/__nav'
  import Menu from './member/__menu'
  export default {
    name: 'member',
    components: {
      'en-nav': Nav,
      'en-menu': Menu
    },
    created() {
      let status = this.$route.hash ? this.$route.hash.replace(/^#/, '') : 'all'
      if (!this.$route.hash) this.getOrderData({ page_no: 1, page_size: 10, status })
      this.getGoodsCollectionData()
      this.getShopCollectionData()
    },
    methods: {
      ...mapActions({
        /** 获取订单列表 */
        getOrderData: 'order/getOrderDataAction',
        /** 获取商品收藏列表 */
        getGoodsCollectionData: 'collection/getGoodsCollectionDataAction',
        /** 获取店铺收藏列表 */
        getShopCollectionData: 'collection/getShopCollectionDataAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .member-layout {
    display: flex;
    justify-content: space-between;
  }
</style>
