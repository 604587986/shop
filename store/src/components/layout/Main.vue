<template>
    <div class="main-container">
      <div class="inner-main-container">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'LayoutMain'
    }
</script>

<style type="text/scss" lang="scss" scoped>
  .main-container {
    position: fixed;
    top: 56px;
    left: 200px;
    overflow: scroll;
    width: calc(100% - 200px);
    height: calc(100% - 56px);
    .inner-main-container {
      margin: 10px;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
    }
  }
</style>
