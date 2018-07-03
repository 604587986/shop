<template>
  <div id="order-detail">
    <div v-if="order" class="info-detail">
      <div class="info-order">
        <h2>订单信息</h2>
        <div class="info-list">
          <dl><dt>下单时间：</dt><dd>{{ order.create_time | unixToDate }}</dd></dl>
          <dl><dt>收货地址：</dt><dd>{{order.ship_province}} {{ order.ship_city }} {{ order.ship_county }} {{ order.ship_town }} {{order.ship_address}} - {{ order.ship_addr }}</dd></dl>
          <dl><dt>收货人：</dt><dd>{{ order.ship_name }}</dd></dl>
          <dl><dt>发票信息:</dt><dd>无</dd></dl>
          <dl><dt>送货时间:</dt><dd>{{ order.receive_time }}</dd></dl>
          <dl><dt>客户留言：</dt><dd>{{ order.remark || '无' }}</dd></dl>
          <dl class="top_line"><dt>订单编号：</dt><dd>{{ order.sn }}</dd></dl>
          <dl><dt>付款方式：</dt><dd>{{ order.payment_type === "ONLINE" ? order.payment_method_name : '货到付款' }}</dd></dl>
          <dl><dt>支付状态：</dt><dd>{{ order.pay_status_text }}</dd></dl>
          <dl><dt>商品总价：</dt><dd>￥{{ (order.goods_price || 0) | unitPrice }}</dd></dl>
          <dl class="bottom_line"><dt>运费：</dt><dd>￥{{ (order.shipping_price || 0) | unitPrice }}</dd></dl>
          <dl><dt>优惠金额:</dt><dd>￥{{ (order.discount_price || 0) | unitPrice }}</dd></dl>
          <dl><dt>订单总价：</dt><dd style="font-size: 16px; color: #49afcd">￥{{ (order.need_pay_money || 0) | unitPrice }}</dd></dl>
          <dl><dt>实付金额：</dt><dd style="font-size: 22px; color: #f42424">￥{{ (order.pay_money || 0) | unitPrice }}</dd></dl>
        </div>
      </div>
      <div class="status-order">
        <h2>订单状态：未付款</h2>
        <ul>
          <li v-if="order && order.order_operate_allowable_vo.allow_pay">
            - 如果您尚未对该订单进行支付，请
            <strong><a href="#">按此为订单付款</a></strong>
            以确保商家及时发货。
          </li>
          <li v-if="order && order.order_operate_allowable_vo.allow_cancel">
            - 如果您不想购买此订单的商品，请
            <strong><a href="javascript:;" @click="handleCancelOrder">取消订单</a></strong>
            订单操作。
          </li>
          <li v-if="order && order.order_operate_allowable_vo.allow_rog">
            - 如果您已经收到商品，请
            <strong><a href="javascript:;" @click="handleRogOrder">确认收货</a></strong>
            订单操作。
          </li>
        </ul>
      </div>
    </div>
    <div v-if="skuList" class="goods-list">
      <sku-list :skuList="skuList" name="name" price="purchase_price" total="subtotal"></sku-list>
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
        order_sn: this.$route.query.order_sn,
        order: '',
        skuList: ''
      }
    },
    mounted() {
      this.GET_OrderDetail()
    },
    methods: {
      /** 取消订单 */
      handleCancelOrder() {
        this.$layer.prompt({
          formType: 2,
          title: '请输入取消原因'
        }, (value, index) => {
          const val = value.trim()
          if (!val) {
            this.$message.error('请填写取消原因！')
          } else {
            API_Order.cancelOrder(this.order_sn, val).then(() => {
              this.$message.success('订单取消申请成功！')
              layer.close(index)
              this.GET_OrderDetail()
            })
          }
        })
      },
      /** 确认收货 */
      handleRogOrder() {
        this.$confirm('请确认是否收到货物，否则可能会钱财两空！', () => {
          API_Order.confirmReceipt(this.order_sn).then(() => {
            this.$message.success('确认收货成功！')
            this.GET_OrderDetail()
          })
        })
      },
      /** 获取订单详情 */
      GET_OrderDetail() {
        API_Order.getOrderDetail(this.order_sn).then(response => {
          this.order = response
          this.skuList = JSON.parse(response.items_json)
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
