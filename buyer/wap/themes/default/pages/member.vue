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
    [class$="-container"] {
      padding-top: 46px + 44px;
      padding-bottom: 20px;
      overflow: hidden;
    }
  }
</style>
