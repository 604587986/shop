<template>
  <div id="shop-theme-1" class="container">
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
            <div class="item" @click="collectionShop">
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
    <en-banner :banners="shop.shop_banner"/>
    <div class="shop-tags">
      <div class="tags-container">
        <div class="item hot">
          <div class="item-header">
            <h2>店铺热卖</h2>
            <span>HOT-GOODS</span>
            <nuxt-link to="#" class="more">更多&gt;&gt;</nuxt-link>
          </div>
          <ul>
            <template v-for="(goods, index) in shop.hotGoods">
              <li v-if="index < 10" :key="index" class="goods-item">
                <div class="goods-image">
                  <nuxt-link to="#">
                    <img :src="goods.goods_image" :alt="goods.goods_name" :title="goods.goods_name">
                  </nuxt-link>
                </div>
                <div class="goods-name">
                  <nuxt-link to="#">{{ goods.goods_name }}</nuxt-link>
                </div>
                <div class="goods-price">
                  <span>RMB：<i class="price">￥{{ goods.goods_price | unitPrice }}</i></span>
                  <span>已售：{{ goods.buy_count }}件</span>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './themeMixin'
  export default {
    name: 'shop-theme-1',
    mixins: [mixin],
    mounted() {
    }
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
  .shop-tags {
    background-color: #fff;
    min-height: 500px;
    .tags-container {
      width: 1190px;
      margin: 20px auto;
    }
    .item {
      .item-header {
        position: relative;
        width: 100%;
        height: 34px;
        color: #333;
        font-size: 22px;
        border-bottom: 1px solid #ffac13;
        h2 {
          display: inline-block;
          font-size: 18px;
        }
        span {
          font-size: 14px;
          color: #ccc;
          margin-left: 10px;
        }
        .more {
          position: absolute;
          right: 0;
          color: #ccc;
          font-size: 12px;
          &:hover { color: #ffac13 }
        }
      }
      ul { clear: both }
      overflow: hidden;
    }
    .item.hot {
      $g_width: (1190px - 80px) / 5;
      .goods-item {
        float: left;
        width: $g_width;
        height: 300px;
        margin-top: 20px;
        margin-right: 20px;
        &:nth-child(5n) { margin-right: 0 }
      }
      .goods-image {
        width: $g_width;
        height: $g_width;
      }
      .goods-name {
        min-height: 36px;
        margin-top: 5px;
        a {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .goods-price {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        color: #333;
        .price {
          font-family: georgia;
          color: #f42424;
          font-size: 14px;
        }
      }
    }
  }
</style>
