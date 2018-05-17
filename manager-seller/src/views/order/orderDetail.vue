<template>
  <div v-loading="loading" class="order-detail-container">
    <div class="order-info">
      <!--accordion-->
      <el-collapse  class="order-collapse" :value="['order','other']">
        <!--订单信息-->
        <el-collapse-item title="订单信息" name="order">
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
        <el-collapse-item title="其他信息（发票、备注）" name="other">
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
          <el-button size="mini" plain type="info" @click="adjustConsignee" >修改收货人信息</el-button>
          <el-button size="mini" plain type="info" @click="adjustPrice" >调整价格</el-button>
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
    <!--调整价格 / 修改收货人信息-->
    <el-dialog :title="dialogTitle" :visible.sync="orderDetailShow" width="30%" align="center">
      <div align="center">
        <el-input v-show="triggerStatus === 1" v-model="adjustedPrice"style="width: 75%;"></el-input>
        <el-form
          :model="ConsigneeForm"
          v-show="triggerStatus === 2"
          style="width: 75%;"
          label-position="right"
          label-width="90px">
          <el-form-item label="收货人：" prop="consignee_person">
            <el-input  v-model="ConsigneeForm.consignee_person" ></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="phone" >
            <el-input  v-model.number="ConsigneeForm.phone" ></el-input>
          </el-form-item>
          <el-form-item label="配送地区：" prop="area" >
            <el-input  v-model="ConsigneeForm.area" ></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address" >
            <el-input  v-model="ConsigneeForm.address" ></el-input>
          </el-form-item>
          <el-form-item label="送货时间：" prop="send_time" >
            <el-input  v-model="ConsigneeForm.send_time" ></el-input>
          </el-form-item>
          <el-form-item label="订单备注：" prop="mark" >
            <el-input  type="textarea" v-model="ConsigneeForm.mark" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderDetail">取 消</el-button>
        <el-button type="primary" @click="reserveOrderDetail">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看物流信息-->
    <el-dialog title="物流信息" :visible.sync="logisticsShow" width="30%" align="center">
      <a href="">快递查询</a>
      <div>
        <span>时间：</span>
        <span>备注：</span>
        <span>物流公司：</span>
        <span>快递单号：</span>
      </div>
      <span class="desc">法师打发打发</span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_order from '@/api/order'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'orderDetail',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 订单详情数据 */
        orderDetail: null,

        /** 订单sn */
        sn: this.$route.params.sn,

        /** 各种信息 */
        orderInfo: [],

        /** 产品列表 */
        productList: null,

        /** 当前步骤*/
        activestep: 5,

        /** 物流信息弹框是否显示 */
        logisticsShow: false,

        /** 订单详情 修改收货人信息 调整价格 弹框 */
        orderDetailShow: false,

        /** 价格标题 */
        dialogTitle: '调整价格',

        /** 触发状态 1调整价格 2修改收货人信息*/
        triggerStatus: -1,

        /** 被调整的价格 */
        adjustedPrice: 0,

        /** 收货人信息 */
        ConsigneeForm: {
          /** 收货人 */
          consignee_person: '',

          /** 手机号码 */
          phone: 12,

          /** 地区 */
          area: '',

          /** 详细地址 */
          address: '',

          /** 送货时间 */
          send_time: '',

          /** 备注 */
          mark: ''
        }
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
        this.logisticsShow = true
      },

      /** 调整价格 */
      adjustPrice() {
        this.dialogTitle = '调整价格'
        this.orderDetailShow = true
        this.triggerStatus = 1
      },

      /** 修改收货人信息 */
      adjustConsignee() {
        this.dialogTitle = '修改收货人信息'
        this.orderDetailShow = true
        this.triggerStatus = 2
      },

      /** 取消保存 */
      cancelOrderDetail() {
        this.orderDetailShow = false
        this.triggerStatus = -1
      },

      /** 保存按钮 */
      reserveOrderDetail() {
        this.orderDetailShow = false
        this.triggerStatus = 1
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

