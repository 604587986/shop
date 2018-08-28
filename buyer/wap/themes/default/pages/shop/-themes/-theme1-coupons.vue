<template>
  <div v-if="coupons && coupons.length" id="theme1-coupons" class="shop-coupons">
    <div class="shop-coupons-title"></div>
    <ul class="shop-coupons-list">
      <li v-for="(coupon, index) in coupons" :key="index" class="coupon-item" @click="handleReceiveCoupon(coupon)">
        <div class="coupon-price">{{ coupon.coupon_price }}</div>
        <div class="coupon-name">{{ coupon.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import mixin from './themeCouponsMixin'
  export default {
    name: 'theme-1-coupons',
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
