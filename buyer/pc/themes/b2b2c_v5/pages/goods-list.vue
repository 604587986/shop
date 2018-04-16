<template>
  <div id="goods-list" style="background-color: #ededed;padding-bottom: 20px">
    <div class="gl-container w">
      <div class="gl-bar-title">
        <span>全部<i class="iconfont ea-icon-arrow-right"></i></span>
        <div class="gl-bar-item">
          <nuxt-link to="#" class="gl-bar-trigger">
            <span>数码家电</span>
            <i class="iconfont ea-icon-arrow-right"></i>
          </nuxt-link>
          <div class="gl-bar-content">
            <ul class="clearfix">
              <li><a class="int" href="/goods-list?cat_id=491">数码家电</a></li>
              <li><a href="/goods-list?cat_id=1">食品饮料</a></li>
              <li><a href="/goods-list?cat_id=4">进口食品</a></li>
              <li><a href="/goods-list?cat_id=38">美容化妆</a></li>
              <li><a href="/goods-list?cat_id=56">母婴玩具</a></li>
              <li><a href="/goods-list?cat_id=79">厨房用品</a></li>
              <li><a href="/goods-list?cat_id=35">钟表箱包</a></li>
              <li><a href="/goods-list?cat_id=85">营养保健</a></li>
              <li><a href="/goods-list?cat_id=86">服装鞋靴</a></li>
            </ul>
          </div>
        </div>
        <i class="iconfont ea-icon-arrow-right"></i>
        <div class="gl-bar-item">
          <nuxt-link to="#" class="gl-bar-trigger">
            <span>数码家电</span>
            <i class="iconfont ea-icon-arrow-right"></i>
          </nuxt-link>
          <div class="gl-bar-content">
            <ul class="clearfix">
              <li><a class="int" href="/goods-list?cat_id=491">母婴玩具</a></li>
              <li><a href="/goods-list?cat_id=1">母婴玩具</a></li>
              <li><a href="/goods-list?cat_id=4">食品饮料</a></li>
              <li><a href="/goods-list?cat_id=38">美容化妆</a></li>
              <li><a href="/goods-list?cat_id=56">母婴玩具</a></li>
              <li><a href="/goods-list?cat_id=79">厨房用品</a></li>
              <li><a href="/goods-list?cat_id=35">钟表箱包</a></li>
              <li><a href="/goods-list?cat_id=85">营养保健</a></li>
              <li><a href="/goods-list?cat_id=86">服装鞋靴</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="gl-select-condition">
        <dl class="brand logo-brand">
          <dt>品牌:</dt>
          <dd>
            <div class="small-list brand-list">
              <ul class="show-logo">
                <li class="">
                  <a href="goods_list.html?cat=1&amp;brand=2" title="新农哥">
                    <img class="lazy" src="http://static.v4.javamall.com.cn/attachment/brand/201202211143461491.jpg" data-original="http://static.v4.javamall.com.cn/attachment/brand/201202211143461491.jpg" alt="新农哥" style="display: block;">新农哥
                  </a>
                </li>
                <li class="">
                  <a href="goods_list.html?cat=1&amp;brand=11" title="德芙">
                    <img class="lazy" src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/C13CB8F002EF4BEE82F4A9BA875FCB45.jpg" data-original="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/C13CB8F002EF4BEE82F4A9BA875FCB45.jpg" alt="德芙" style="display: block;">德芙
                  </a>
                </li>
                <li class="">
                  <a href="goods_list.html?cat=1&amp;brand=13" title="百事">
                    <img class="lazy" src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/5D971CEA5BBC4892863D9BC707239661.jpg" data-original="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/5D971CEA5BBC4892863D9BC707239661.jpg" alt="百事" style="display: block;">百事
                  </a>
                </li>
                <li class="">
                  <a href="goods_list.html?cat=1&amp;brand=3" title="洽洽">
                    <img class="lazy" src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/46315F247154475CACA0A3287AF94B16.jpg" data-original="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/46315F247154475CACA0A3287AF94B16.jpg" alt="洽洽" style="display: block;">洽洽
                  </a>
                </li>
              </ul>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>价格:</dt>
          <dd>
            <div class="small-list">
              <a href="goods_list.html?price=_5&amp;cat=1">5元以下</a>
              <a href="goods_list.html?price=5_10&amp;cat=1">5-10元</a>
              <a href="goods_list.html?price=10_20&amp;cat=1">10-20元</a>
              <a href="goods_list.html?price=20_50&amp;cat=1">20-50元</a>
              <a href="goods_list.html?price=50_100&amp;cat=1">50-100元</a>
              <a href="goods_list.html?price=100_200&amp;cat=1">100-200元</a>
              <a href="goods_list.html?price=200_500&amp;cat=1">200-500元</a>
              <a href="goods_list.html?price=500_1000&amp;cat=1">500-1000元</a>
              <a href="goods_list.html?price=1000_&amp;cat=1">1000元以上</a>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>分类:</dt>
          <dd>
            <div class="small-list">
              <a href="goods_list.html?cat=1_2_7">蜜饯</a>
              <a href="goods_list.html?cat=1_2">休闲零食 </a>
              <a href="goods_list.html?cat=1_13_14">碳酸饮料</a>
              <a href="goods_list.html?cat=1_3_10">巧克力</a>
              <a href="goods_list.html?cat=1_18_19">白酒</a>
              <a href="goods_list.html?cat=1_377">牛奶乳品</a>
              <a href="goods_list.html?cat=1_288_290">普洱</a>
              <a href="goods_list.html?cat=1_288_289">铁观音</a>
              <a href="goods_list.html?cat=1_2_306">牛肉干</a>
              <a href="goods_list.html?cat=1_2_6">坚果</a>
              <a href="goods_list.html?cat=1_18_21">洋酒</a>
              <a href="goods_list.html?cat=1_18_168">葡萄酒</a>
              <a href="goods_list.html?cat=1_377_380">儿童奶</a>
            </div>
          </dd>
        </dl>
      </div>
      <div class="gl-sku-box">
        <div class="gl-sku-filter">
          <div class="btns">
            <nuxt-link to="#" class="active">默认<i class="iconfont ea-icon-arrow-down3"></i></nuxt-link>
            <nuxt-link to="#">销量<i class="iconfont ea-icon-arrow-down3"></i></nuxt-link>
            <nuxt-link to="#">价格<i class="iconfont ea-icon-arrow-down3"></i></nuxt-link>
            <nuxt-link to="#">评价<i class="iconfont ea-icon-arrow-down3"></i></nuxt-link>
          </div>
          <div class="price">
            <div class="p-c-b">
              <span><em>￥</em><input type="text" class="custom-pro" maxlength="5"></span>
              <i></i>
              <span><em>￥</em><input type="text" class="custom-pro" maxlength="5"></span>
              <a href="javascript:;" class="empty-pro">清空</a>
              <a href="javascript:;" class="enter-pro">确定</a>
            </div>
          </div>
        </div>
        <div class="gl-sku-list"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_GoodsList from '@/api/goods'
  export default {
    name: 'goods-list',
    data() {
      return {
        params: {
          keyword: '',
          page_no: 1,
          page_size: 20
        },
        goodsList: []
      }
    },
    mounted() {
      this.GET_GoodsList({keyword: this.$route.query.keyword})
    },
    watch: {
      $route() {
        console.log(this.$route.query)
      }
    },
    methods: {
      GET_GoodsList(params) {
        API_GoodsList.getGoodsList({...this.params, ...params}).then(response => {
          this.goodsList = response.data
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .gl-container {
    .iconfont {
      font-size: 12px;
      transition: all .3s ease;
      display: inline-block;;
    }
  }
  .gl-bar-title {
    font-size: 12px;
    color: #666;
    padding: 25px 0 16px 0;
    line-height: 19px;
    position: relative;
    z-index: 2;
  }
  .gl-bar-item {
    display: inline;
    &:hover {
      .gl-bar-content { display: block }
      .gl-bar-trigger {
        background: #fff;
        border-color: #ccc;
        border-bottom-color: #fff;
        .iconfont {
          transform: rotate(-90deg);
        }
      }
    }
  }
  .gl-bar-trigger {
    display: inline-block;
    position: relative;
    z-index: 2;
    color: #666;
    padding: 0 7px;
    height: 19px;
    border: 1px solid transparent;
    .iconfont { transform: rotate(90deg) }
  }
  .gl-bar-content {
    display: none;
    position: absolute;
    z-index: 1;
    left: 0;
    margin-top: -1px;
    width: 1188px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 13px rgba(204, 204, 204, 1);
    cursor: auto;
    ul { padding: 22px 0 16px 40px }
    li {
      float: left;
      margin-bottom: 8px;
      height: 26px;
      line-height: 26px;
      margin-right: 50px;
      a { color: #666 }
      a:hover { color: #f42424 }
    }
  }
  .gl-select-condition {
    box-shadow: rgb(204, 204, 204) 0 2px 5px;
    background-color: #fff;
    width: 1190px;
    dl {
      border-bottom: 1px dashed #ededed;
      min-height: 46px;
      clear: both;
      position: relative;
      overflow: hidden;
      background: #f5f5f5;
    }
    dt {
      width: 80px;
      padding-left: 30px;
      line-height: 45px;
      color: #666;
      float: left;
    }
    dd {
      padding-left: 10px;
      width: 1070px;
      min-height: 46px;
      background: #fff;
      float: left;
    }
    .small-list {
      overflow: hidden;
      a {
        display: inline-block;
        margin: 12px 0 0;
        height: 22px;
        padding: 0 22px 0 10px;
        white-space: nowrap;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
        &:hover { color: #f42424 }
      }
    }
    .brand-list {
      margin: 17px 0;
      padding-top: 1px;
      max-height: 207px;
      height: auto;
    }
    .show-logo {
      li {
        float: left;
        border: 1px solid #ededed;
        width: 98px;
        text-align: center;
        height: 68px;
        line-height: 98px;
        overflow: hidden;
        margin: 0;
        margin-right: -1px;
        margin-top: -1px;
        a {
          display: block;
          padding: 0;
          position: static;
          margin: 0;
          height: 68px;
          width: 96px !important;
          line-height: 68px;
          color: #666;
          border: 1px solid transparent;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          zoom: 1;
        }
        img {
          width: 80px;
          height: 53px;
          margin: 8px;
        }
      }
    }
  }
  .gl-sku-box {
    width: 1190px;
    margin: 35px auto;
    overflow: hidden;
    box-shadow: rgb(204, 204, 204) 0 2px 5px;
    .gl-sku-filter {
      display: flex;
      align-items: center;
      position: relative;
      height: 45px;
      background-color: #f5f5f5;
      .btns {
        margin-left: 30px;
        .iconfont {
          transform: rotate(-180deg);
        }
        a {
          display: inline-block;
          background: #fff;
          width: 65px;
          height: 22px;
          position: relative;
          text-align: center;
          border: 1px solid #ededed;
          font-size: 12px;
          margin-left: -1px;
          line-height: 22px;
          z-index: 1;
          color: #666;
          &.active {
            background: #e93b39;
            border-color: #e93b39;
            color: #fff;
          }
        }
      }
      .price {
        width: 124px;
        overflow: hidden;
        margin-left: 15px;
        text-align: center;
        &:hover {
          overflow: inherit;
          align-self: end;
          .p-c-b {
            background: #ededed;
            padding-top: 10px;
            height: 64px;
            position: relative;
            z-index: 3;
            overflow: visible;
          }
        }
        .p-c-b {
          height: 24px;
          overflow: hidden;
        }
        span {
          display: inline-block;
          width: 45px;
          height: 22px;
          border: 1px solid #ededed;
          background-color: #fff;
          background-position: 3px -281px;
          text-align: right;
        }
        em { margin-right: 2px }
        input {
          width: 33px;
          height: 14px;
          border: 0 none;
          margin-top: 4px;
        }
        i {
          display: inline-block;
          border-top: 1px solid #acacac;
          width: 8px;
          margin: 0 1px;
          height: 3px;
          vertical-align: middle;
        }
        a {
          display: inline-block;
          width: 45px;
          height: 18px;
          font-size: 12px;
          line-height: 18px;
          margin: 10px 0;
        }
        .empty-pro {
          border: 1px solid #e0e0e0;
          background: #fff;
          margin-right: 5px;
          color: #666;
        }
        .enter-pro {
          border: 1px solid #e93b39;
          background: #e93b39;
          margin-left: 5px;
          color: #fff;
        }
      }
    }
    .gl-sku-list {
      position: relative;
      background-color: #fff;
      min-height: 200px;
    }
  }
</style>
