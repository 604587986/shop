<template>
  <div id="cashier">
    <div class="index-cashier w">
      <div class="welcome">
        <a target="_blank" href="/">
          <img src="~/assets/images/logo-javashop.png" alt="logo">
        </a>
        <span>收银台</span>
      </div>
    </div>
    <div class="cashier-box">
      <div class="cashier-change">
        <h2>交易号：
          <nuxt-link :to="'/member/my-order/' + order_sn" target="_blank">
            <b>{{ order_sn }}</b>
          </nuxt-link>
        </h2>
        <h2>{{ online ? '在线支付' : '货到付款' }}：<span>￥4,498.00</span><i>元</i></h2>
        <div class="cashier-order-detail">
          <div class="cashier-order-inside">
            <h3><i></i>送货至：<span></span><span>山西省</span><span>太原市</span><span>阳曲县<span><span><span>12312313</span><span>13333333333</span></span></span></span></h3>
          </div>
        </div>
        <div v-if="online" class="cashier-tools">
          <div class="cashier-tools-inside">
            <div class="cashier-tools-title">
              <h3>支付平台</h3>
            </div>
            <ul class="cashier-pay-list">
              <li class="alipay">
                <img src="~/assets/images/icon-alipay.png">
              </li>
              <li class="wechat">
                <img src="~/assets/images/icon-wechat.png">
              </li>
            </ul>
          </div>
        </div>
        <div class="same-pay-way bank-pay paybtn">
          <nuxt-link v-if="online" to="#">立即支付</nuxt-link>
          <nuxt-link v-else :to="'/member/my-order/' + order_sn">查看订单</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cashier',
    layout: 'full',
    data() {
      return {
        online: true, // true: 在线支付; false: 货到付款
        order_sn: '2333'
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .index-cashier {
    position: relative;
    width: 1000px;
    margin: 20px auto;
    height: 60px;
    .welcome {
      a {
        float: left;
        width: 245px;
        height: 60px;
      }
      img {
        width: 240px;
        height: 60px;
      }
      span {
        font-size: 23px;
        float: left;
        display: block;
        margin: 25px 5px;
      }
    }
  }
  .cashier-box {
    width: 100%;
    background: #f5f5f5;
    padding: 20px 0;
  }
  .cashier-change {
    width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    position: relative;
    box-shadow: 0 2px 5px #ccc;
    background: #fff;
    h2 {
      width: 950px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      font-weight: 200;
      b {
        font-weight: 200;
        font-size: 14px;
        color: #ff6700;
      }
      span {
        font-size: 20px;
        color: #f42424;
        margin: 0 5px 0 0;
      }
    }
    .cashier-order-detail {
      width: 950px;
      border: 1px solid #e1e1e1;
      background: #f4f4f4;
      margin: 20px 0 0 0;
    }
    .cashier-tools {
      width: 950px;
      border: 1px solid #e1e1e1;
      background: #f4f4f4;
      margin: 20px 0 20px 0;
      .cashier-tools-inside {
        margin: 3px;
        background: #fff;
      }
      .cashier-tools-title {
        height: 52px;
        line-height: 52px;
        h3 {
          width: 924px;
          height: 52px;
          line-height: 52px;
          font-weight: 200;
          font-size: 12px;
          background: #fcfcfc;
          padding-left: 20px;
        }
      }
      .cashier-pay-list {
        width: 844px;
        overflow: hidden;
        margin: 0 10px;
        padding: 10px 40px;
        li {
          float: left;
          height: 35px;
          line-height: 30px;
          margin: 0 8px 10px 0;
          padding: 5px 5px;
          position: relative;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          img {
            width: 150px;
            height: 35px
          }
        }
      }
    }
    .cashier-order-inside {
      margin: 3px;
      background: #fff;
      height: 52px;
      overflow: hidden;
      h3 {
        width: 944px;
        height: 52px;
        line-height: 52px;
        font-weight: 200;
        font-size: 12px;
        background: #fcfcfc;
        i {
          width: 21px;
          height: 21px;
          display: block;
          background: url(~/assets/images/icons-cashier.png) no-repeat -70px 0;
          float: left;
          margin: 15px 10px 0 20px;
        }
        span { margin: 0 5px }
      }
    }
    .paybtn {
      a {
        font-family: Microsoft YaHei;
        width: 180px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background: #f42424;
        display: block;
        margin: 30px auto 0 auto;
      }
    }
  }
</style>
