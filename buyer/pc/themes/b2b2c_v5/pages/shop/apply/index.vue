<template>
  <div id="apply-index">
    <div class="entry-container">
      <h1>欢迎来到Javashop多店铺示例商城，商家中心</h1>
      <h3>您现在还没有店铺，无法对商家中心功能进行操作，您可以：</h3>
      <div class="apply-btn">
        <nuxt-link to="./apply">马上开店</nuxt-link>
        <h4>进入马上开店并填写相关信息，即可开设您的店铺。</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'apply-index'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .entry-container {
    width: 1000px;
    height: 300px;
    overflow: hidden;
    margin: 20px auto;
    padding: 10px;
    background: #fff;
    h1 {
      color: #27a9e3;
      cursor: default;
      display: inline-block;
      font: 20px/36px "microsoft yahei";
      height: 36px;
      padding: 0 20px;
    }
    h3 {
      color: #666;
      display: block;
      font: 16px/24px "microsoft yahei";
      height: 28px;
      margin: 1px 0 1px 0px;
      padding: 3px 0 2px 20px;
      font-weight: bold;
    }
    .apply-btn {
      clear: both;
      display: block;
      overflow: hidden;
      padding: 10px;
      margin: 10px 0 30px 10px;
      background-color: #fcf8e3;
      border: 1px solid #fbeed5;
      a {
        font: 16px/20px "Microsoft Yahei";
        text-align: center;
        height: 40px;
        line-height: 40px;
        float: left;
        display: inline;
        background-color: red;
        border: 0 none;
        color: #fff;
        cursor: pointer;
        padding: 0 10px;
      }
      h4 {
        float: left;
        display: inline;
        font-size: 12px;
        color: #999;
        height: 40px;
        line-height: 45px;
        margin-left: 10px;
      }
    }
  }
</style>
