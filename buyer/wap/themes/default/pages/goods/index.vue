<template>
  <div>
    <van-nav-bar left-arrow @click-left="MixinRouterBack">
      <div slot="title">
        <div class="search-box" @click="showSearch = true">
          <van-icon name="search"/>
          <span>{{ params.keyword || '搜索商品' }}</span>
        </div>
      </div>
      <header-shortcut slot="right"/>
    </van-nav-bar>
    <search :show="showSearch" @close="showSearch = false"/>
    <!--// Andste_TODO 2018/7/11: 筛选功能未做-->
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <a :href="'/goods/' + goods.goods_id" v-for="(goods, index) in goodsList" :key="index" class="goods-item">
        <div class="goods-image">
          <img :src="goods.thumbnail" :alt="goods.name">
        </div>
        <div class="goods-info">
          <div class="goods-name">{{ goods.name }}</div>
          <div class="goods-price">
            <em>￥</em>{{ goods.price | unitPrice('', 'before') }}<em>.{{ goods.price | unitPrice('', 'after') }}</em>
          </div>
          <div class="goods-other">
            <span>{{ goods.buy_count || 0 }}人已购买</span>
            <span>&nbsp;{{ goods.comment_num || 0 }}条评论</span>
          </div>
          <div class="goods-shop">
            <nuxt-link :to="'/shop/' + goods.seller_id"><van-icon name="shop"/>&nbsp;{{ goods.seller_name }}</nuxt-link>
          </div>
        </div>
      </a>
    </van-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { List } from 'vant'
  Vue.use(List)
  import * as API_Goods from '@/api/goods'
  export default {
    name: 'goods-list',
    data() {
      return {
        // 显示搜索盒子
        showSearch: false,
        // 显示快捷导航盒子
        showShortcutBox: false,
        // 加载中
        loading: false,
        // 是否加载完成
        finished: false,
        // 商品列表
        goodsList: [],
        // 分页参数
        page: {
          page_no: 0,
          page_size: 20
        },
        // 筛选参数
        params: { ...this.$route.query },
        // 是否为双列模式
        doubleCol: false
      }
    },
    beforeRouteUpdate (to, from, next) {
      const { ...props } = to.query
      this.params = props
      this.onLoad()
      next()
    },
    methods: {
      /** 加载数据 */
      onLoad() {
        this.page.page_no += 1
        this.GET_GoodsList()
      },
      /** 获取商品列表 */
      GET_GoodsList() {
        const params = { ...this.page, ...this.params }
        Object.keys(params).forEach(key => {
          if (!params[key]) delete params[key]
        })
        this.loading = true
        API_Goods.getGoodsList(params).then(response => {
          this.loading = false
          const { data } = response
          if (!data || !data.length) {
            this.finished = true
          } else {
            this.goodsList.push(...data)
          }
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ {
    .van-nav-bar__left .van-nav-bar__arrow { color: #666 }
    .van-nav-bar__title { max-width: 75% }
    .search-box {
      display: -webkit-box;
      width: 100%;
      border: none;
      border-radius: 15px;
      height: 30px;
      overflow: hidden;
      background: #f7f7f7;
      font-size: 12px;
      -webkit-box-align: center;
      line-height: 30px;
      position: relative;
      margin-top: 8px;
      .van-icon-search {
        color: #B7B7B7;
        margin: 0 10px;
        font-size: 16px;
      }
    }
  }
  .goods-item {
    display: flex;
    position: relative;
    padding: 5px 0;
  }
  .goods-image {
    width: 120px;
    height: 120px;
    margin-left: 10px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods-info {
    width: 100%;
    min-height: 120px;
    padding: 10px;
    box-sizing: border-box;
    .goods-name {
      font-size: 14px;
      color: #333;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 38px;
    }
    .goods-price {
      color: #f42424;
      font-size: 18px;
      font-weight: 400;
      margin-top: 13px;
      em {
        font-size: 12px;
      }
    }
    .goods-other{ color: #999 }
    .goods-shop {

    }
  }
</style>
