<template>
  <div v-loading="loading" class="order-detail-container">
    <div class="order-info" v-if="orderDetail">
      <!--accordion-->
      <el-collapse  class="order-collapse" :value="['order','other']">
        <!--订单信息-->
        <el-collapse-item title="订单信息" name="order">
          <div class="order-item">
            <span class="item-name">收货地址：</span>
            <span class="item-value">{{ orderDetail.ship_addr }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">收货人：</span>
            <span class="item-value">{{ orderDetail.ship_name }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">联系电话：</span>
            <span class="item-value">{{ orderDetail.ship_mobile }}</span>
          </div>
          <hr>
          <!--订单编号 付款方式 下单时间-->
          <div class="order-item">
            <span class="item-name">订单编号：</span>
            <span class="item-value">{{ orderDetail.order_sn }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">付款方式：</span>
            <span class="item-value">{{ orderDetail.payment_type | paymentTypeFilter }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">下单时间：</span>
            <span class="item-value">{{ orderDetail.order_time | unixToDate }}</span>
          </div>
          <hr>
          <!--相关费用-->
          <div class="order-item">
            <span class="item-name">商品总价：</span>
            <span class="item-value">{{ orderDetail.goods_price | unitPrice('¥') }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">运费：</span>
            <span class="item-value">{{ }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">优惠金额：</span>
            <span class="item-value">{{ orderDetail.discount_price | unitPrice('¥') }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">订单总价：</span>
            <span class="item-value">{{ orderDetail.order_price | unitPrice('¥') }}</span>
          </div>
        </el-collapse-item>
        <!--其他信息（发票、备注）-->
        <el-collapse-item title="其他信息（发票、备注）" name="other">
          <div class="order-item">
            <span class="item-name">订单附言：</span>
            <span class="item-value">{{ orderDetail.remark }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">送货时间：</span>
            <span class="item-value">{{ orderDetail.ship_time }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">发票抬头：</span>
            <span class="item-value">{{ orderDetail.receipt_title }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">税号：</span>
            <span class="item-value">{{ orderDetail.duty_invoice }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">发票内容：</span>
            <span class="item-value">{{ orderDetail.receipt_content }}</span>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!--订单状态 / 物流信息-->
      <div class="order-status-info">
        <!--订单状态-->
        <div v-if="logisticsStatus">
          <div class="order-status">
            <i class="el-icon-check"></i>  订单状态：{{ orderDetail.order_status_text }}
          </div>
          <div class="order-item">
            <span class="item-name"> 1、订单附言：</span>
            <span class="item-value">{{ orderDetail.remark }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">2、送货时间：</span>
            <span class="item-value">{{ orderDetail.ship_time }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">3、发票抬头：</span>
            <span class="item-value">{{ orderDetail.receipt_title }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">4、发票内容：</span>
            <span class="item-value">{{ orderDetail.receipt_content }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">5、物流信息：</span>
            <span class="item-value">
            <el-button type="text" @click="looklogistics">点击查看</el-button>
          </span>
          </div>
        </div>
        <!--物流信息-->
        <div v-if="!logisticsStatus">
          <en-tabel-layout
            toolbar
            :tableData="logisticsData"
            :loading="loading"
          >
            <div slot="toolbar" class="inner-toolbar">
              <span style="line-height: 35px;">物流信息</span>
              <el-button type="primary" size="mini" @click="addLogisticsInfo">添加物流信息</el-button>
            </div>
            <template slot="table-columns">
              <!--公司名称-->
              <el-table-column prop="sn" label="公司名称"/>
              <!--物流单号-->
              <el-table-column label="物流单号">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sn"></el-input>
                </template>
              </el-table-column>
              <!--是否支持电子面单-->
              <el-table-column label="是否支持电子面单">
                <template slot-scope="scope">
                  <span>不支持电子面单</span>
                  <el-button type="text" @click="produceElectronicSurface">生成电子面单</el-button>
                </template>
              </el-table-column>
              <!--操作-->
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    plain type="primary"
                    @click="deliverGoods(scope.$index, scope.row)">发货
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </en-tabel-layout>
        </div>
        <div class="opera-btn">
          <el-button
            v-if="activestep === 2 || activestep === 3 || activestep === 4"
            size="mini"
            plain
            type="info"
            @click="adjustConsignee" >修改收货人信息</el-button>
          <el-button v-if="activestep === 2" plain type="info" @click="adjustPrice" >调整价格</el-button>
        </div>
      </div>
    </div>
    <!--订单状态 步骤条-->
    <el-steps :active="activestep" align-center style="margin-top: 20px;">
      <el-step v-for="item in stepList" :title="item.label" :key="item.label" status="error"></el-step>
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
    <el-dialog :title="dialogTitle" :visible.sync="orderDetailShow" width="30%">
      <div align="center">
        <!--调整价格-->
        <el-input v-show="triggerStatus === 1" v-model="adjustedPrice"style="width: 75%;"></el-input>
        <!--修改收货人信息-->
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
          <el-form-item label="送货时间：" prop="send_time" style="text-align: left;">
            <el-select v-model="ConsigneeForm.send_time" placeholder="请选择">
              <el-option label="任意时间" value="1"></el-option>
              <el-option label="仅工作日" value="2"></el-option>
              <el-option label="仅休息日" value="3"></el-option>
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="订单备注：" prop="mark">
            <el-input  type="textarea" v-model="ConsigneeForm.mark" placeholder="限500字" maxlength="500"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderDetail">取 消</el-button>
        <el-button type="primary" @click="reserveOrderDetail">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看物流信息-->
    <el-dialog title="物流信息" :visible.sync="logisticsShow" width="30%">
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
  import { CategoryPicker } from '@/components'
  export default {
    name: 'orderDetail',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 订单详情数据 */
        orderDetail: null,

        /** 订单sn */
        sn: '',

        /** 各种信息 */
        orderInfo: [],

        /** 产品列表 */
        productList: [],

        /** 订单状态/物流信息状态显示 */
        logisticsStatus: true,

        /** 物流信息 */
        logisticsData: [],

        /** 物流信息弹框是否显示 */
        logisticsShow: false,

        /** 弹框显示 */
        orderDetailShow: false,

        /** 弹框标题 */
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
          phone: '',

          /** 地区 */
          area: '',

          /** 详细地址 */
          address: '',

          /** 送货时间 */
          send_time: '',

          /** 备注 */
          mark: ''
        },

        /** 步骤状态 当前步骤*/
        activestep: 2,

        /** 步骤list 存在0已完成 1未完成 2未开始 3正在进行 四种状态*/
        stepList: [
          { label: '新订单', setp_status: 0 },
          { label: '已确认', setp_status: 1 },
          { label: '未付款', setp_status: 2 },
          { label: '已付款', setp_status: 3 },
          { label: '已发货', setp_status: 2 },
          { label: '已收货', setp_status: 0 },
          { label: '已完成', setp_status: 0 }
        ]
      }
    },
    filters: {
      paymentTypeFilter(val) {
        return val === 'ONLINE' ? '在线支付' : '货到付款'
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.sn = to.params.sn
      this.GET_OrderDetail()
      next()
    },
    mounted() {
      this.sn = this.$route.params.sn
      this.GET_OrderDetail()
    },
    methods: {
      GET_OrderDetail() {
        this.loading = true
        API_order.getOrderDetail(this.sn).then(response => {
          this.loading = false
          this.orderDetail = response
          this.productList = response.sku_list
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

      /** 生成电子面单 */
      produceElectronicSurface() {

      },

      /** 发货 */
      deliverGoods() {

      },

      /** 添加物流信息 */
      addLogisticsInfo() {

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
        align-items: flex-start;
        span {
          display: inline-block;
        }
        span:first-child {
          min-width: 75px;
        }
        span:last-child {
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

