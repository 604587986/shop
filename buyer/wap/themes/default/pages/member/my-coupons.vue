<template>
  <div id="my-coupons">
    <nav-bar title="我的优惠券"/>
    <van-tabs v-model="tabActive" :line-width="100">
      <van-tab title="可用优惠券"/>
      <van-tab title="不可用优惠券"/>
    </van-tabs>
    <div class="coupons-container">
      <empty-member v-if="finished && !couponsList.length">暂无优惠券</empty-member>
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <div class="coupon-item content-unavailable show" v-for="(coupon, index) in couponsList" :key="index">
          <div class="inner-coupon" :class="[tabActive === 1 && 'unavailable']">
            <div class="par">
              <p>{{ coupon.title }}</p>
              <sub class="sign">￥</sub><span>{{ coupon.coupon_price | unitPrice }}</span>
              <p>订单满{{ coupon.coupon_threshold_price | unitPrice }}元</p>
            </div>
            <div class="copy">副券
              <p>{{ coupon.start_time | unixToDate('yyyy-MM-dd') }}</p>
              <p>至</p>
              <p>{{ coupon.end_time | unixToDate('yyyy-MM-dd') }}</p>
            </div>
            <i></i>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import * as API_Members from '@/api/members'
  export default {
    name: 'my-coupons',
    head() {
      return {
        title: `我的优惠券-${this.site.site_name}`
      }
    },
    data() {
      return {
        tabActive: 0,
        couponsList: [],
        loading: false,
        finished: false,
        params: {
          page_no: 1,
          page_size: 10,
          status: 1
        }
      }
    },
    mounted() {
      this.GET_Coupons()
    },
    watch: {
      tabActive(newVal) {
        this.params.status = newVal === 0 ? 1 : 2
        this.finished = false
        this.params.page_no = 1
        this.couponsList = []
        this.GET_Coupons()
      }
    },
    methods: {
      onLoad(page) {
        this.params.page_no += 1
        this.GET_Coupons()
      },
      GET_Coupons() {
        this.loading = true
        API_Members.getCoupons(this.params).then(response => {
          this.loading = false
          const { data } = response
          if (!data || !data.length) {
            this.finished = true
          } else {
            this.couponsList.push(...data)
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
  .coupon-item {
    position: relative;
    width: 100%;
    list-style: none;
    font-family: "Microsoft YaHei", 'Source Code Pro', Menlo, Consolas, Monaco, monospace;
  }
  .inner-coupon {
    position: relative;
    padding: 0 10px;
    height: 98px;
    margin: 10px;
    overflow: hidden;
    background: $color-main;
    background: radial-gradient(transparent 0, transparent 5px, $color-main 5px);
    background-size: 15px 15px;
    background-position: 9px 3px;
    &.unavailable {
      background: #7a7a7a;
      background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #7a7a7a 5px);
      background-size: 15px 15px;
      background-position: 9px 3px;
      &::before {
        background-color: #7a7a7a;
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10px;
      right: 10px;
      z-index: -1;
      background-color: $color-main;
    }
    &::after {
      content: '';
      position: absolute;
      left: 10px;
      top: 10px;
      right: 10px;
      bottom: 10px;
      box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);
      z-index: -2;
    }
    .par {
      float: left;
      padding: 12px 12px;
      width: 53%;
      border-right: 2px dashed rgba(255, 255, 255, .3);
      text-align: left;
       p {
         color: #fff;
         font-size: 12px;
         line-height: 12px;
       }
      sub {
        position: relative;
        top: -2px;
        color: rgba(255, 255, 255, .8);
      }
      span {
        font-size: 30px;
        color: #fff;
        margin-right: 5px;
        line-height: 45.5px;
      }
      .sign {
        font-size: 34px;
      }
    }
    .copy {
      display: inline-block;
      padding: 15px 10px;
      width: 30%;
      font-size: 25px;
      color: rgb(255, 255, 255);
      text-align: center;
      line-height: initial;
      p {
        font-size: 12px;
        color: #fff;
        line-height: 13px;
      }
    }
    i {
      position: absolute;
      left: 20%;
      top: 45px;
      height: 190px;
      width: 390px;
      background-color: rgba(255, 255, 255, .15);
      transform: rotate(-30deg);
    }
  }
</style>
