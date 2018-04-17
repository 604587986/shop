<template>
  <div class="container">
    <div class="help-header">
      <h1>{{ $route.params.id }}</h1>
      <h2>2018-04-25 08:50</h2>
    </div>
    <div class="help-body"></div>
  </div>
</template>

<script>
  export default {
    name: 'help-detail'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .help-header {
    text-align: center;
    h1 {
      color: #3d3f3e;
      font: 600 16px/32px "microsoft yahei";
    }
    h2 {
      border-bottom: 1px solid #d2d2d2;
      color: #9a9a9a;
      font-weight: normal;
      font: 12px/20px Arial, Verdana, "宋体", "Lucida Grande", "Lucida Sans Unicode", Helvetica, sans-serif;
      padding: 5px 0 20px;
    }
  }
  .help-body {

  }
</style>
