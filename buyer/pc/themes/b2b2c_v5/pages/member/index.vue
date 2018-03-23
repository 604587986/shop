<template>
  <div id="member-index">
    <div class="user-title">
      <div class="user-item">
        <div class="user-avatar">
          <img src="http://data.andste.cc/developers/ios/3AF40BFD-BDAA-4DBE-BEB1-842149CAEF4E.gif">
        </div>
        <div class="user-info">
          <p>Andste</p>
          <p>联系方式：{{ '13888888888' | secrecyMobile }} </p>
        </div>
      </div>
      <div class="other-item">
        <p>我的订单</p>
        <i class="iconfont ea-icon-my-order"></i>
        <p class="num">20</p>
      </div>
      <div class="other-item">
        <p>收藏的商品</p>
        <i class="iconfont ea-icon-collection-of-goods"></i>
        <p class="num">10</p>
      </div>
      <div class="other-item">
        <p>收藏的店铺</p>
        <i class="iconfont ea-icon-collection-of-shop" style="font-size: 42px"></i>
        <p class="num">15</p>
      </div>
    </div>
    <div class="box-item">
      <div class="item left order">
        <div class="item-title">
          <h2>我的订单</h2>
          <div class="order-status">
            <nuxt-link to="/member/my-order#all">所有订单(2)</nuxt-link>
            <nuxt-link to="/member/my-order#wait-pay">等待付款(2)</nuxt-link>
            <nuxt-link to="/member/my-order#complete">已完成(0)</nuxt-link>
          </div>
        </div>
        <div class="item-content">
          <div class="order-item">
            <nuxt-link :to="'/goods/' + 2" class="goods-image">
              <img src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/8399360E37A949A5BA56381ADA2ADF97.jpg_300x300">
            </nuxt-link>
            <div class="order-info">
              <nuxt-link :to="'/goods/' + 2" class="goods-name">良品铺子酸奶果粒块54g草莓蓝莓干水果酸奶块良品铺子酸奶果粒块54g草莓蓝莓干水果酸奶块休闲零食特产小吃休闲零食特产小吃</nuxt-link>
              <p>下单时间：2018-03-23 17:44:59</p>
              <p>订单金额：<span class="price">￥343.80</span></p>
              <p class="order-status-num"><span>订单状态：未付款</span><span>订单内共有（3）种商品</span></p>
            </div>
            <div class="order-oper">
              <nuxt-link to="/member/order/detail/2">查看订单</nuxt-link>
            </div>
          </div>
          <div class="order-item">
            <nuxt-link :to="'/goods/' + 2" class="goods-image">
              <img src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/8399360E37A949A5BA56381ADA2ADF97.jpg_300x300">
            </nuxt-link>
            <div class="order-info">
              <nuxt-link :to="'/goods/' + 2" class="goods-name">良品铺子酸奶果粒块54g草莓蓝莓干水果酸奶块良品铺子酸奶果粒块54g草莓蓝莓干水果酸奶块休闲零食特产小吃休闲零食特产小吃</nuxt-link>
              <p>下单时间：2018-03-23 17:44:59</p>
              <p>订单金额：<span class="price">￥343.80</span></p>
              <p class="order-status-num"><span>订单状态：未付款</span><span>订单内共有（3）种商品</span></p>
            </div>
            <div class="order-oper">
              <nuxt-link to="/member/order/detail/2">查看订单</nuxt-link>
            </div>
          </div>
          <div class="order-item">
            <nuxt-link :to="'/goods/' + 2" class="goods-image">
              <img src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/8399360E37A949A5BA56381ADA2ADF97.jpg_300x300">
            </nuxt-link>
            <div class="order-info">
              <nuxt-link :to="'/goods/' + 2" class="goods-name">良品铺子酸奶果粒块54g草莓蓝莓干水果酸奶块良品铺子酸奶果粒块54g草莓蓝莓干水果酸奶块休闲零食特产小吃休闲零食特产小吃</nuxt-link>
              <p>下单时间：2018-03-23 17:44:59</p>
              <p>订单金额：<span class="price">￥343.80</span></p>
              <p class="order-status-num"><span>订单状态：未付款</span><span>订单内共有（3）种商品</span></p>
            </div>
            <div class="order-oper">
              <nuxt-link to="/member/order/detail/2">查看订单</nuxt-link>
            </div>
          </div>
        </div>
      </div>
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
          transition: all .2s ease-out;
          &:hover {
            width: 100%;
            height: 100%;
          }
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
      display: flex;
      align-items: center;
      flex-flow: column;
      width: 189px;
      height: 100%;
      border-left: 1px solid #e7e7e7;
      cursor: pointer;
      p {
        color: #666;
        font-size: 15px;
      }
      .iconfont {
        color: #FD92B0;
        font-size: 36px;
        margin: 15px 0;
      }
      .num { font-size: 20px }
    }
  }
  .box-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 400px;
    z-index: 1;
    font-family: "Hiragino Sans GB", "Microsoft Yahei", arial, 宋体, "Helvetica Neue", Helvetica, STHeiTi, sans-serif;;
    .item {
      box-sizing: border-box;
      height: 100%;
      padding: 10px;
      border: 1px solid #e7e7e7;
      transition: all .3s ease-out;
      z-index: 2;
      .item-title {
        display: flex;
        align-content: center;
        justify-content: space-between;
        h2 {
          border-left: 3px solid #fd6760;
          padding-left: 5px;
          font-size: 13px;
        }
      }
      .item-content { margin-top: 10px }
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
  .item.order {
    background-color: #fefbf8;
    .order-status {
      a {
        border-right: 1px solid #e7e7e7;
        padding: 0 15px;
      }
    }
    .order-item {
      display: flex;
      justify-items: center;
      background-color: #fbf8e9;
      margin-top: 10px;
      padding: 12px;
      .goods-image {
        display: block;
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .order-info {
        width: 320px;
        margin-left: 10px;
        .goods-name {
          display: block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #333;
          font-weight: 600;
        }
        .price { color: #f42424 }
      }
      p {
        color: #777;
        font-weight: 400;
      }
      .order-status-num {
        display: flex;
        justify-content: space-between;
      }
      .order-oper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130px;
        a {
          cursor: pointer;
          font: 12px/20px "microsoft yahei";
          height: 20px;
          padding: 4px 12px;
          text-align: center;
          vertical-align: middle;
          color: #777 !important;
          border: 1px solid #dcdcdc;
          background: #f5f5f5;
        }
      }
    }
  }
</style>
