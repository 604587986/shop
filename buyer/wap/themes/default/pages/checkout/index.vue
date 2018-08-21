<template>
  <div id="checkout" style="background-color: #f7f7f7">
    <nav-bar fixed title="填写订单"/>
    <en-empty v-if="inventories.length === 0">
      购物清单为空
    </en-empty>
    <div v-else class="checkout-container">
      <!--收货地址 start-->
      <van-cell-group>
        <van-cell is-link to="/member/shipping-address?from=checkout">
          <div v-if="!address" class="no-address">新建或选择收货地址以确保商品顺利送达</div>
          <div v-else>
            <div class="tit-address">
              <div class="name-tit-address">{{ address.name }}</div>
              <div class="mobile-tit-address">{{ address.mobile }}</div>
            </div>
            <div class="cnt-address">
              <van-icon name="location"/>
              <span class="address-where">{{ formatterAddress() }}</span>
            </div>
          </div>
        </van-cell>
        <div class="address-list-hr"></div>
      </van-cell-group>
      <!--收货地址 end-->
      <van-cell-group>
        <!--购物清单 start-->
        <van-cell v-if="inventories.length > 1" is-link @click="showInventoryPopup = true">
          <div class="sku-list">
            <div v-for="(sku, index) in inventories" v-if="index < 4" :key="index" class="sku-item">
              <img :src="sku.goods_image">
              <p>x{{ sku.num }}</p>
            </div>
          </div>
          <div class="sku-count">共{{ inventories.length }}件</div>
        </van-cell>
        <van-cell v-else>
          单件
        </van-cell>
        <!--购物清单 end-->
        <!--支付配送 start-->
        <van-cell title="支付配送" is-link>
          <div>
            <p>在线支付</p>
            <p>任意时间</p>
          </div>
        </van-cell>
        <!--支付配送 end-->
        <!--发票信息 start-->
        <van-cell title="发票信息" is-link>
          不开发票
        </van-cell>
        <!--发票信息 end-->
      </van-cell-group>
      <van-cell-group>
        <!--优惠券 start-->
        <van-cell v-if="seller_ids.length" is-link @click="showCouponsPopup = true">
          <div slot="title">
            <span>优惠券</span>
            <em class="can-use-coupon-num">{{ coupon_num }}张可用</em>
          </div>
          <span v-if="!coupon_price">未使用</span>
          <span v-else>-￥{{ coupon_price | unitPrice }}</span>
        </van-cell>
        <!--优惠券 end-->
        <!--备注信息 start-->
        <van-cell title="备注信息" is-link>
          {{ params.remark || '未填写' }}
        </van-cell>
        <!--备注信息 end-->
      </van-cell-group>
      <van-cell-group class="price-cells">
        <van-cell title="商品金额">
          <span>￥{{ orderTotal.goods_price | unitPrice }}</span>
        </van-cell>
        <van-cell v-if="orderTotal.exchange_point" title="积分">
          <span>{{ orderTotal.exchange_point }}分</span>
        </van-cell>
        <van-cell title="优惠金额">
          <span>-￥{{ orderTotal.discount_price | unitPrice }}</span>
        </van-cell>
        <van-cell title="运费">
          <span>￥{{ orderTotal.freight_price | unitPrice }}</span>
        </van-cell>
      </van-cell-group>
    </div>
    <van-submit-bar
      :loading="loading"
      :price="orderTotal.total_price * 100"
      :disabled="submitDisabled"
      button-text="提交订单"
      tip="修改地址或支付方式后，请重新选择使用优惠券"
      @submit="handleCreateTrade"
    />
    <checkout-inventory
      v-if="inventories.length"
      :show="showInventoryPopup"
      :inventories="inventories"
      @close="showInventoryPopup = false"
    />
    <checkout-coupons
      v-if="seller_ids.length"
      :show="showCouponsPopup"
      :ids="seller_ids"
      @close="showCouponsPopup = false"
      @changed="handleCouponChanged"
      @loaded="(coupons_num) => { coupon_num = coupons_num  }"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import * as CheckoutComponents from './'
  import * as API_Trade from '@/api/trade'
  import * as API_Members from '@/api/members'
  import * as API_Address from '@/api/address'
  export default {
    name: 'checkout-index',
    components: CheckoutComponents,
    data() {
      return {
        // 加载订单结算中
        loading: false,
        // 结算参数
        params: '',
        // 订单总金额
        orderTotal: {
          discount_price: 0,
          exchange_point: 0,
          freight_price: 0,
          goods_price: 0,
          is_free_freight: 0,
          total_price: 0,
        },
        // 购物清单
        inventories: '',
        // 已选地址
        address: '',
        // 购物清单的店铺id集合
        seller_ids: [],
        // 显示优惠券弹窗
        showCouponsPopup: false,
        // 使用优惠券金额
        coupon_price: 0,
        // 优惠券张数
        coupon_num: 0,
        // 显示购物清单弹窗
        showInventoryPopup: false
      }
    },
    mounted() {
      // 获取购物清单
      this.loading = true
      API_Trade.getCarts('checked').then(async response => {
        const inventories = []
        const ids = []
        response.forEach(item => {
          ids.push(item.seller_id)
          inventories.push(...item.sku_list)
        })
        this.inventories = inventories
        this.seller_ids = ids
        if (!inventories.length) {
          this.loading = false
          return
        }
        // 获取默认结算数据
        await API_Trade.getCheckoutParams().then(response => this.params = response)
        const { address_id } = this.params
        if (address_id) {
          this.address = await API_Address.getAddressDetail(address_id)
        }
        // 获取订单金额
        await this.GET_TotalPrice()
        this.loading = false
      })
    },
    computed: {
      // 计算是否禁用提交订单按钮
      submitDisabled() {
        return !this.inventories.length
      }
    },
    methods: {
      /** 使用优惠券 */
      handleCouponChanged(coupon) {
        this.coupon_price = coupon.coupon_price
        // console.log(coupon)
        this.GET_TotalPrice()
      },
      /** 格式化地址信息 */
      formatterAddress() {
        const { address } = this
        if (!address) return ''
        return `${address.province} ${address.city} ${address.county} ${address.town} ${address.addr}`
      },
      /** 提交订单 */
      handleCreateTrade() {
        /** 先调用创建订单接口，再跳转到收银台 */
        API_Trade.createTrade().then(response => {
          this.$router.push({ path: '/checkout/cashier?trade_sn=' + response.trade_sn })
        })
      },
      /** 获取结算金额 */
      async GET_TotalPrice() {
        API_Trade.getOrderTotal().then(response => this.orderTotal = response)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
  .checkout-container {
    padding-top: 46px;
    /deep/ {
      .van-cell-group:not(:first-child) {
        margin-top: 10px;
      }
      .van-cell {
        align-items: center;
      }
    }
  }
  .no-address {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  }
  .address-list-hr {
    width: 100%;
    height: 5px;
    background: url(../../assets/images/icon-address-hr.png) repeat-x left top;
  }
  .tit-address {
    padding-bottom: 10px;
    overflow: hidden;
    color: #252525;
    .name-tit-address {
      float: left;
      font-size: 16px;
      color: #252525;
      font-weight: bold;
      margin-left: 23px;
    }
    .mobile-tit-address {
      float: left;
      font-size: 16px;
      margin-left: 4px;
    }
  }
  .cnt-address {
    padding-right: 10px;
    padding-left: 23px;
    font-size: 14px;
    color: #232326;
    line-height: 22px;
    position: relative;
    .van-icon-location {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 18px;
    }
    .address-where {
      color: #232326;
    }
  }
  .sku-list {
    float: left;
    padding-left: 0;
    padding-right: 2.5%;
    width: 80%;
    height: 70px;
    text-align: center;
    overflow: hidden;
    .sku-item {
      position: relative;
      width: 50px;
      height: 70px;
      float: left;
      margin-right: 7px;
      img {
        display: inline-block;
        width: 50px;
        height: 50px;
      }
    }
  }
  .sku-count {
    text-align: right;
    line-height: 70px;
  }
  .price-cells {
    .van-cell {
      padding: 3px 15px;
      &:after {
        content: none;
      }
    }
  }
  .can-use-coupon-num {
    display: inline-block;
    padding: 2px;
    font-size: 12px;
    background-color: #f42424;
    color: #fff;
    line-height: 12px;
    margin-left: 5px;
  }
</style>
