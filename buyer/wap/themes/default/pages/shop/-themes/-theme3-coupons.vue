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
        <h2>{{ coupon.coupon_price }}</h2>
        <p>{{ coupon.title }}</p>
        <span>{{ coupon.start_time | unixToDate('yyyy-MM-dd') }} - {{ coupon.end_time | unixToDate('yyyy-MM-dd') }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import mixin from './themeCouponsMixin'

  export default {
    name: 'theme-3-coupons',
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
