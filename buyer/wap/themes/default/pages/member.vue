<template>
  <nuxt-child/>
</template>

<script>
  import Vue from 'vue'
  import Empty from '@/pages/member/-empty'
  Vue.component('empty-member', Empty)
  export default {
    name: 'member',
    middleware: 'auth-user'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ {
    .van-nav-bar, .van-tabs {
      position: fixed;
      z-index: 10 !important;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff;
    }
    .van-tabs {
      top: 46px;
    }
    .van-cell-swipe__wrapper {
      height: 100%;
    }
    .van-cell-swipe__left, .van-cell-swipe__right {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 65px;
      height: 100%;
      background-color: #F56C6C;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }
    .van-cell-swipe__left {
      background-color: #409EFF;
    }
    [class$="-container"] {
      box-sizing: border-box;
      padding-top: 46px + 44px;
      /*padding-bottom: 20px;*/
      overflow: hidden;
    }
    .captcha-img {
      width: 70px;
      height: 24px;
    }
  }
</style>
