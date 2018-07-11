<template>
  <div id="app">
    <nuxt id="wrapper"/>
  </div>
</template>
<script>
  export default {
    name: 'full'
  }
</script>
<style>
  #wrapper {
    min-height: calc(100vh - 31px - 219px)
  }
</style>
