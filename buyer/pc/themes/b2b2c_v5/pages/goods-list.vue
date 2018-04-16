<template>
  <div id="goods-list" style="background-color: #ededed">
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
      handleBarMouse(event) {
        console.log(event)
      },
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
</style>
