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
      <div class="ckt-control">
        <div class="ckt-title">填写并核对订单信息</div>
        <div class="ckt-content">
          <!--收货人信息 start-->
          <checkout-address
            :address-id="params.address_id"
            @change="(id) => { params.address_id = id }"
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
          <checkout-receipt/>
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
  import * as CheckoutComponents from './'
  import * as API_Trade from '@/api/trade'
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
        inventoryList: ''
      }
    },
    computed: {
      // 当前已选的地址
      selectedAddress() {
        const _sd = this.$store.getters.address.filter(item => item.addr_id === this.params.address_id)
        return _sd ? _sd[0] : ''
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
