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
  .shop-coupons {
    width: 950px;
    margin: 20px auto;
  }
  .shop-coupons-title {
    width: 100%;
    height: 90px;
    background: url("../../../assets/images/background-shop-coupons-title.png") no-repeat center center #fffbfb;
  }
  .shop-coupons-list {
    width: 100%;
    margin-top: 10px;
    background: #fff;
    text-align: center;
    overflow: hidden;
  }
  .coupon-item {
    width: 230px;
    display: inline-block;
    cursor: pointer;
    border: 1px dashed rgb(222, 222, 222);
    margin-right: 10px;
    .coupon-price {
      float: left;
      font-family: georgia;
      font-size: 48px;
      height: 108px;
      letter-spacing: -6px;
      line-height: 110px;
      text-align: center;
      width: 110px;
      color: #424242;
      cursor: pointer;
    }
    .coupon-name {
      float: left;
      height: 40px;
      padding: 68px 0 0 0;
      background: url("../../../assets/images/icon-shop-coupons.png") no-repeat left 40px;
      width: 115px;
      text-align: left;
    }
  }
</style>
