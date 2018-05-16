<template>
  <div v-loading="loading" class="order-detail-container">
    <div class="order-info">
      <!--accordion-->
      <el-collapse  class="order-collapse">
        <!--订单信息-->
        <el-collapse-item title="订单信息">
          <div class="order-item">
            <span class="item-name">收货地址：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">收货人：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">联系电话：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <hr>
          <!--订单编号 付款方式 下单时间-->
          <div class="order-item">
            <span class="item-name">订单编号：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">付款方式：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">下单时间：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <hr>
          <!--相关费用-->
          <div class="order-item">
            <span class="item-name">商品总价：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">运费：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">优惠金额：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">订单总价：</span>
            <span class="item-value">{{ }}</span>
          </div>
        </el-collapse-item>
        <!--其他信息（发票、备注）-->
        <el-collapse-item title="其他信息（发票、备注）">
          <div class="order-item">
            <span class="item-name">订单附言：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">送货时间：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">发票抬头：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">发票内容：</span>
            <span class="item-value">{{ }}</span>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!--订单状态-->
      <div class="order-status-info">
        <div>
          <div class="order-status">
            <i class="el-icon-check"></i>  订单状态：{{ }}
          </div>
          <div class="order-item">
            <span class="item-name"> 1、订单附言：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">2、送货时间：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">3、发票抬头：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">4、发票内容：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">5、物流信息：</span>
            <span class="item-value">
            <el-button type="text" @click="looklogistics">点击查看</el-button>
          </span>
          </div>
        </div>
        <div class="opera-btn">
          <el-button size="mini" type="primary" @click="adjustConsignee" >修改收货人信息</el-button>
          <el-button size="mini" type="primary" @click="adjustPrice" >调整价格</el-button>
        </div>
      </div>
    </div>
    <!--订单状态 步骤条-->
    <el-steps :active="activestep" align-center finish-status="success" style="margin-top: 20px;">
      <el-step title="新订单" description=""></el-step>
      <el-step title="未付款" description=""></el-step>

      <el-step title="已取消" description=""></el-step>
      <el-step title="已付款" description=""></el-step>

      <el-step title="已发货" description=""></el-step>
      <el-step title="已收货" description=""></el-step>
      <el-step title="已完成" description=""></el-step>
    </el-steps>
    <!--商品列表-->
    <div>
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
    </div>
  </div>
</template>

<script>
  import * as API_order from '@/api/order'
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
      }
    },
    mounted() {
      // this.GET_OrderDetail()
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
          this.$message.error(error)
        })
      },

      /** 查看物流信息*/
      looklogistics() {
      },

      /** 调整价格 */
      adjustPrice() {

      },

      /** 修改收货人信息 */
      adjustConsignee() {

      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*背景颜色*/
  .order-detail-container {
    background-color: #fff;
  }

  /*订单信息*/
  .order-info {
    width:100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    div.order-collapse {
      width:25%;
      border: 1px solid #e5e5e5;
      /*折叠面板*/
      .el-collapse-item {
        /deep/ .el-collapse-item__header {
          text-align: left;
          background-color: #f8f8f8;
          padding:0 10px;
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }
        /deep/ .el-collapse-item__content {
          padding: 15px;
          text-align: left;
          div {
            margin:5px 10px;
            span.item-name {
              font-weight: bold;
              color: #888;
              font-size: 14px;
            }
          }
          hr {
            border-top: 1px dotted #e5e5e5;
          }
        }
      }
      /* 订单信息中的名值对布局 */
      .order-item {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        span:first-child {
          flex-grow: 1;
          width: 2%;
        }
        span:last-child {
          flex-grow: 4;
          text-align:left;
        }
      }
    }

    /*** 订单状态 */
    div.order-status-info{
      width:75%;
      padding:0 20px;
      border: 1px solid #e5e5e5;
      border-left: none;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: stretch;
      div.order-status {
        line-height: 40px;
        color: #333;
        font-size: 20px;
        padding: 5px;
        border-bottom: 1px solid #e5e5e5;
        i {
          color: #5cb85c;
          font-weight: bold;
          font-size: 25px;
        }
      }
      div.opera-btn {
        text-align: right;
        margin-bottom: 10px;
      }

      div.order-item {
        color: #333;
        font-size: 15px;
        margin: 5px 0;
        line-height: 25px;
        .el-button--text {
          padding: 0;
        }
      }
    }
  }


  /*商品列表*/
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

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }


</style>

