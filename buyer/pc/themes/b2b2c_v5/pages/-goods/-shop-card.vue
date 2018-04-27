<template>
  <div id="shop-card" class="shop-card">
    <nuxt-link :to="'/shop?shop_id=' + goods.shop_id" class="shop-title">{{ goods.shop_name }}</nuxt-link>
    <img :src="goods.shop_logo" :alt="goods.shop_name" class="shop-logo">
    <div class="shop-rate">
      <div class="rate-item">
        <h5>描述</h5>
        <span>{{ 4.5 }}分</span>
      </div>
      <div class="rate-item">
        <h5>服务</h5>
        <span>{{ 4.5 }}分</span>
      </div>
      <div class="rate-item">
        <h5>发货</h5>
        <span>{{ 4.5 }}分</span>
      </div>
    </div>
    <div class="shop-btns">
      <nuxt-link :to="'/shop?shop_id=' + goods.shop_id" class="shop-btn into">进入商家店铺</nuxt-link>
      <a href="javascript:;" class="shop-btn collection">收藏店铺(3)</a>
    </div>
    <div class="shop-contact">
      <h5>店铺名称：<span>{{ goods.shop_name }}</span></h5>
      <h5>所&ensp;在&ensp;地：<span title="河北-廊坊市-三河市-燕郊镇">河北-廊坊市-三河市-燕郊镇</span></h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shop-card",
    props: ['goods']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .shop-card {
    width: 210px;
    height: 400px;
    box-shadow: 0 0 10px 0 #cccccc;
    .shop-title {
      display: block;
      height: 30px;
      line-height: 30px;
      background-color: #f5f5f5;
      padding-left: 10px;
      color: #333;
    }
    .shop-logo {
      width: 190px;
      height: 50px;
      margin-left: 10px;
    }
    .shop-rate {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      .rate-item {
        width: (210px - 20px) / 3;
        text-align: center;
      }
      h5 {
        color: #777;
        height: 16px;
        line-height: 16px;
      }
      span {
        color: #da542e;
        height: 16px;
        line-height: 16px;
        font-weight: normal;
      }
    }
    .shop-btns {
      border-bottom: 1px solid #e6e6e6;
      font-size: 0;
      margin-top: 10px;
      padding-bottom: 12px;
      text-align: center;
      overflow: hidden;
      .shop-btn {
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        color: #333;
        display: inline-block;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        padding: 3px 10px;
        text-align: center;
        vertical-align: top;
        font-weight: normal;
      }
      .into {
        background-color: #333;
        border-color: #333;
        color: #fff;
        margin-right: 10px;
      }
    }
    .shop-contact {
      padding: 5px 0;
      h5 {
        color: #666;;
        display: inline-block;
        font-size: 12px;
        letter-spacing: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
        white-space: nowrap;
        width: 200px;
        word-spacing: normal;
        font-weight: normal;
        margin: 5px;
      }
      span {
        color: #333;
      }
    }
  }
</style>
