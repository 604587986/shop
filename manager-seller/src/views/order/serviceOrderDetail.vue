<template>
  <div v-loading="loading" class="order-detail-container">
    <div class="order-info" v-if="orderDetail">
      <!--accordion-->
      <el-collapse  class="order-collapse" :value="['order', 'promotions', 'other']">
        <!--订单信息-->
        <el-collapse-item title="订单信息" name="order">
          <div class="order-item">
            <span class="item-name">联系地址：</span>
            <span class="item-value">
              {{ orderDetail.ship_province }}
              {{ orderDetail.ship_city }}
              {{ orderDetail.ship_county }}
              {{ orderDetail.ship_addr }}
            </span>
          </div>
          <div class="order-item">
            <span class="item-name">预约人：</span>
            <span class="item-value">{{ orderDetail.ship_name }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">预约时间：</span>
            <span class="item-value">{{ orderDetail.receive_time }}</span>
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
            <span class="item-name">付款渠道：</span>
            <span class="item-value">{{ orderDetail.payment_method_name || '无' }}</span>
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
          <!-- <div class="order-item">
            <span class="item-name">运费：</span>
            <span class="item-value">{{ orderDetail.shipping_price | unitPrice('¥') }}</span>
          </div> -->
          <div class="order-item">
            <span class="item-name">订单总价：</span>
            <span class="item-value">{{ orderDetail.order_price | unitPrice('¥') }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">预付款：</span>
            <span class="item-value">{{ orderDetail.first_money | unitPrice('¥') }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">尾款：</span>
            <span class="item-value">{{ orderDetail.end_money | unitPrice('¥') }}</span>
          </div>
        </el-collapse-item>
        <!--促销信息-->
        <el-collapse-item title="促销信息" name="promotions" v-if="orderDetail.cash_back || orderDetail.gift_point || orderDetail.coupon_price">
          <div class="order-item" v-if="orderDetail.cash_back">
            <span class="item-name">返现金额：</span>
            <span class="item-value">{{ orderDetail.cash_back | unitPrice('¥') }}</span>
          </div>
          <div class="order-item" v-if="orderDetail.gift_point">
            <span class="item-name">赠送积分：</span>
            <span class="item-value">{{ orderDetail.gift_point }}</span>
          </div>
          <div class="order-item" v-if="orderDetail.coupon_price">
            <span class="item-name">优惠券抵扣：</span>
            <span class="item-value">{{ orderDetail.coupon_price | unitPrice('¥') }}</span>
          </div>
        </el-collapse-item>
        <!--其他信息（发票、备注）-->
        <el-collapse-item title="其他信息（发票、备注）" name="other">
          <div class="order-item">
            <span class="item-name">订单备注：</span>
            <span class="item-value">{{ orderDetail.remark || '无' }}</span>
          </div>
          <!-- <div class="order-item">
            <span class="item-name">送货时间：</span>
            <span class="item-value">{{ orderDetail.receive_time }}</span>
          </div> -->
          <template v-if="orderDetail.receipt_history">
            <div class="order-item">
              <span class="item-name">发票类型：</span>
              <span class="item-value">{{ orderDetail.receipt_history.receipt_type }}</span>
            </div>
            <div class="order-item">
              <span class="item-name">发票抬头：</span>
              <span class="item-value">{{ orderDetail.receipt_history.receipt_title }}</span>
            </div>
            <div v-if="orderDetail.receipt_history.tax_no" class="order-item">
              <span class="item-name">税号：</span>
              <span class="item-value">{{ orderDetail.receipt_history.tax_no }}</span>
            </div>
            <div class="order-item">
              <span class="item-name">发票内容：</span>
              <span class="item-value">{{ orderDetail.receipt_history.receipt_content }}</span>
            </div>
          </template>
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
            <span class="item-name"> 订单备注：</span>
            <span class="item-value">{{ orderDetail.remark || '无' }}</span>
          </div>
          <div class="order-item">
            <span class="item-name">预约时间：</span>
            <span class="item-value">{{ orderDetail.receive_time }}</span>
          </div>
          <template v-if="orderDetail.receipt_history">
            <div class="order-item">
              <span class="item-name">发票类型：</span>
              <span class="item-value">{{ orderDetail.receipt_history.receipt_type }}</span>
            </div>
            <div class="order-item">
              <span class="item-name">发票抬头：</span>
              <span class="item-value">{{ orderDetail.receipt_history.receipt_title }}</span>
            </div>
            <div v-if="orderDetail.receipt_history.tax_no" class="order-item">
              <span class="item-name"> 税 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号：</span>
              <span class="item-value">{{ orderDetail.receipt_history.tax_no }}</span>
            </div>
            <div class="order-item">
              <span class="item-name">发票内容：</span>
              <span class="item-value">{{ orderDetail.receipt_history.receipt_content }}</span>
            </div>
          </template>
          <div class="order-item" v-if="isLooklogistics">
            <span class="item-name">物流信息：</span>
            <span class="item-value">
            该商品为服务订单，无需物流信息
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
            </div>
            <template slot="table-columns">
              <!--物流单号-->
              <el-table-column label="提示">
                <template slot-scope="scope">
                  该订单为服务订单，无需物流信息，可直接点击确认
                </template>
              </el-table-column>
              <!--操作-->
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    plain type="primary"
                    @click="deliverGoods()">确认服务
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </en-table-layout>
        </div>
        <div class="opera-btn">
          <el-button v-if="isShowEditShipName" plain type="info" @click="adjustConsignee" >修改预约人信息</el-button>
          <!-- <el-button v-if="isShowEditOrderPrice" plain type="info" @click="adjustPrice" >调整价格</el-button> -->
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
        <el-table-column label="商品列表" width="180">
          <template slot-scope="scope">
            <a :href="`${MixinBuyerDomain}/goods/${scope.row.goods_id}`" target="_blank">
              <img :src="scope.row.goods_image" class="goods-image"/>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="left">
          <template slot-scope="scope">
            <a :href="`${MixinBuyerDomain}/goods/${scope.row.goods_id}`" target="_blank" style="color: #00a2d4;">{{ scope.row.name }}</a>
            <p class="sku-spec">{{ scope.row | formatterSkuSpec }}</p>
            <p class="sku-act-tags" v-if="scope.row.promotion_tags && scope.row.promotion_tags.length">
              <span class="sku-act-tag" v-for="(tag, index) in scope.row.promotion_tags" :key="index">{{ tag }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="单价（元）" width="150">
          <template slot-scope="scope">{{ scope.row.original_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" width="120"/>
        <el-table-column label="小计" width="120">
          <template slot-scope="scope">{{ scope.row.subtotal | unitPrice('￥') }}</template>
        </el-table-column>
      </el-table>
    </div>
    <!--赠品列表-->
    <div v-if="orderDetail && orderDetail.gift_list && orderDetail.gift_list.length">
      <el-table :data="orderDetail.gift_list" :header-cell-style="{textAlign: 'center'}">
        <el-table-column label="赠品列表" width="180">
          <template slot-scope="scope">
            <a :href="scope.row.gift_img" target="_blank">
              <img :src="scope.row.gift_img" class="goods-image"/>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="赠品名称" >
          <template slot-scope="scope">
            <a :href="scope.row.gift_img" target="_blank">{{ scope.row.gift_name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="赠品价格" width="150">
          <template slot-scope="scope">{{ scope.row.gift_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column label="" width="120"/>
        <el-table-column label="" width="120"/>
      </el-table>
    </div>
    <!--调整价格 / 修改收货人信息-->
    <el-dialog :title="dialogTitle" :visible.sync="orderDetailShow" :width="dialogWidth">
      <div align="center">
        <!--调整订单总价-->
        <el-form
          v-show="triggerStatus === 1"
          status-icon
          ref="adjustPriceForm"
          :rules="orderRules"
          label-position="right">
          <el-form-item prop="adjustedPrice">
            <el-input placeholder="请输入订单总价" v-model="adjustedPrice" @change="() => { adjustedPrice = adjustedPrice.trim() }">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
        </el-form>
        <!--修改收货人信息-->
        <el-form
          :model="ConsigneeForm"
          ref="ConsigneeForm"
          :rules="orderRules"
          status-icon
          v-show="triggerStatus === 2"
          label-position="right"
          label-width="120px">
          <el-form-item label="预约人：" prop="ship_name" >
            <el-input  v-model="ConsigneeForm.ship_name" @change="() => { ConsigneeForm.ship_name = ConsigneeForm.ship_name.trim() }" maxlength="20" placeholder="限20字"></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="ship_mobile" >
            <el-input  v-model.number="ConsigneeForm.ship_mobile" maxlength="11" ></el-input>
          </el-form-item>
          <el-form-item label="地区：" prop="region" class="area-select">
            <en-region-picker :api="MixinRegionApi" :default="areas" @changed="handleChangeArea"></en-region-picker>
          </el-form-item>
          <el-form-item label="详细地址：" prop="ship_addr" >
            <el-input  v-model="ConsigneeForm.ship_addr" @change="() => { ConsigneeForm.ship_addr = ConsigneeForm.ship_addr.trim() }" placeholder="限20字" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="预约时间：" prop="receive_time" style="text-align: left;">
            <!-- <el-date-picker
              v-model="ConsigneeForm.receive_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker> -->
            <el-input v-model="ConsigneeForm.receive_time" placeholder="预约时间"></el-input>
          </el-form-item>
          <el-form-item label="订单备注：" prop="remark">
            <el-input  type="textarea" rows="4" v-model="ConsigneeForm.remark" placeholder="限500字" maxlength="500"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderDetail">取 消</el-button>
        <el-button type="primary" @click="reserveOrderDetail">确 定</el-button>
      </div>
    </el-dialog>
    <!--电子面单-->
    <el-dialog title="电子面单" :visible.sync="electronicSurfaceShow" width="30%" align="center">
      <!--主体-->
      <div class="electronic-surface" ref="electronicSurface" id="electronicSurface"></div>
      <div slot="footer" align="right">
        <el-button type="primary" @click="handlePrint">打印</el-button>
      </div>
    </el-dialog>
    <!--物流信息-->
    <en-logistics-company
      :logisticsShow="logisticsCompanyShow"
      @logisticsChanged="logisticsChanged"
      @logstictisClosed="logstictisClosed"
    />
  </div>
</template>

<script>
/* eslint-disable */

  import * as API_order from '@/api/order'
  import * as API_logistics from '@/api/expressCompany'
  import { CategoryPicker } from '@/components'
  import { LogisticsCompany } from './components'
  import { RegExp } from '~/ui-utils'
  import Print from 'print-js'
  export default {
    name: 'serviceOrderDetail',
    components: {
      [LogisticsCompany.name]: LogisticsCompany,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      /** 金额 */
      const checkMoney = (rule, value, callback) => {
        if (!this.adjustedPrice && this.adjustedPrice !== 0) {
          return callback(new Error('订单总价不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(this.adjustedPrice)) {
            callback(new Error('请填写正确的金额'))
          } else {
            callback()
          }
        }, 1000)
      }
      /** 手机号 */
      const checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.mobile.test(value)) {
            callback(new Error('请填写正确的手机号'))
          } else {
            callback()
          }
        }, 1000)
      }
      return {
        /** 列表loading状态 */
        loading: false,

        /** 订单详情数据 */
        orderDetail: null,

        /** 订单sn */
        sn: '',

        /** 产品列表 */
        productList: [],

        /** 是否可以查看物流信息 默认不可以*/
        isLooklogistics: false,

        /** 是否显示修改收货人信息按钮 默认不显示*/
        isShowEditShipName: false,

        /** 是否显示调整价格按钮  默认不显示*/
        isShowEditOrderPrice: false,

        /** 是否显示确认收款按钮 默认不显示 */
        isShowConfirmReceive: false,

        /** 订单状态/物流信息状态显示 */
        logisticsStatus: true,

        /** 物流信息 */
        logisticsData: [{
          title:"该订单为服务订单，无需物流信息，可直接点击发货"
        }],

        /** 物流信息弹框是否显示 */
        logisticsShow: false,

        /** 是否显示物流信息弹框 */
        logisticsCompanyShow: false,

        /** 是否显示调整价格/修改收货人信息显示 */
        orderDetailShow: false,

        /** 发货物流信息 */
        logisticsInfoList: [],

        /** 物流快递名称 */
        logisticsName: '',

        /** 物流快递单号 */
        logisticsNo: '',

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
        stepList: [],

        /** 是否显示电子面单 */
        electronicSurfaceShow: false,

        /** 校验规则 */
        orderRules: {
          /** 调整价格 */
          adjustedPrice: [
            { validator: checkMoney, trigger: 'blur' }
          ],

          /** 收货人 */
          ship_name: [
            { required: true, message: '请填写收货人姓名', trigger: 'blur' }
          ],

          /** 手机号 */
          ship_mobile: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],

          /** 详细地址 */
          ship_addr: [
            { required: true, message: '请填写详细地址', trigger: 'blur' },
            { mix: 5, max: 100, message: '详细地址为5～100个字符', trigger: 'blur' }
          ]
        }
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
    activated() {
      this.sn = this.$route.params.sn
      this.GET_OrderDetail()
    },
    methods: {
      /** 获取订单详情信息 */
      GET_OrderDetail() {
        this.loading = true
        API_order.getOrderDetail(this.sn).then(response => {
          this.loading = false
          // 订单信息
          this.orderDetail = response
          // 商品信息
          this.productList = this.orderDetail.order_sku_list
          // 物流信息 快递单号 快递公司
          this.logisticsNo = this.orderDetail.ship_no
          this.logisticsName = this.orderDetail.logi_name
          // 修改收货人信息地区选择器信息
          this.areas = [this.orderDetail.ship_province_id, this.orderDetail.ship_city_id,
            this.orderDetail.ship_county_id || -1, this.orderDetail.ship_town_id || -1]
          // 步骤条信息
          this.getStepList()
          // 是否可发货 如果可发货则获取物流公司信息列表 是否可发货 在线支付（已付款状态可发货） 货到付款（已确认状态可发货）
          if ((this.orderDetail.payment_type === 'ONLINE' && this.orderDetail.order_status === 'PAID_OFF') ||
            (this.orderDetail.payment_type === 'COD' && this.orderDetail.order_status === 'CONFIRM')) {
            this.logisticsStatus = false
          } else {
            this.logisticsStatus = true
          }

          // 是否可以修改收货人信息 货到付款未发货时皆可修改收货人信息（订单状态 新订单 已确认 未付款） 在线支付时已付款可修改收货人信息
          if (this.orderDetail.order_status === 'NEW' || this.orderDetail.order_status === 'CONFIRM' ||
            this.orderDetail.order_status === 'PAY_NO' || (this.orderDetail.order_status === 'PAID_OFF' && this.orderDetail.payment_type === 'ONLINE')) {
            this.isShowEditShipName = true
          } else {
            this.isShowEditShipName = false
          }

          // 是否可以调整价格  （在线支付）未付款时皆可调整价格 （新订单 已确认 未付款)  货到付款（新订单 已确认 未付款）
          if ((this.orderDetail.payment_type === 'ONLINE' && this.orderDetail.pay_status === 'PAY_NO') ||
            (this.orderDetail.payment_type === 'COD' && (this.orderDetail.order_status === 'NEW' || this.orderDetail.order_status === 'CONFIRM' ||
              this.orderDetail.order_status === 'PAY_NO'))) {
            this.isShowEditOrderPrice = true
            if (this.orderDetail.order_status === 'CANCELLED') {
              this.isShowEditOrderPrice = false
            }
          } else {
            this.isShowEditOrderPrice = false
          }

          // 是否可以确认收款 （货到付款）已收货状态
          if (this.orderDetail.payment_type === 'COD' && this.orderDetail.order_status === 'ROG') {
            this.isShowConfirmReceive = true
          } else {
            this.isShowConfirmReceive = false
          }

          // 是否可以查看物流信息 物流信息为 正常订单发货之后可查看即 订单状态
          // 已发货 已收货 已完成 (货到付款)已付款 isLooklogistics
          if (this.orderDetail.order_status === 'SHIPPED' || this.orderDetail.order_status === 'ROG' || this.orderDetail.order_status === 'COMPLETE' ||
            (this.orderDetail.payment_type === 'COD' && this.orderDetail.order_status === 'PAID_OFF')) {
            this.isLooklogistics = true
          } else {
            this.isLooklogistics = false
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
              case 2: key.show_status = 'success'
                break
              case 3: key.show_status = 'error'
                break
            }
            return key
          })
        })
      },


      /** 查看物流信息*/
      looklogistics() {
        this.logisticsShow = false
        const _params = {
          id: this.orderDetail.logi_id,
          num: this.orderDetail.ship_no
        }
        this.loading = true
        API_order.getLogisticsInfo(_params).then(response => {
          this.logisticsShow = true
          this.loading = false
          this.logisticsInfoList = response.data
        })
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
      produceElectronicSurface(row) {
        const _params = {
          order_sn: this.sn,
          logistics_id: row.logi_id
        }
        this.$confirm('确认生成电子面单?', '提示', { type: 'warning' }).then(() => {
          API_order.generateElectronicSurface(_params).then((response) => {
            this.electronicSurfaceShow = true
            this.logisticsData.forEach(key => {
              if (row.logi_id === key.logi_id) {
                key.ship_no = response.code
              }
            })
            setTimeout(() => {
              this.$refs['electronicSurface'].innerHTML = response.template
            }, 200)
          })
        })
      },

      /** 打印电子面单 */
      handlePrint() {
        Print({
          printable: 'electronicSurface',
          type: 'html',
          // 继承原来的所有样式
          targetStyles: ['*']
        })
      },

      /** 发货（订单无需物流信息） */
      deliverGoods() {
        this.$confirm('确认服务?', '提示', { type: 'warning' }).then(() => {
          API_order.deliveryGoodsNull(this.sn).then(() => {
            this.$message.success('确认成功')
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
        this.$confirm('确认执行此操作?', '提示', { type: 'warning' }).then(() => {
          API_order.confirmGetAmount(this.sn, { pay_price: this.orderDetail.order_price }).then(() => {
            this.$message.success('收款成功！')
            this.GET_OrderDetail()
          })
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table__header thead th:first-child .cell {
    font-size: 16px;
    font-weight: bold;
  }
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
              text-align: right;
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

  /*商品图片大小*/
  .goods-image {
    width: 50px;
    height: 50px;
  }

  /deep/ .el-dialog__footer {
    padding-top: 0;
  }
  /*物流信息*/
  .logistics-base {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
      color: #4c4646;
    }
  }
  /deep/ .el-dialog__body {
    padding: 20px 25px;
    .logistics-info {
      max-height: 500px;
      overflow-y: scroll;
    }
  }

  /*电子面单*/
  /deep/ .electronic-surface {
    border: 1px solid #ddd;
    padding: 5px;
  }

  .sku-spec {
    color: #ff9800;
    margin: 0;
  }

  .sku-act-tags {
    padding: 0;
    margin: 0;
  }
  .sku-act-tag {
    display: inline-block;
    padding: 0 5px;
    line-height: 15px;
    margin-right: 5px;
    border: 1px solid #f42424;
    color: #f42424;
  }
</style>

