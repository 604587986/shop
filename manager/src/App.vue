<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Layout from './components/layout/Layout'

  export default {
    name: 'app',
    components: {
      Layout
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
