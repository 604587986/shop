<template>
  <div id="cashier">
    <en-header-other title="收银台"/>
    <div class="cashier-box">
      <div class="cashier-change">
        <h2>{{ this.trade_sn ? '交易号：' : '订单编号：' }}
          <nuxt-link :to="'/member/my-order/detail/' + order_sn" target="_blank">
            <b>{{ trade_sn || order_sn }}</b>
          </nuxt-link>
        </h2>
        <h2>{{ online ? '在线支付' : '货到付款' }}
          <span v-if="order">￥{{ order.need_pay_price | unitPrice }}</span>
          <span v-else>加载中...</span>
          <i>元</i>
        </h2>
        <div class="cashier-order-detail">
          <div class="cashier-order-inside">
            <h3><i></i>送货至：
              <template v-if="order">
                <span>{{ order.ship_province }}</span>
                <span>{{ order.ship_city }}</span>
                <span>{{ order.ship_county }}</span>
                <span>{{ order.ship_town || '' }}</span>
                <span>{{ order.ship_addr }}</span>
                <span>{{ order.ship_mobile }}</span>
              </template>
              <span v-else>加载中...</span>
            </h3>
          </div>
        </div>
        <div v-if="online" class="cashier-tools">
          <div class="cashier-tools-inside">
            <div class="cashier-tools-title">
              <h3>支付平台</h3>
            </div>
            <ul class="cashier-pay-list">
              <li v-for="payment in paymentList" :key="payment.plugin_id" :class="['payment-item', payment.selected && 'selected']">
                <img :src="payment.image" @click="initiatePay(payment)">
              </li>
            </ul>
          </div>
        </div>
        <div v-if="showPayBox" class="cashier-pay-box">
          <div v-if="payment_plugin_id === 'alipayDirectPlugin'" class="pay-item alipay">
            <div class="alipay-left">
              <p>使用电脑支付</p>
              <div class="pc-pay-img">
              </div>
              <a class="pay-btn" :href="payUrl">立即支付</a>
              <i class="icon-or"></i>
            </div>
            <div class="alipay-right">
              <p>使用支付宝钱包扫一扫即可付款</p>
              <div class="pay-qrcode">
                <iframe id="alipay-qrcode" type="text/html" class="alipay-qrcode" src="" frameborder="no"></iframe>
              </div>
            </div>
          </div>
          <div v-if="payment_plugin_id === 'weixinPayPlugin'" class="pay-item wechat">
            <div class="wechat-left">
              <div class="pc-pay-img">
                <img src="../../assets/images/background-wechat.jpg">
              </div>
            </div>
            <div class="wechat-right">
              <p>使用微信扫一扫即可付款</p>
              <div class="pay-erweima">
                <iframe src="" id="wechat-qrcode" class="wechat-qrcode" frameborder="no"></iframe>
              </div>
            </div>
          </div>
        </div>
        <div class="same-pay-way bank-pay paybtn">
          <nuxt-link v-if="!showPayBox" to="#">立即支付</nuxt-link>
          <nuxt-link v-if="!online && showPayBox" :to="'/member/my-order/' + order_sn">查看订单</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'cashier',
    layout: 'full',
    middleware: 'auth-user',
    data() {
      return {
        online: true, // true: 在线支付; false: 货到付款
        trade_sn: this.$route.query.trade_sn,
        order_sn: this.$route.query.order_sn,
        // 支付方式列表
        paymentList: [],
        // 订单详情
        order: '',
        // 显示支付窗口
        showPayBox: false,
        // 发起电脑支付url
        payUrl: 'javascript:;',
        // 支付方式代码
        payment_plugin_id: ''
      }
    },
    mounted() {
      Promise.all([
        this.trade_sn
          ? API_Trade.getCashierData({ trade_sn: this.trade_sn })
          : API_Trade.getCashierData({ order_sn: this.order_sn }),
        API_Trade.getPaymentList()
      ]).then(responses => {
        this.order = responses[0]
        this.paymentList = responses[1].map(item => {
          item.selected = false
          return item
        })
      })
    },
    methods: {
      /** 发起支付 */
      initiatePay(payment) {
        this.showPayBox = true
        this.$set(this, 'paymentList', this.paymentList.map(item => {
          item.selected = item.plugin_id === payment.plugin_id
          return item
        }))
        this.payment_plugin_id = payment.plugin_id
        const trade_type = this.trade_sn ? 'trade' : 'order'
        const sn = this.trade_sn || this.order_sn
        const client_type = 'PC'
        const payment_plugin_id = payment.plugin_id
        const url = API_Trade.initiatePay(trade_type, sn, { client_type, pay_mode: 'normal', payment_plugin_id })
        this.payUrl = url
        // if (payment_plugin_id === 'alipayDirectPlugin') {
        //   document.getElementById('alipay-qrcode').src = url
        // }
      },
      /** 发起电脑支付 */
      iniyiatePayByPc() {}
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
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
        .payment-item {
          float: left;
          line-height: 30px;
          margin: 0 8px 10px 0;
          padding: 5px 5px;
          position: relative;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          img {
            width: 150px;
            height: 35px;
          }
          &.selected {
            border: 2px solid #f56a3e;
            padding: 4px;
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
          background: url(../../assets/images/icons-cashier.png) no-repeat -70px 0;
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
  .cashier-pay-box {
    width: 950px;
    border: 1px solid #e1e1e1;
    background: #f4f4f4;
    margin: 0 0 40px 0;
    padding-top: 3px;
    .pay-item.alipay {
      margin: 0 3px 0 3px;
      background: #fff;
      overflow: hidden;
      height: 335px;
      .alipay-left {
        width: 471px;
        float: left;
        border-right: 1px solid #f4f4f4;
        height: 310px;
        position: relative;
        p {
          width: 450px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          margin: 25px 0 0 0;
          font-size: 16px;
        }
        .pc-pay-img {
          background: url(../../assets/images/icons-cashier.png) no-repeat 0 -1417px;
          height: 92px;
          margin-left: 150px;
          margin-top: 48px;
          width: 165px;
        }
        .pay-btn {
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
        .icon-or {
          display: block;
          background: url(../../assets/images/icons-cashier.png) no-repeat -212px -1417px;
          height: 41px;
          left: 464px;
          position: absolute;
          top: 130px;
          width: 31px;
        }
      }
      .alipay-right {
        width: 272px;
        float: left;
        p {
          width: 472px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          margin: 25px 0 0 0;
          font-size: 16px;
        }
        .pay-qrcode {
          width: 472px;
          height: 255px;
          text-align: center;
          position: relative;
        }
        .alipay-qrcode {
          margin: 20px auto;
          height: 200px;
          width: 200px;
        }
      }
    }
    .pay-item.wechat {
      margin: 0 3px 0 3px;
      background: #fff;
      overflow: hidden;
      height: 335px;
      .wechat-left {
        width: 400px;
        float: left;
        margin: 0 0 0 100px;
      }
      .pc-pay-img {
        width: 400px;
        text-align: center;
        padding: 25px 0;
        z-index: 999;
      }
      .wechat-right {
        width: 400px;
        float: left;
        p {
          width: 340px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          margin: 25px 0 0 0;
          font-size: 16px;
        }
        .pay-erweima {
          width: 350px;
          height: 255px;
          text-align: center;
        }
        .wechat-qrcode {
          width: 200px;
          height: 200px;
          margin: 0 auto;
        }
      }
    }
  }
</style>
