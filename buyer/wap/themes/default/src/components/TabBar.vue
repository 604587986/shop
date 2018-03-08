<template>
  <tabbar style="position: fixed">
    <tabbar-item :selected="selected === 'home'" :link="{ path: '/index', replace: true }">
      <img slot="icon" src="../assets/icon-home.png">
      <img slot="icon-active" src="../assets/icon-home_active.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item :selected="selected === 'classify'" :link="{ path: '/classify', replace: true }">
      <img slot="icon" src="../assets/icon-classify.png">
      <img slot="icon-active" src="../assets/icon-classify_active.png">
      <span slot="label">分类</span>
    </tabbar-item>
    <tabbar-item :selected="selected === 'cart'" :link="{ path: '/cart', replace: true }" :badge="cartBadge">
      <img slot="icon" src="../assets/icon-cart.png">
      <img slot="icon-active" src="../assets/icon-cart_active.png">
      <span slot="label">购物车</span>
    </tabbar-item>
    <tabbar-item :selected="selected === 'mine'" :link="{ path: '/mine', replace: true }">
      <img slot="icon" src="../assets/icon-people.png">
      <img slot="icon-active" src="../assets/icon-people_active.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'

  export default {
    name: 'TabBar',
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    props: {
      /** 选中tab名称 */
      selected: {
        type: String,
        default: 'home'
      }
    },
    computed: {
      ...mapGetters(['cartBadge'])
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/.weui-tabbar {
    background-color: #fff;
  }
  /deep/ .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #f23030;
  }
  /deep/ .weui-tabbar__label {
    line-height: 1.5;
  }
  /deep/ .weui-tabbar__icon {
    width: 22px;
    height: 22px;
  }
</style>
