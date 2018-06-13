<template>
  <div id="checkout">
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
          @change="(id) => { params.address_id = id}"
        />
        <!--收货人信息 end-->

        <!--支付方式 start-->
        <checkout-payment
          :payment-type="params.payment_type"
          @change="(type) => { params.payment_type = type }"
        />
        <!--支付方式 end-->

        <!--配送清单 start-->
        <checkout-inventory :remark="params.remark"/>
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
        <div class="total-ckt-total">
          <div class="details-ckt-total">
            <ul class="ul-details-ckt-total">
              <li>
                <span class="title-details-ckt-total">商品总金额：</span>
                <em class="price-details-ckt-total">￥12,485.00</em>
                <div class="clear-details-ckt-total"></div>
              </li>
              <li class="li_discount_price">
                <span class="title-details-ckt-total">优惠金额：</span>
                <em class="price-details-ckt-total">-￥0.00</em>
                <div class="clear-details-ckt-total"></div>
              </li>
              <li>
                <span class="title-details-ckt-total">运费总计：</span>
                <em class="price-details-ckt-total">￥0.00</em>
                <div class="clear-details-ckt-total"></div>
              </li>
            </ul>
          </div>
          <div class="summary-ckt-total">
            <div class="amounts-payable-ckt">
              <span class="title-details-ckt-total amounts">应付金额：</span>
              <em class="price-details-ckt-total amounts">￥12,485.00</em>
              <div class="clear-details-ckt-total"></div>
            </div>
          </div>            </div>
        <div class="summary-ckt-total">
          <div class="address-info-ckt">
            <span>收货人信息：</span>
            <span id="address-info">河北 石家庄市 辛集市 辛集镇 12312313</span>
            <span>&nbsp;收货人：&nbsp;<em id="address-name">王先生</em>&nbsp;<em id="address-mobile">13333333333</em></span>
          </div>
        </div>
        <div class="bill-btn-ckt">
          <a href="javascript:;" class="bill_btn" @click="handleCreateTrade">提交订单</a>
        </div>
      </div>
    </div>
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
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout-index',
    components: {
      CheckoutAddress,
      CheckoutPayment,
      CheckoutInventory,
      CheckoutTime
    },
    data() {
      return {
        params: ''
      }
    },
    mounted() {
      // 获取默认结算数据
      API_Trade.getCheckoutParams().then(response => this.params = response)
    },
    methods: {
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
