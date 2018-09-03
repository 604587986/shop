<template>
  <div id="my-coupons">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">
          <a href="./my-coupons">我的优惠券</a>
        </li>
      </ul>
    </div>
    <div class="coupons-container">
      <ul v-if="coupons && coupons.data_total" class="coupon-list">
        <li v-for="(coupon, index) in coupons.data" :key="index" class="coupon-item" :class="[coupon.used_status === 1 && 'used']">
          <div class="c-type">
            <div class="c-money">
              <span>￥</span>
              <strong>{{ coupon.coupon_price | unitPrice }}</strong>
            </div>
            <div class="c-limit">
              满￥{{ coupon.coupon_threshold_price | unitPrice }}可用
            </div>
            <div class="c-time">
              {{ coupon.start_time | unixToDate('yyyy-MM-dd') }} - {{ coupon.end_time | unixToDate('yyyy-MM-dd') }}
            </div>
          </div>
          <div class="c-othr">
            <span v-if="coupon.used_status === 1">已使用</span>
            <nuxt-link v-else :to="'/shop/' + coupon.seller_id" class="use-btn">立即使用</nuxt-link>
          </div>
          <i class="is-used"></i>
        </li>
      </ul>
      <empty-member v-else>暂无优惠券</empty-member>
      <span class="clr"></span>
      <div class="member-pagination" v-if="coupons">
        <el-pagination
          v-if="coupons.data_total"
          @current-change="handleCurrentPageChange"
          :current-page.sync="params.page_no"
          :page-size="params.page_size"
          layout="total, prev, pager, next"
          :total="coupons.data_total">
        </el-pagination>
      </div>
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
        coupons: '',
        params: {
          page_no: 1,
          page_size: 8
        }
      }
    },
    mounted() {
      this.GET_Coupons()
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentPageChange(page) {
        this.params.page_no = page
        this.GET_Coupons()
      },
      GET_Coupons() {
        API_Members.getCoupons(this.params).then(response => {
          this.coupons = response
          this.MixinScrollToTop()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .coupons-container {
    padding-top: 10px;
  }
  .coupon-item {
    float: left;
    position: relative;
    width: 227px;
    margin: 0 20px 20px 0;
    &.used {
      filter: grayscale(100%);
      .is-used {
        display: block;
      }
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    .c-type {
      position: relative;
      background-color: #ff5e5e;
      height: 125px;
      padding-top: 30px;
      color: #fff;
      overflow: hidden;
      text-align: center;
      background-image:
        -webkit-gradient(linear, 50% 0, 0 100%, from(transparent),
          color-stop(.5,transparent),
          color-stop(.5,#f9f9f9),
          to(#f9f9f9)),
        -webkit-gradient(linear,50% 0,100% 100%,from(transparent),
          color-stop(.5,transparent),
          color-stop(.5,#f9f9f9),
          to(#f9f9f9));
      background-size:12px 6px;
      background-repeat:repeat-x;
      background-position:0 100%;
      &:before, &:after {
        content: ' ';
        position: absolute;
        top: 50%;
        margin-top: -35px;
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 100%;
      }
      &:before { left: -20px }
      &:after { right: -20px }
    }
    .c-money {
      span { font-size: 18px }
      strong {
        line-height: 45px;
        font-size: 40px;
        font-family: Arial;
        margin-left: 3px;
      }
    }
    .c-limit {
      height: 40px;
      line-height: 22px;
      overflow: hidden;
      margin: 0 5px 5px;
    }
    .c-time {
      font-family: Verdana;
    }
    .c-othr {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 75px;
      background-color: #fff;
      box-shadow: 0 2px 10px 0 #ccc;
      .use-btn {
        display: block;
        width: 100px;
        line-height: 28px;
        text-align: center;
        color: #ff5d5e;
        border-radius: 15px;
        cursor: pointer;
        border: 1px solid #ff6966;
        transition: all .2s ease;
        font-weight: 500;
        &:hover {
          background-color: #ff6966;
          color: #fff;
        }
      }
    }
    .is-used {
      display: none;
      position: absolute;
      z-index: 10;
      top: 0;
      right: 20px;
      width: 120px;
      height: 120px;
      background: url("data:image/png;base64,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") no-repeat;
      background-size: 100%;
    }
  }
</style>
