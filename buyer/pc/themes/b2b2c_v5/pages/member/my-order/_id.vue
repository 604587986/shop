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

      </div>
    </div>
    <div v-if="order" class="goods-list">
      <el-table :data="order.skuList" style="width: 100%">
        <el-table-column label="商品名称" class-name="goods-name-img">
          <template slot-scope="scope">
            <nuxt-link :to="'/goods/' + scope.row.goods_id" target="_blank">
              <img :src="scope.row.goods_image">
            </nuxt-link>
            <nuxt-link :to="'/goods/' + scope.row.goods_id" target="_blank" class="goods-name">{{ scope.row.goods_name }}</nuxt-link>
          </template>
        </el-table-column>
        <el-table-column label="商品单价" width="120">
          <template slot-scope="scope">{{ scope.row.goods_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column label="数量" width="90">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column label="商品小计" width="120">
          <template slot-scope="scope">{{ scope.row.goods_total | unitPrice('￥') }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import * as API_Order from '@/api/order'
  export default {
    name: 'order-detail',
    data() {
      return {
        order: '',
        order_sn: this.$route.params.id
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
    background-color: #fff;
    font-size: 12px;
    letter-spacing: normal;
    padding: 20px 30px;
    vertical-align: top;
    word-spacing: normal;
  }
  .goods-list {
    margin-top: 30px;
    /deep/ .el-table {
      border: 1px solid #ebeef5;
      border-bottom: none;
      font-size: 12px;
    }
    /deep/ .el-table__header .cell { text-align: center }
    /deep/ .el-table__body .cell { text-align: center }
    /deep/ .el-table__body .goods-name-img .cell {
      display: flex;
      align-items: center;
      text-align: left;
      .goods-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
</style>
