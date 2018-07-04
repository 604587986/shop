<template>
  <div class="shop-header">
    <div class="w">
      <div class="shop-name">{{ shop.shop_name }}</div>
      <div class="shop-header-right">
        <div class="shop-nav">
          <div class="item category">
            <h3>全部分类</h3>
          </div>
          <nuxt-link to="#" class="item">店铺首页</nuxt-link>
          <span>|</span>
          <nuxt-link to="#" class="item">店铺简介</nuxt-link>
          <span>|</span>
          <nuxt-link to="#" class="item">信用评分</nuxt-link>
        </div>
        <div class="shop-more">
          <div class="item">
            <i class="iconfont ea-icon-star"></i>
            <p>收藏</p>
          </div>
          <div class="item">
            <i class="iconfont ea-icon-service"></i>
            <p>客服</p>
          </div>
          <div class="item">
            <i class="iconfont ea-icon-more"></i>
            <p>更多</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop-theme-3',
    props: ['shop']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  img {
    width: 100%;
    height: 100%;
  }
  .shop-header {
    width: 100%;
    height: 100px;
    background-color: #fff;
    .w {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .shop-name {
      font-size: 28px;
      color: #000
    }
    .shop-header-right {
      display: flex;
      align-items: center;
    }
    .shop-nav {
      margin-top: 20px;
      .item {
        display: inline-block;
        font-size: 14px;
        color: #666;
        padding: 0 10px;
        &:not(.category):hover { color: #ff5e5e }
      }
    }
    .shop-more {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .item {
        text-align: center;
        cursor: pointer;
        margin-left: 30px;
        color: #333;
        i {
          background-color: #fff;
          font-size: 26px;
          border-radius: 100%;
          color: #666;
          padding: 2px;
          border: 1px solid #ccc;
        }
        p { margin-top: 3px }
      }
    }
  }
</style>
