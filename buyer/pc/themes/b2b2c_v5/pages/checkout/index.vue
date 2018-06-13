<template>
  <div id="checkout">
    <div v-if="inventoryList.length === 0" class="listing-empty">
      <img src="../../assets/images/icon-listing-empty.png" alt="购物清单为空！">
      <h2>
        您的购物清单为空，请
        <nuxt-link to="/cart" class="back-cart-btn">返回购物车</nuxt-link>
        选择要结算的商品！
      </h2>
    </div>
    <template v-else>
      <div class="checkout-header">
        <div class="w">
          <div class="logo"><en-logo/></div>
          <en-cart-step :step="2"/>
        </div>
      </div>
      <div class="ckt-control">
        <div class="ckt-title">填写并核对订单信息</div>
        <div class="ckt-content">
          <!--收货人信息 start-->
          <checkout-address
            :address-id="params.address_id"
            @change="handleAddressSelect"
          />
          <!--收货人信息 end-->

          <!--支付方式 start-->
          <checkout-payment
            :payment-type="params.payment_type"
            @change="(type) => { params.payment_type = type }"
          />
          <!--支付方式 end-->

          <!--配送清单 start-->
          <checkout-inventory :inventory-list="inventoryList" :remark="params.remark"/>
          <!--配送清单 end-->

          <!--送货时间 start-->
          <checkout-time
            :receive-time="params.receive_time"
            @change="(time) => { params.receive_time = time }"
          />
          <!--送货时间 end-->

          <!--发票信息 start-->
          <div class="ckt-item invoice">
            <div class="top-ckt">
              <div class="clearfix"></div>
            </div>
            <div class="content-ckt invoice">

              <div class="receipt-title"></div>
              <div class="receipt-content">无需发票</div>
              <a href="javascript: void(0);" class="edit-invoice">修改</a>
              <div style="display: none;" id="invoice_content"><div class="invoice-dialog" id="invoice_dialog">
                <div class="invoice-head">
                  <div class="title-invoice-head">发票抬头：</div>
                  <div class="items-invoice-head" style="margin-bottom: 10px">
                    <div class="ckt-checkbox head-invoice personal selected">
                      <span>个人</span>
                      <input class="company-invoice-input" value="个人" style="display: none;">
                    </div>
                    <div class="ckt-checkbox head-invoice __add_ele__" style="display: none">
                      <input class="company-invoice-input" maxlength="60" style="border: none; outline: none;" placeholder="新增单位发票抬头">
                      <div class="__btns__ show">
                        <a href="javascript:;" class="__save__">保存</a>
                      </div>
                    </div>
                    <a href="javascript:;" style="color: #005ea7" class="add-invoice">新增单位发票</a>
                  </div>
                </div>
                <div class="invoice-head duty" style="display: none;">
                  <div class="title-invoice-head" style="margin-top: 10px">纳税人识别号：</div>
                  <input class="duty-invoice-input" placeholder="纳税人识别号" maxlength="50" value="">
                  <span style="color: #ff3500">必填</span>
                </div>
                <div class="invoice-content">
                  <div class="title-invoice-head">发票内容：</div>
                  <div class="items-invoice-content" style="float: left; width: 360px;">
                    <div class="ckt-checkbox content-invoice personal selected">
                      <span>明细</span>
                    </div>
                    <div class="ckt-checkbox content-invoice">
                      <span>办公用品</span>
                    </div>
                    <div class="ckt-checkbox content-invoice">
                      <span>劳保用品</span>
                    </div>
                    <div class="ckt-checkbox content-invoice">
                      <span>耗材</span>
                    </div>
                  </div>
                </div>

                <div class="invoice-inputs" style="display: none;">
                  <input type="hidden" name="receiptContent" value="明细">
                  <input type="hidden" name="receiptTitle" value="个人">
                  <input type="hidden" name="receiptDuty" value="">
                </div>
              </div></div>
            </div>            </div>
          <!--发票信息 end-->
        </div>
        <div class="ckt-total">
          <checkout-total :order-total="orderTotal"/>
          <div v-if="selectedAddress" class="summary-ckt-total">
            <div class="address-info-ckt">
              <span>收货人信息：</span>
              <span>{{ formatterAddress(selectedAddress) }}</span>
              <span>&nbsp;收货人：&nbsp;<em>{{ selectedAddress.name }}</em>&nbsp;<em>{{ selectedAddress.mobile }}</em></span>
            </div>
          </div>
          <div class="bill-btn-ckt">
            <a href="javascript:;" class="bill_btn" @click="handleCreateTrade">提交订单</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Input,Button } from 'element-ui'
  Vue.use(Input)
  Vue.use(Button)
  import { mapGetters, mapActions } from 'vuex'
  import CheckoutAddress from './-checkout-address'
  import CheckoutPayment from './-checkout-payment'
  import CheckoutInventory from './-checkout-inventory'
  import CheckoutTime from './-checkout-time'
  import CheckoutTotal from './-checkout-total'
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout-index',
    components: {
      CheckoutAddress,
      CheckoutPayment,
      CheckoutInventory,
      CheckoutTime,
      CheckoutTotal
    },
    data() {
      return {
        // 结算参数
        params: '',
        // 订单总金额
        orderTotal: {},
        // 当前已选的地址
        selectedAddress: '',
        // 购物清单
        inventoryList: []
      }
    },
    mounted() {
      // 获取购物清单
      API_Trade.getCarts('checked').then(response => {
        this.inventoryList = response
        if (response.length === 0) return
        // 获取默认结算数据
        API_Trade.getCheckoutParams().then(response => this.params = response)
        // 获取订单金额
        API_Trade.getOrderTotal().then(response => this.orderTotal = response)
      })
    },
    methods: {
      /** 格式化地址信息 */
      formatterAddress(address) {
        return `${address.province} ${address.city} ${address.county} ${address.town} ${address.addr}`
      },
      /** 收货地址选择 */
      handleAddressSelect(address) {
        this.params.address_id = address.addr_id
        this.selectedAddress = address
      },
      /** 提交订单 */
      handleCreateTrade() {
        /** 先调用创建订单接口，再跳转到收银台 */
        API_Trade.createTrade().then(response => {
          this.$router.push({ path: '/checkout/cashier' })
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/checkout";
</style>
