<template>
  <div id="app">
    <layout v-if="isLogin"></layout>
    <login v-else></login>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Layout from './components/layout/Layout'
  import Login from './components/login/Login'

  export default {
    name: 'app',
    created() {
      window.localStorage.getItem('isLogin') === 'true' && this.loginSuccess()
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapActions(['loginSuccess'])
    },
    components: {
      Layout,
      Login
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import "./styles/_color.scss";

  body {
    background: $body_background;
  }

  [class^="el-icon-enation"], [class*=" el-icon-enation"] {
    font-family: "iconfont" !important;
    font-size: inherit;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
