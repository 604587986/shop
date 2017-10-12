<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
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
</style>
