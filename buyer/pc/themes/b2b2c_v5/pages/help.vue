<template>
  <div id="help">
    <en-header-other title="帮助中心"/>
    <div class="help-container w">
      <div class="help-menus">
        <h3 class="h3-title">常见问题分类</h3>
        <dl></dl>
      </div>
      <nuxt-child class="help-content"/>
    </div>
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
    .h3-title {
      color: #fff;
      text-align: center;
      font-size: 18px;
      line-height: 40px;
      height: 40px;
      background-color: #f42424;
      font-weight: normal;
    }
  }
  .help-content {
    width: 980px;
    min-height: 300px;
    margin-left: 10px;
    padding: 20px;
    border: 1px solid #e6e6e6;
  }
</style>
