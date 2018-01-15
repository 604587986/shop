<template>
  <div class="order-detail-container">
    <el-row v-for="(row, index) in orderInfo" :key="index" :gutter="0">
      <el-col v-for="col in row" :key="col.key" :span="12">
        <div class="d-header">{{ col.title }}</div>
        <div class="d-content">
          <div v-for="item in col.items" :key="item.key" class="item">
            <span class="item-label" v-html="item.label"></span>
            <span class="item-value">{{ item.value }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="productList" :gutter="0">
      <el-col :span="24">
        <div class="d-header">商品列表</div>
        <el-table :data="productList" :header-cell-style="{textAlign: 'center'}">
          <el-table-column label="商品图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.goods_image" class="goods-image"/>
            </template>
          </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" align="left"/>
          <el-table-column label="商品价格" width="150">
            <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
          </el-table-column>
          <el-table-column prop="num" label="购买数量" width="120"/>
          <el-table-column label="小计" width="120">
            <template slot-scope="scope">{{ scope.row.subtotal | unitPrice('￥') }}</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as API_order from '@/api/order'
  import Foundation from '@/framework/Foundation'
  export default {
    name: 'orderDetail',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,
        /** 订单详情数据 */
        orderDetail: null,
        /** 订单sn */
        sn: this.$route.params.sn,
        /** 基本信息、发票信息、买家信息、商家信息 */
        orderInfo: [],
        /** 产品列表 */
        productList: null
      }
    },
    filters: {
      paymentTypeFilter(val) {
        return val === 'online' ? '在线支付' : '货到付款'
      }
    },
    mounted() {
      this.GET_OrderDetail()
    },
    methods: {
      GET_OrderDetail() {
        this.loading = true
        API_order.getOrderDetail(this.sn).then(response => {
          this.loading = false
          this.orderDetail = response
          this.productList = response.productList
          this.countShowData()
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 组合基本信息、发票信息、买家信息、商家信息 */
      countShowData() {
        const o = this.orderDetail
        const f = Foundation
        this.orderInfo = [
          [
            {
              title: '基本信息',
              key: 'base',
              items: [
                { label: '订单编号', value: o.sn },
                { label: '订单金额', value: '￥' + f.formatPrice(o.need_pay_money) },
                { label: '支付方式', value: o.payment_type_text },
                { label: '订单状态', value: o.ship_status_text },
                { label: '下单时间', value: f.unixToDate(o.order_time) }
              ]
            },
            {
              title: '发票信息',
              key: 'receipt',
              items: [
                { label: '发票类型', value: o.need_receipt ? (o.receipt_type === 'PERSON' ? '个人' : '单位') : '无' },
                { label: '发票抬头', value: o.need_receipt ? o.receipt_title || '无' : '无' },
                { label: '发票内容', value: o.need_receipt ? o.receipt_content || '无' : '无' },
                { label: '发票税号', value: o.need_receipt ? o.duty_invoice || '无' : '无' }
              ]
            }
          ],
          [
            {
              title: '买家信息',
              key: 'buyer',
              items: [
                { label: '收&ensp;货&ensp;人', value: o.ship_name },
                { label: '收货地址', value: o.ship_province + o.ship_city + o.ship_region + o.ship_town + ' ' + o.ship_addr },
                { label: '联系方式', value: o.ship_mobile },
                { label: '买家留言', value: o.remark || '无' }
              ]
            },
            {
              title: '商家信息',
              key: 'seller',
              items: [
                { label: '卖家账号', value: o.seller_name },
                { label: '发货时间', value: f.unixToDate(o.ship_time) },
                { label: '物流公司', value: o.logi_name },
                { label: '快递单号', value: o.ship_no }
              ]
            }
          ]
        ]
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .order-detail-container {
    background-color: #fff;
  }

  .d-header {
    padding: 10px 0 10px 20px;
    font-size: 14px;
    color: #333;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e1e8ed;

    &h2 {
      font-size: 14px;
      font-weight: 400;
    }
  }

  .item {
    width: 100%;
    position: relative;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    padding: 16px 0 16px 20px;
    line-height: 24px;
    white-space: nowrap;

    & .item-label {
      float: left;
      margin-right: 20px;
      font-size: 14px;
      color: #999;
    }
    & .item-value {
      overflow: hidden;
      white-space: normal;
      word-break: break-all;
      font-size: 14px;
      color: #666;
    }
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }
</style>

