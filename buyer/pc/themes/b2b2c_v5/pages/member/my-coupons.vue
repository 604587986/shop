<template>
  <div id="my-coupons">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">我的优惠券</li>
      </ul>
    </div>
    <div class="coupons-container">
      <ul class="coupon-list">
        <li v-for="coupon in coupons.data" :key="coupon.coupon_id" class="coupon-item">
          <div class="c-type">
            <div class="c-money">
              <span>￥</span>
              <strong>{{ coupon.coupon_money }}</strong>
            </div>
            <div class="c-limit">
              满{{ coupon.coupon_limit_money }}可用
            </div>
            <div class="c-time">
              {{ coupon.coupon_start_date }} - {{ coupon.coupon_end_date }}
            </div>
          </div>
          <div class="c-othr">
            <nuxt-link :to="'/shop/' + coupon.shop_id" class="use-btn">立即使用</nuxt-link>
          </div>
        </li>
      </ul>
      <span class="clr"></span>
      <div class="member-pagination" v-if="coupons">
        <el-pagination
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
  import * as API_Coupons from '@/api/coupons'
  export default {
    name: 'my-coupons',
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
        API_Coupons.getCoupons(this.params).then(response => {
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
  }
</style>
