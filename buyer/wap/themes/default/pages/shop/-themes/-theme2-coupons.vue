<template>
  <div v-if="coupons && coupons.length" id="theme1-coupons" class="shop-coupons">
    <div class="shop-coupons-title">
      <h2>领</h2>
      <h3>
        <span>券后买更优惠</span>
        <i>RECEIVE-COUPON</i>
      </h3>
    </div>
    <ul class="shop-coupons-list">
      <li v-for="(coupon, index) in coupons" :key="index" class="coupon-item" @click="handleReceiveCoupon(coupon)">
        <div class="coupon-box">
          <div class="coupon-price">{{ coupon.coupon_price }}</div>
          <div class="coupon-name">
            <h2>优惠券</h2>
            <p>{{ coupon.title }}</p>
          </div>
          <div class="coupon-receive">领</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import mixin from './themeCouponsMixin'

  export default {
    name: 'theme-2-coupons',
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
