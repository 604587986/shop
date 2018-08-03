<template>
  <div id="member">
    <en-breadcrumb/>
    <div class="member-layout w">
      <en-menu/>
      <nuxt-child style="width: calc(1210px - 220px); margin-bottom: 20px"/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Breadcrumb from '@/pages/member/-breadcrumb'
  import Menu from '@/pages/member/-menu'
  import Empty from '@/pages/member/-empty'
  Vue.component('empty-member', Empty)
  export default {
    name: 'member',
    middleware: 'auth-user',
    components: {
      'en-breadcrumb': Breadcrumb,
      'en-menu': Menu
    },
    mounted() {
      if (!this.$store.getters.user) this.$store.dispatch('user/getUserDataAction')
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
  .member-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
  }
</style>
