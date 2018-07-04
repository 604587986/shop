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
            <span class="item-value">{{ orderDetail.sn }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">付款方式：</span>
            <span class="item-value">{{ orderDetail.payment_type | paymentTypeFilter }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">下单时间：</span>
            <span class="item-value">{{ orderDetail.create_time | unixToDate }}</span>
          </div>
          <hr>
          <!--相关费用-->
          <div class="order-item">
            <span class="item-name">商品总价：</span>
            <span class="item-value">{{ orderDetail.goods_price | unitPrice('¥') }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">运费：</span>
            <span class="item-value">{{ orderDetail.shipping_price | unitPrice('¥') }}</span>
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
            <span class="item-value">{{ orderDetail.receive_time }}</span>
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
            <span class="item-value">{{ orderDetail.receive_time }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">3、发票抬头：</span>
            <span class="item-value">{{ orderDetail.receipt_title }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">4、发票内容：</span>
            <span class="item-value">{{ orderDetail.receipt_content }}</span>
          </div>
          <div class="order-item" v-if="!isShowEditShipName">
            <span class="item-name">5、物流信息：</span>
            <span class="item-value">
            <el-button type="text" @click="looklogistics">点击查看</el-button>
          </span>
          </div>
        </div>
        <!--物流信息-->
        <div v-if="!logisticsStatus">
          <en-table-layout
            :tableData="logisticsData"
            :loading="loading">
            <div slot="toolbar" class="inner-toolbar">
              <span style="line-height: 35px;">物流信息</span>
              <el-button type="primary" @click="addLogisticsInfo">添加物流信息</el-button>
            </div>
            <template slot="table-columns">
              <!--公司名称-->
              <el-table-column prop="name" label="公司名称"/>
              <!--物流单号-->
              <el-table-column label="物流单号">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ship_no"></el-input>
                </template>
              </el-table-column>
              <!--是否支持电子面单-->
              <el-table-column label="是否支持电子面单">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_waybill === 0">不支持电子面单</span>
                  <el-button
                    type="text"
                    v-if="scope.row.is_waybill === 1"
                    @click="produceElectronicSurface">生成电子面单</el-button>
                </template>
              </el-table-column>
              <!--操作-->
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    plain type="primary"
                    @click="deliverGoods(scope.row)">发货
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </en-table-layout>
        </div>
        <div class="opera-btn">
          <el-button v-if="isShowEditShipName" plain type="info" @click="adjustConsignee" >修改收货人信息</el-button>
          <el-button v-if="isShowEditOrderPrice" plain type="info" @click="adjustPrice" >调整价格</el-button>
          <el-button v-if="isShowConfirmReceive" plain type="info" @click="confirmReceive" >确认收款</el-button>
        </div>
      </div>
    </div>
    <!--订单状态 步骤条-->
    <el-steps  align-center style="margin-top: 20px;" simple>
      <el-step v-for="item in stepList" :title="item.text" :key="item.text" :status="item.show_status"></el-step>
    </el-steps>
    <!--商品列表-->
    <div>
      <el-table :data="productList" :header-cell-style="{textAlign: 'center'}">
        <el-table-column label="商品图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.goods_image" class="goods-image"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" />
        <el-table-column label="单价（元）" width="150">
          <template slot-scope="scope">{{ scope.row.original_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" width="120"/>
        <el-table-column label="小计" width="120">
          <template slot-scope="scope">{{ scope.row.subtotal | unitPrice('￥') }}</template>
        </el-table-column>
      </el-table>
    </div>
    <!--调整价格 / 修改收货人信息-->
    <el-dialog :title="dialogTitle" :visible.sync="orderDetailShow" :width="dialogWidth">
      <div align="center">
        <!--调整订单总价-->
        <el-form
          v-show="triggerStatus === 1"
          label-position="right">
          <el-form-item>
            <el-input placeholder="请输入订单总价" v-model="adjustedPrice">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
        </el-form>
        <!--修改收货人信息-->
        <el-form
          :model="ConsigneeForm"
          v-show="triggerStatus === 2"
          label-position="right"
          label-width="90px">
          <el-form-item label="收货人：" prop="ship_name">
            <el-input  v-model="ConsigneeForm.ship_name" ></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="ship_mobile" >
            <el-input  v-model.number="ConsigneeForm.ship_mobile" ></el-input>
          </el-form-item>
          <el-form-item label="配送地区：" prop="region" class="area-select">
            <en-region-picker :api="areasapi" :default="areas" @changed="handleChangeArea"></en-region-picker>
          </el-form-item>
          <el-form-item label="详细地址：" prop="ship_addr" >
            <el-input  v-model="ConsigneeForm.ship_addr" ></el-input>
          </el-form-item>
          <el-form-item label="送货时间：" prop="receive_time" style="text-align: left;">
            <el-select v-model="ConsigneeForm.receive_time" placeholder="请选择">
              <el-option label="任意时间" value="任意时间"></el-option>
              <el-option label="仅工作日" value="仅工作日"></el-option>
              <el-option label="仅休息日" value="仅休息日"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单备注：" prop="remark">
            <el-input  type="textarea" v-model="ConsigneeForm.remark" placeholder="限500字" maxlength="500"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderDetail">取 消</el-button>
        <el-button type="primary" @click="reserveOrderDetail">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看物流信息-->
    <el-dialog title="物流信息" :visible.sync="logisticsShow" width="20%" align="center">
      <div class="logistics-info">
        <div>
          <span>时间：</span>
          <span>2018-06-05</span>
        </div>
        <div>
          <span>备注：</span>
          <span>撒大大说到发送</span>
        </div>
        <div>
          <span>物流公司：</span>
          <span>撒的发生地发送</span>
        </div>
        <div>
          <span>快递单号：</span>
          <span>15645616161</span>
        </div>
        <div>
          <span>提示：</span>
          <span>法师打发打发</span>
        </div>
      </div>
    </el-dialog>
    <!--物流信息-->
    <en-logistics-company
      :logisticsShow="logisticsCompanyShow"
      @logisticsChanged="logisticsChanged"
      @logstictisClosed="logstictisClosed"
    ></en-logistics-company>
  </div>
</template>

<script>
  import * as API_order from '@/api/order'
  import * as API_logistics from '@/api/expressCompany'
  import { CategoryPicker } from '@/components'
  import { LogisticsCompany } from './components'
  export default {
    name: 'orderDetail',
    components: {
      [LogisticsCompany.name]: LogisticsCompany,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        areasapi: `${process.env.BASE_API}/regions/@id/children`,

        /** 列表loading状态 */
        loading: false,

        /** 订单详情数据 */
        orderDetail: null,

        /** 订单sn */
        sn: '',

        /** 产品列表 */
        productList: [],

        /** 是否显示修改收货人信息按钮 默认不显示*/
        isShowEditShipName: false,

        /** 是否显示调整价格按钮  默认不显示*/
        isShowEditOrderPrice: false,

        /** 是否显示确认收款按钮 默认不显示 */
        isShowConfirmReceive: false,

        /** 订单状态/物流信息状态显示 */
        logisticsStatus: true,

        /** 物流信息 */
        logisticsData: [],

        /** 物流信息弹框是否显示 */
        logisticsShow: false,

        /** 是否显示物流信息弹框 */
        logisticsCompanyShow: false,

        /** 弹框显示 */
        orderDetailShow: false,

        /** 弹框标题 */
        dialogTitle: '调整订单总价',

        /** 弹框宽度 */
        dialogWidth: '25%',

        /** 触发状态 1调整订单总价 2修改收货人信息*/
        triggerStatus: -1,

        /** 被调整的价格 */
        adjustedPrice: 0,

        /** 收货人信息 */
        ConsigneeForm: {
          /** 收货人 */
          ship_name: '',

          /** 手机号码 */
          ship_mobile: '',

          /** 地区 */
          region: '',

          /** 详细地址 */
          ship_addr: '',

          /** 送货时间 */
          receive_time: '',

          /** 备注 */
          remark: ''
        },

        /** 地区信息*/
        areas: [],

        /** 步骤list*/
        stepList: []
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
          // 订单信息
          this.orderDetail = response
          // 商品信息 因此处后台并未进行传输数据 因此自己请求接口进行获取对应订单商品列表数据
          this.getReactiveOrderskuList()
          // 修改收货人信息地区选择器信息
          this.areas = [this.orderDetail.ship_province_id, this.orderDetail.ship_city_id,
            this.orderDetail.ship_county_id || -1, this.orderDetail.ship_town_id || -1]
          // 步骤条信息
          this.getStepList()
          // 是否可发货 如果可发货则获取物流公司信息列表 是否可发货 在线支付（已付款状态可发货） 货到付款（已确认状态可发货）
          if ((this.orderDetail.payment_type === 'ONLINE' && this.orderDetail.order_status === 'PAID_OFF') ||
            (this.orderDetail.payment_type === 'COD' && this.orderDetail.order_status === 'CONFIRM')) {
            this.getLogisticsCompanies()
          } else {
            this.logisticsStatus = true
          }

          // 是否可以修改收货人信息 未发货时皆可修改收货人信息（订单状态 新订单 已确认 未付款） 在线支付时已付款
          if (this.orderDetail.order_status === 'NEW' || this.orderDetail.order_status === 'CONFIRM' ||
            this.orderDetail.order_status === 'PAY_NO' || (this.orderDetail.order_status === 'PAID_OFF' && this.orderDetail.payment_type === 'ONLINE')) {
            this.isShowEditShipName = true
          }

          // 是否可以调整价格  （在线支付）未付款时皆可调整价格 （订单状态 新订单 已确认 未付款)
          if (this.orderDetail.pay_status === 'PAY_NO') {
            this.isShowEditOrderPrice = true
          }

          // 是否可以确认收款 货到付款时 已收货状态
          if (this.orderDetail.payment_type === 'COD' && this.orderDetail.order_status === 'ROG') {
            this.isShowEditOrderPrice = true
          }
        })
      },

      /** 获取订单步骤条信息 */
      getStepList() {
        API_order.getStepList(this.sn).then(response => {
          this.stepList = response
          this.stepList = this.stepList.map(key => {
            switch (key.show_status) {
              case 0: key.show_status = 'wait'
                break
              case 1: key.show_status = 'success'
                break
              case 2: key.show_status = 'error'
                break
              case 3: key.show_status = 'success'
                break
            }
            return key
          })
        })
      },

      /** 获取对应订单商品列表数据 */
      getReactiveOrderskuList() {
        this.loading = true
        const _params = {
          order_sn: this.sn
        }
        API_order.getOrderList(_params).then(response => {
          this.loading = false
          this.productList = response.data[0].sku_list
        })
      },

      /** 获取物流公司信息列表 */
      getLogisticsCompanies() {
        API_logistics.getExpressCompanyList({}).then(response => {
          this.logisticsData = response
          this.logisticsData = this.logisticsData.filter(key => {
            return key.shop_id
          })
          this.logisticsData.forEach(key => {
            this.$set(key, 'ship_no', '')
          })
          this.logisticsStatus = false
        })
      },

      /** 查看物流信息*/
      looklogistics() {
        this.logisticsShow = true
      },

      /** 调整价格 */
      adjustPrice() {
        this.dialogTitle = '调整订单总价'
        this.dialogWidth = '15%'
        this.orderDetailShow = true
        this.triggerStatus = 1
        this.adjustedPrice = this.orderDetail.order_price
      },

      /** 生成电子面单 */
      produceElectronicSurface() {

      },

      /** 发货 */
      deliverGoods(row) {
        if (!row.ship_no) {
          this.$message.error('请填写快递单号')
          return
        }
        const _params = {
          /** 发货单号 */
          ship_no: row.ship_no,
          /** 物流公司id */
          logi_id: row.logi_id,
          /** 物流公司名称 */
          logi_name: row.name
        }
        this.$confirm('确认发货?', '提示', { type: 'warning' }).then(() => {
          API_order.deliveryGoods(this.sn, _params).then(() => {
            this.GET_OrderDetail()
          })
        })
      },

      /** 添加物流信息 */
      addLogisticsInfo() {
        this.logisticsCompanyShow = true
      },

      /** 监听物流公司信息开启/关闭操作 */
      logisticsChanged() {
        this.getLogisticsCompanies()
      },

      logstictisClosed(target) {
        this.logisticsCompanyShow = target
      },

      /** 操作地区选择器改变时 触发*/
      handleChangeArea(val) {
        this.ConsigneeForm.region = val.last_id
      },

      /** 修改收货人信息 */
      adjustConsignee() {
        this.dialogTitle = '修改收货人信息'
        this.dialogWidth = '25%'
        this.orderDetailShow = true
        this.triggerStatus = 2
        /** 为收货人信息赋予数据信息 */
        this.ConsigneeForm = {
          /** 收货人 */
          ship_name: this.orderDetail.ship_name,

          /** 手机号码 */
          ship_mobile: this.orderDetail.ship_mobile,

          /** 详细地址 */
          ship_addr: this.orderDetail.ship_addr,

          /** 送货时间 */
          receive_time: this.orderDetail.receive_time,

          /** 备注 */
          remark: this.orderDetail.remark
        }
      },

      /** 取消保存 */
      cancelOrderDetail() {
        this.orderDetailShow = false
        this.triggerStatus = -1
      },

      /** 保存按钮 */
      reserveOrderDetail() {
        this.orderDetailShow = false
        if (this.triggerStatus === 2) { // 修改收货人信息
          API_order.updateConsigneeInfo(this.sn, this.ConsigneeForm).then(() => {
            this.$message.success('收货人信息修改成功')
            this.GET_OrderDetail()
          })
        } else if (this.triggerStatus === 1) { // 调整价格
          const _params = {
            order_price: this.adjustedPrice
          }
          API_order.updateOrderPrice(this.sn, _params).then(() => {
            this.$message.success('价格修改成功')
            this.GET_OrderDetail()
          })
        }
        this.triggerStatus = -1
      },

      /** 确认收款 */
      confirmReceive() {

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

  /*地区选择器*/
  /deep/.area-select {
    .el-form-item__content {
      text-align: left;
      .app-address {
        text-align: left;
      }
    }
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

  /deep/ .el-dialog__footer {
    padding-top: 0;
  }
  /*物流信息*/
  /deep/ .el-dialog__body {
    padding: 20px 25px;
  }
  .logistics-info {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    div {
      margin: 10px 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      span {
        display: inline-block;
      }
      span:first-child {
        width: 44%;
        text-align: right;
      }
    }
  }

</style>

