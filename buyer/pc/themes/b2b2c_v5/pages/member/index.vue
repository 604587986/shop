<template>
  <div id="member-index">
    <div class="user-title"></div>
    <div class="box-item">
      <div class="item left"></div>
      <div class="item right"></div>
    </div>
    <div class="box-item">
      <div class="item left"></div>
      <div class="item right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .user-title {
    width: 100%;
    height: 118px;
    padding: 15px;
    border: 1px solid #e7e7e7;
    border-bottom: none;
    box-sizing: border-box;
  }
  .box-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 400px;
    z-index: 1;
    .item {
      box-sizing: border-box;
      height: 100%;
      padding: 10px;
      border: 1px solid #e7e7e7;
      transition: all .3s ease-out;
      z-index: 2;
      &.left { width: 590px }
      &.right { width: 970px - 590px; border-left: none }
      &:hover {
        border-color: rgba(244, 36, 36, 0.5);
        box-shadow: 0 0 10px 0 #f42424;
        z-index: 10;
      }
    }
  }
  .box-item:last-child .item {
    border-top: none;
  }
</style>
