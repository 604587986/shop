<template>
  <div id="shop-theme-1">
    <div class="shop-header">
      <div class="w">
        <div class="shop-name">{{ shop.shop_name }}</div>
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
    <div class="shop-nav">
      <div class="w">
        <div class="item category">
          <h1>全部分类</h1>
        </div>
        <nuxt-link to="#" class="item">店铺首页</nuxt-link>
        <span>|</span>
        <nuxt-link to="#" class="item">店铺简介</nuxt-link>
        <span>|</span>
        <nuxt-link to="#" class="item">店铺评价</nuxt-link>
      </div>
    </div>
    <en-banner :banners="shop.shop_banner"/>
    <div class="shop-tags">
      <div class="tags-container">
        <div class="item hot">
          <ul>
            <template v-for="(goods, index) in shop.hotGoods">
              <li v-if="index < 5" :key="goods.goods_id" class="goods-item">
                <div class="w">
                  <div class="goods-info">
                    <h3>店家热卖<span>Hot-Recommend</span></h3>
                    <nuxt-link to="#" class="goods-name">{{ goods.goods_name }}</nuxt-link>
                    <div class="goods-price">
                      <span>RMB：<strong>￥{{ goods.goods_price | unitPrice }}</strong></span>
                      <span>已销售：{{ goods.buy_count }}件</span>
                    </div>
                    <nuxt-link to="#" class="goods-btn">查看详情</nuxt-link>
                  </div>
                  <div class="goods-image">
                    <nuxt-link to="#">
                      <img :src="goods.goods_image" :alt="goods.goods_name" :title="goods.goods_name">
                    </nuxt-link>
                  </div>
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
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>
  img {
    width: 100%;
    height: 100%;
  }
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
    background-color: #818181;
    color: #fff;
    h1 { font-size: 14px }
    span { color: #dddbdb }
    .shop-category {
      display: inline-block;
    }
    .item {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      padding: 0 15px;
      color: #dddbdb
    }
  }
  .shop-tags {
    background-color: #fff;
    overflow: hidden;
    min-height: 300px;
    .item.hot {
      width: 100%;
      li {
        height: 450px;
        background-color: #fff;
        &:nth-child(2n) {
          background-color: #F2F0EC;
          .w { flex-direction: row-reverse }
        }
        .w {
          display: flex;
          width: 980px;
        }
      }
      .goods-info {
        width: 450px;
        height: 450px;
        h3 {
          font: 12px/1.5 tahoma,arial,宋体;
          width: 400px;
          margin: 80px 0 10px 0;
          color: #484848;
          font-size: 28px;
          font-weight: bold;
          height: 60px;
          line-height: 60px;
          span {
            margin-left: 10px;
            color: #ddd;
          }
        }
      }
      .goods-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 450px;
        img {
          width: 300px;
          height: 300px;
        }
      }
      .goods-name {
        line-height: 30px;
        width: 400px;
        font-size: 16px;
        margin-bottom: 30px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .goods-price {
        display: flex;
        justify-content: space-between;
        width: 400px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        strong { color: #f42424 }
      }
      .goods-btn {
        display: block;
        width: 150px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border: 1px solid #b0b0b0;
        transition: all .3s ease;
        margin-top: 10px;
        &:hover {
          background-color: #757575;
          border-color: #757575;
          color: #fff
        }
      }
    }
  }
</style>
