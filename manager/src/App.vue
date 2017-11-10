<template>
  <div id="app">
    <layout v-if="isLogin"></layout>
    <login v-else></login>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Layout from './components/layout/Layout'
  import Login from './components/login/Login'

  export default {
    name: 'app',
    data() {
      return {}
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    /* watch: {
      loginStatus() {
        this.isLogin = this.$store.getters.isLogin
      }
    }, */
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

  [class^="el-icon-eation"], [class*=" el-icon-eation"] {
    font-family: "iconfont" !important;
    font-size: inherit;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
