<template>
  <div id="member-index">
    <div class="user-title">
      <div class="user-item">
        <div class="user-avatar">
          <img src="http://data.andste.cc/developers/ios/3AF40BFD-BDAA-4DBE-BEB1-842149CAEF4E.gif">
        </div>
        <div class="user-info">
          <p>Andste</p>
          <p>联系方式：13888888888</p>
        </div>
      </div>
      <div class="other-item"></div>
      <div class="other-item"></div>
      <!--<div class="user-item"></div>-->
    </div>
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 148px;
    padding: 15px;
    border: 1px solid #e7e7e7;
    border-bottom: none;
    box-sizing: border-box;
    .user-item {
      display: flex;
      align-items: center;
      width: 375px;
      height: 100%;
      .user-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        margin-left: 10px;
        overflow: hidden;
        border-radius: 100%;
        box-shadow: 0 0 10px #ccc;
        img {
          width: 90px;
          height: 90px;
          border-radius: 100%;
        }
      }
      .user-info {
        margin-left: 15px;
        p {
          color: #777;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    .other-item {
      width: 189px;
      height: 100%;
      border-left: 1px solid #e7e7e7;
    }
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
