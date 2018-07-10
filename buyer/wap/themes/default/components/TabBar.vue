<template>
  <van-tabbar v-model="activeIndex">
    <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item icon="chat" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart" info="99+">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: 'TabBar',
    props: ['active'],
    data() {
      return {
        activeIndex: this.active || 0
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
