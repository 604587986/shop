<template>
  <div id="app">
    <en-shortcut/>
    <en-header/>
    <nuxt id="wrapper"/>
    <en-footer/>
  </div>
</template>
<script>
  export default {
    name: 'defalt'
  }
</script>
<style>
  #wrapper {
    min-height: calc(100vh - 31px - 219px)
  }
</style>
