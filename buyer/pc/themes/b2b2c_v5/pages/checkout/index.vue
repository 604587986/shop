<template>
  <div id="checkout">
    <div v-if="inventoryList && inventoryList.length === 0" class="listing-empty">
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
      <div v-if="params" class="ckt-control">
        <div class="ckt-title">填写并核对订单信息</div>
        <div class="ckt-content">
          <!--收货人信息 start-->
          <checkout-address
            :address-id="params.address_id"
            @change="handleAddressChanged"
          />
          <!--收货人信息 end-->

          <!--支付方式 start-->
          <checkout-payment
            :payment-type="params.payment_type"
            @change="(type) => { params.payment_type = type }"
          />
          <!--支付方式 end-->

          <!--配送清单 start-->
          <checkout-inventory
            :inventory-list="inventoryList"
            :remark="params.remark"
            @coupon-change="couponUseChange"
          />
          <!--配送清单 end-->

          <!--送货时间 start-->
          <checkout-time
            :receive-time="params.receive_time"
            @change="(time) => { params.receive_time = time }"
          />
          <!--送货时间 end-->

          <!--发票信息 start-->
          <checkout-receipt :receipt="params.receipt || {}" @change="(receipt) => { params.receipt = receipt }"/>
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
  import { Input } from 'element-ui'
  Vue.use(Input)
  import { mapGetters, mapActions } from 'vuex'
  import * as CheckoutComponents from './'
  import * as API_Trade from '@/api/trade'
  import * as API_Members from '@/api/members'
  export default {
    name: 'checkout-index',
    components: CheckoutComponents,
    data() {
      return {
        // 结算参数
        params: '',
        // 订单总金额
        orderTotal: {},
        // 购物清单
        inventoryList: '',
        // 缓存优惠券列表
        coupons: '',
        // 已选地址
        selectedAddress: ''
      }
    },
    mounted() {
      // 获取购物清单
      API_Trade.getCarts('checked').then(response => {
        this.inventoryList = response
        this.GET_ShopCoupons()
        if (response.length === 0) return
        // 获取默认结算数据
        API_Trade.getCheckoutParams().then(response => this.params = response)
        // 获取订单金额
        API_Trade.getOrderTotal().then(response => this.orderTotal = response)
      })
    },
    methods: {
      /** 使用优惠券 */
      couponUseChange(shopIndex, couponIndex, use) {
        const inventoryList = JSON.parse(JSON.stringify(this.inventoryList))
        inventoryList.map(item => {
          item.coupons.map(_item => {
            _item.used_status = 0
          })
        })
        if (use) {
          inventoryList[shopIndex]['coupons'][couponIndex].used_status = 1
        }
        API_Trade.getOrderTotal().then(response => this.orderTotal = response)
        API_Trade.getCarts('checked').then(response => {
          response.map((item, index) => {
            item.coupons = inventoryList[index].coupons
          })
          this.$set(this, 'inventoryList', response)
        })
      },
      /** 收货地址发生改变 */
      handleAddressChanged(address) {
        this.selectedAddress = address
        this.params.address_id = address.addr_id
      },
      /** 格式化地址信息 */
      formatterAddress(address) {
        return `${address.province} ${address.city} ${address.county} ${address.town} ${address.addr}`
      },
      /** 提交订单 */
      handleCreateTrade() {
        /** 先调用创建订单接口，再跳转到收银台 */
        API_Trade.createTrade().then(response => {
          this.$router.push({ path: '/checkout/cashier?trade_sn=' + response.trade_sn })
        })
      },
      /** 获取可用店铺优惠券 */
      GET_ShopCoupons() {
        const { inventoryList } = this
        const seller_ids = inventoryList.map(item => item.seller_id)
        API_Members.getShopsCoupons(seller_ids.join(',')).then(_response => {
          this.coupons = _response
          const _inventoryList = inventoryList.map((item, ivIndex) => {
            item.coupons = _response[ivIndex].member_coupon_list
            return item
          })
          this.$set(this, 'inventoryList', _inventoryList)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/checkout";
</style>
