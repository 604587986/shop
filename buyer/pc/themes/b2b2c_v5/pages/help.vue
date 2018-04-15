<template>
  <div class="help-container w">
    <div class="help-menus">
      menus
    </div>
    <nuxt-child class="help-content"/>
  </div>
</template>

<script>
  export default {
    name: 'help',
    layout: 'full'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .help-container {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .help-menus {
    width: 208px;
  }
  .help-content {
    width: 980px;
    min-height: 300px;
    margin-left: 10px;
    padding: 20px;
    border: 1px solid #e6e6e6;
  }
</style>
