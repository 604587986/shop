<template>
  <div v-loading="loading" class="order-detail-container">
    <!--订单信息-->
    <div class="order-info">
       <div>
         <el-card class="box-card">
           <div slot="header" class="clearfix">
             <span>订单信息</span>
           </div>
           <!--收货信息-->
           <div class="">
             <div  class="text item">
               收货地址: {{}}
             </div>
             <div  class="text item">
               收货人: {{}}
             </div>
             <div  class="text item">
               联系电话:{{}}
             </div>
           </div>
           <hr/>
           <!--订单编号 付款方式 下单时间-->
           <div class="">
             <div  class="text item">
               订单编号: {{}}
             </div>
             <div  class="text item">
               付款方式: {{}}
             </div>
             <div  class="text item">
               下单时间:{{}}
             </div>
           </div>
           <hr/>
           <!--相关费用-->
           <div class="">
             <div  class="text item">
               商品总价: {{}}
             </div>
             <div  class="text item">
               运费: {{}}
             </div>
             <div  class="text item">
               优惠金额:{{}}
             </div>
             <div  class="text item">
               订单总价:{{}}
             </div>
           </div>
         </el-card>
         <!--其他信息（发票、备注）-->
         <el-card class="box-card">
           <div slot="header" class="clearfix">
             <span>其他信息（发票、备注）</span>
           </div>
           <div class="text item">
             订单附言:{{}}
           </div>
           <div class="text item">
             送货时间:{{}}
           </div>
           <div class="text item">
             发票抬头:{{}}
           </div>
           <div class="text item">
             发票内容:{{}}
           </div>
         </el-card>
       </div>
      <!--订单状态-->
       <div class="order-status-info">
         <div>
           <i style="color: #5cb85c;" icon="el-icon-check"></i>订单状态:{{}}
         </div>
         <div class="text item">
           1、订单附言：{{}}
         </div>
         <div class="text item">
           2、送货时间：{{}}
         </div>
         <div class="text item">
           3、发票抬头：{{}}
         </div>
         <div class="text item">
           4、发票内容：{{}}
         </div>
         <div class="text item">
           5、物流信息：<el-button type="text" @click="looklogistics">点击查看</el-button>
         </div>
       </div>
    </div>
    <!--订单状态 步骤条-->
    <el-steps :active="activestep" align-center finish-status="success" style="margin-top: 20px;">
      <el-step title="新订单" description=""></el-step>
      <el-step title="已确认" description=""></el-step>
      <el-step title="已付款" description=""></el-step>
      <el-step title="已发货" description=""></el-step>
      <el-step title="已收货" description=""></el-step>
      <el-step title="已完成" description=""></el-step>
    </el-steps>
    <!--商品列表-->
    <el-row :gutter="0">
      <el-col :span="24">
        <div class="d-header">商品列表</div>
        <el-table :data="productList" :header-cell-style="{textAlign: 'center'}">
          <el-table-column label="商品图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.goods_image" class="goods-image"/>
            </template>
          </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" align="left"/>
          <el-table-column label="单价（元）" width="150">
            <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
          </el-table-column>
          <el-table-column prop="num" label="数量" width="120"/>
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
        /** 订单日志loading状态 */
        loading_log: false,
        /** 订单详情数据 */
        orderDetail: null,
        /** 订单日志 */
        orderLog: [],
        /** 订单sn */
        sn: this.$route.params.sn,
        /** 基本信息、发票信息、买家信息、商家信息 */
        orderInfo: [],
        /** 产品列表 */
        productList: null,
        /** 当前步骤*/
        activestep: 2
      }
    },
    filters: {
      paymentTypeFilter(val) {
        return val === 'online' ? '在线支付' : '货到付款'
      },
      unixToDate(val) {
        return Foundation.unixToDate(val)
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

      /** 查看物流信息*/
      looklogistics() {
        console.log(4546)
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
                { label: '订单状态', value: o.order_status_text + (o.cancel_reason ? '（' + o.cancel_reason + '）' : '') },
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
  .order-info{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    div:first-child{
      flex-grow: 1;
    }
    div:last-child{
      flex-grow: 3;
    }
  }
  .order-status-info{
    padding: 20px;
  }
  .item{
     padding: 4px;
  }
</style>

