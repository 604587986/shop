<template>
  <div>
    <div class="shop-header">
      <div class="w">
        <div class="shop-name">{{ shop.shop_name }}</div>
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
    <div class="shop-nav">
      <div class="w">
        <div class="shop-category">
          <h1>全部分类</h1>
        </div>
        <a href="#" class="item">店铺首页</a>
        <span>|</span>
        <a href="#shop-intro" class="item">店铺简介</a>
        <span>|</span>
        <a href="#shop-info" class="item">店铺评价</a>
        <template v-for="nav in navs">
          <span :key="'span-' + nav.id">|</span>
          <a :href="nav.nav_url" class="item" :key="nav.id" :target="nav.target ? '_blank' : '_self'">{{ nav.name }}</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './themeHeaderMixin'
  export default {
    name: 'shop-theme-2-header',
    props: ['shop'],
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .shop-header {
    width: 100%;
    height: 120px;
    background: url(~/assets/images/background-brown-paper.jpg) repeat-x left top;
    .w {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .shop-name {
      padding: 0 0 0 320px;
      height: 120px;
      line-height: 125px;
      font-size: 30px;
      color: #fff;
      background: url(~/assets/images/icon-welcome.png) no-repeat left center;
    }
    .shop-more {
      display: flex;
      margin-top: 28px;
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
          padding: 3px;
        }
        p { margin-top: 3px }
      }
    }
  }
  .shop-nav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    background-color: #333;
    color: #fff;
    h1 { font-size: 14px }
    span { color: #dddbdb }
    .shop-category {
      display: inline-block;
    }
    .item {
      font-size: 12px;
      font-weight: 600;
      padding: 0 15px;
      color: #dddbdb
    }
  }
</style>
