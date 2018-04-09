<template>
  <div id="member">
    <en-breadcrumb/>
    <div class="member-layout w">
      <en-menu/>
      <nuxt-child style="width: calc(1190px - 220px); margin-bottom: 20px"/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Alert, Checkbox, DatePicker, Form, FormItem, Input, Pagination, Radio, Table, TableColumn } from 'element-ui'
  Vue.use(Alert)
  Vue.use(Checkbox)
  Vue.use(DatePicker)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Pagination)
  Vue.use(Radio)
  Vue.use(Table)
  Vue.use(TableColumn)
  import { mapActions, mapGetters } from 'vuex'
  import Breadcrumb from './member/__breadcrumb'
  import Menu from './member/__menu'
  export default {
    name: 'member',
    components: {
      'en-breadcrumb': Breadcrumb,
      'en-menu': Menu
    },
    created() {
      if (!this.user) this.getUserData()
      if (!this.orderData) this.getOrderData()
      if (!this.goodsCollectionData) this.getGoodsCollectionData()
      if (!this.shopCollectionData) this.getShopCollectionData()
    },
    computed: {
      ...mapGetters({
        user: 'user/user',
        orderData: 'order/orderData',
        goodsCollectionData: 'collection/goodsCollectionData',
        shopCollectionData: 'collection/shopCollectionData'
      })
    },
    methods: {
      ...mapActions({
        /** 获取用户信息 */
        getUserData: 'user/getUserDataAction',
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

<style type="text/scss" lang="scss">
  .member-layout {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .member-nav {
    position: relative;
    width: 100%;
    height: 38px;
    background-color: #fff;
    z-index: 1;
  }
  .member-nav-list {
    display: flex;
    align-items: center;
    height: 36px;
    background-color: #fff;
    border-bottom: 1px solid #e7e7e7;
    li {
      background-color: #f7f7f7;
      border-right: 1px solid #e7e7e7;
      border-top: 1px solid #e7e7e7;
      line-height: 35px;
      padding: 0 20px;
      color: #666;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: background-color .3s ease-out;
      &:first-child {
        border-left: 1px solid #e7e7e7;
      }
      &.active {
        background-color: #fff;
        color: #f42424;
        border-bottom: 1px solid #fff;
      }
      &:not(.active):hover {
        background-color: #e7e7e7;
        color: #000;
      }
    }
  }
</style>
