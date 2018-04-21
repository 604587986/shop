<template>
  <div id="order-detail">
    <div v-if="order" class="info-detail">
      <div class="info-order">
        <h2>订单信息</h2>
        <div class="info-list">
          <dl><dt>下单时间：</dt><dd>{{ order.create_time | unixToDate }}</dd></dl>
          <dl><dt>收货地址：</dt><dd>{{order.ship_province}} {{ order.ship_city }} {{ order.ship_region }} {{ order.ship_town }} {{order.ship_address}}</dd></dl>
          <dl><dt>收货人：</dt><dd>{{ order.ship_name }}</dd></dl>
          <dl><dt>发票信息:</dt><dd>无</dd></dl>
          <dl><dt>送货时间:</dt><dd>任意时间</dd></dl>
          <dl><dt>客户留言：</dt><dd>无</dd></dl>
          <dl class="top_line"><dt>订单编号：</dt><dd>{{ order.order_sn }}</dd></dl>
          <dl><dt>付款方式：</dt><dd>{{ order.payment_text }}</dd></dl>
          <dl><dt>商品总价：</dt><dd>{{ order.order_amount | unitPrice('￥') }}</dd></dl>
          <dl class="bottom_line"><dt>运费：</dt><dd>￥0.00</dd></dl>
          <dl><dt>优惠金额:</dt><dd>￥0.00</dd></dl>
          <dl><dt>订单总价：</dt><dd style="font-size: 16px; color: #49afcd">{{ order.order_amount | unitPrice('￥') }}</dd></dl>
          <dl><dt>实付金额：</dt><dd style="font-size: 22px; color: #f42424">{{ order.order_amount | unitPrice('￥') }}</dd></dl>
        </div>
      </div>
      <div class="status-order">
        <h2>订单状态：未付款</h2>
        <ul>
          <li>1. 您尚未对该订单进行支付，请
            <strong>
              <a target="_blank" href="/javashop/order_pay_desk.html?ordersn=20180412000001" class="green_btn">按此为订单付款</a>
            </strong>
            以确保商家及时发货。
          </li>
          <li>2. 如果您不想购买此订单的商品，请
            <strong>
              <a href="javascript:;" class="cancelBtn order_delno" sn="20180412000001">取消订单</a>
            </strong>
            订单操作。
          </li>
          <li>3. 如果您已经收到商品，请
            <a href="javascript:;" class="cancelBtn order_delno" sn="20180412000001">确认收货</a>
            订单操作。
          </li>
        </ul>
      </div>
    </div>
    <div v-if="order" class="goods-list">
      <sku-list :skuList="order.skuList"></sku-list>
    </div>
  </div>
</template>

<script>
  import * as API_Order from '@/api/order'
  import SkuList from '../-skuList'
  export default {
    name: 'order-detail',
    validate({ query }) {
      return !!query.order_sn
    },
    components: {
      SkuList
    },
    data() {
      return {
        order: '',
        order_sn: this.$route.query.order_sn
      }
    },
    mounted() {
      this.GET_OrderDetail()
    },
    methods: {
      GET_OrderDetail() {
        API_Order.getOrderDetail(this.order_sn).then(response => {
          this.order = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .info-detail {
    display: flex;
    border: 1px solid #d8d8d8;
    position: relative;
    z-index: 2;
  }
  .info-order {
    background-color: #fbfbfb;
    border-right: 1px solid #d8d8d8;
    width: 398px;
    h2 {
      background-color: #f3f3f3;
      border-bottom: 1px solid #d8d8d8;
      font-size: 12px;
      font-weight: 600;
      height: 20px;
      line-height: 20px;
      padding: 9px;
    }
  }
  .info-list {
    display: block;
    padding: 17px 17px 7px;
    width: auto;
    min-height: 300px;

    dl {
      margin-bottom: 10px;
      display: inline-block;
      font-size: 12px;
      letter-spacing: normal;
      line-height: 20px;
      vertical-align: top;
      word-spacing: normal;
      width: 100%;
      &.top_line {
        border-top: 1px dotted #d8d8d8;
        padding-top: 10px;
      }
      &.bottom_line {
        border-bottom: 1px dotted #d8d8d8;
        padding-bottom: 10px;
      }
    }
    dt {
      color: #888;
      width: 23%;
      float: left;
      display: inline;
    }
    dd {
      color: #666;
      width: 77%;
      float: left;
      display: inline;
    }
  }
  .status-order {
    width: 970px - 400px;
    background-color: #fff;
    font-size: 12px;
    letter-spacing: normal;
    padding: 20px 30px;
    vertical-align: top;
    word-spacing: normal;
    h2 {
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px dotted #e7e7e7;
      margin-bottom: 20px;
    }
    li {
      margin-bottom: 10px;
    }
  }
  .goods-list {
    margin-top: 30px;
  }
</style>
