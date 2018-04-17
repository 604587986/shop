<template>
  <div id="shop-theme-2">
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
        <h1>全部分类</h1>
      </div>
    </div>
    <en-banner :banners="shop.shop_banner"/>
    <div class="shop-tags">
      <div class="tags-container">
        <div class="item hot">
          <ul>
            <li class="tag-title">
              <h2>本季の热卖</h2>
              <span>HOT-GOODS</span>
              <nuxt-link to="#" title="查看更多"></nuxt-link>
            </li>
            <template v-for="(goods, index) in shop.hotGoods">
              <li v-if="index < 7" :key="goods.goods_id" class="goods-item">
                <nuxt-link to="#"><img :src="goods.goods_image"></nuxt-link>
                <div class="goods-info">
                  <div class="goods-name"><nuxt-link to="#">{{ goods.goods_name }}</nuxt-link></div>
                  <div class="goods-price">
                    <span>RMB：</span>
                    <span class="price">{{ goods.goods_price | unitPrice('￥') }}</span>
                    <span class="buy-count">已售：{{ goods.buy_count }}件</span>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="item new">
          <div class="tag-title">
            <h2>店铺の新品</h2>
            <span>SHOP-NEW</span>
            <nuxt-link to="#" title="查看更多"></nuxt-link>
          </div>
          <ul>
            <template v-for="(goods, index) in shop.newGoods">
              <li v-if="index < 8" :key="goods.goods_id" class="goods-item">
                <div class="new-img">
                  <a href="/javashop/goods-30.html">
                    <img :src="goods.goods_image" :alt="goods.goods_name" :title="goods.goods_name">
                  </a>
                </div>
                <div class="new-intro">
                  <h2><a href="/javashop/goods-30.html">{{ goods.goods_name }}</a></h2>
                  <p>
                    <span>RMB：<i>{{ goods.goods_price | unitPrice('￥') }}</i></span>
                    <span class="hot-sale">已销售：0件</span>
                  </p>
                </div>
                <div class="new-background"></div>
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
    name: 'shop-theme-2',
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
  }
  .shop-tags {
    padding: 30px 0;
    background-color: #E2DDCA;
  }
  .tags-container {
    $c_width: 1000px;
    $t_width: 639px;
    $t_height: 90px;
    width: $c_width;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px 2px #ccc;
    overflow: hidden;
    .item {
      position: relative;
      padding: 20px;
      overflow: hidden;
    }
    .tag-title {
      display: flex;
      align-items: center;
      position: relative;
      width: $t_width;
      height: $t_height;
      margin-bottom: 10px;
      background: url(~/assets/images/background-brown-paper-little.jpg) repeat left top;
      h2 {
        margin-left: 20px;
        font-size: 22px;
        color: #897459;
        font-weight: bold;
        font-family: 微软雅黑;
      }
      span {
        margin-left: 5px;
        color: #fff;
        font-size: 12px;
        font-weight: 200;
      }
      a {
        display: block;
        position: absolute;
        right: 10px;
        top: 50%;
        width: 20px;
        height: 20px;
        background: url(~/assets/images/icon-shop-more.png);
        background-size: 100%;
      }
    }
    .item.hot {
      $r_width: $c_width - 40px - $t_width - 10px;
      $m_width: ($t_width - 10px) / 2;
      $b_width: ($t_width - 20px) / 3;
      $c_height: $r_width * 2 + 10px;
      height: $c_height;
      ul { position: relative }
      .goods-item {
        position: absolute;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        &:nth-child(2), &:nth-child(3) {
          top: 0;
          right: 0;
          width: $r_width;
          height: $r_width;
        }
        &:nth-child(3) { top: $r_width + 10px }
        &:nth-child(4), &:nth-child(5) {
          width: $m_width;
          height: $m_width;
        }
        &:nth-child(4) { margin-left: 0 }
        &:nth-child(5) { margin-left: $m_width + 10px }
        &:nth-child(6), &:nth-child(7), &:nth-child(8) {
          top: $t_height + 10px + $m_width + 10px;
          width: $b_width;
          height: $b_width;
          .goods-info {
            height: 85px;
            transform: translateY(85px);
          }
          .buy-count {
            position: relative;
            display: block;
            padding: 0 10px;
          }
        }
        &:nth-child(7) { margin-left: $b_width + 10px }
        &:nth-child(8) { margin-left: $b_width * 2 + 20px }
      }
      .goods-item:hover .goods-info {
        transform: translateY(0);
      }
      .goods-info {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 70px;
        background-color: rgba(0,0,0,.6);
        transform: translateY(70px);
        transition: all .3s ease;
      }
      .goods-name {
        padding: 3px 10px;
        a {
          font-size: 14px;
          color: #fff;
          font-weight: 200;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .goods-price {
        position: relative;
        padding: 3px 10px;
        color: #fff;
        .price {
          font-size: 18px;
          color: #ffff33;
          font-weight: 200;
        }
        .buy-count {
          position: absolute;
          right: 10px;
          font-size: 12px;
        }
      }
    }
    .item.new {
      .tag-title {
        display: flex;
        align-items: center;
        width: 100%;
        height: 90px;
        background: #efebdf;
        margin-bottom: 10px;
        h2 {
          margin-left: 20px;
          font-size: 22px;
          color: #897459;
          font-weight: bold;
          font-family: 微软雅黑;
        }
        span {
          color: #60776d;
          font-weight: 200;
          margin-left: 5px;
          font-size: 12px;
        }
      }
      .goods-item {
        border: 1px solid #ececec;
        float: left;
        margin-bottom: 10px;
        margin-right: 10px;
        overflow: hidden;
        padding: 5px;
        position: relative;
        width: 220px;
        &:nth-child(4n) { margin-right: 0 }
        img {
          width: 220px;
          height: 220px;
        }
        h2 {
          width: 220px;
          height: 40px;
          line-height: 20px;
          margin-top: 10px;
          border-bottom: 1px dashed #f1f1f1;
          a {
            font-size: 12px;
            color: #868686;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        p {
          width: 220px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          color: #868686;
          i {
            font-size: 16px;
            color: #ff001e;
            font-weight: 200;
          }
        }
        .hot-sale {
          float: right;
          margin-top: 2px;
        }
      }
    }
  }
</style>
