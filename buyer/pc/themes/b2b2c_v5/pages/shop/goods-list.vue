<template>
  <div id="shop-goods-list" class="container">
    <template v-if="shop">
      <theme1-header v-if="shop.shop_theme === 1" :shop="shop"/>
      <theme2-header v-if="shop.shop_theme === 2" :shop="shop"/>
      <theme3-header v-if="shop.shop_theme === 3" :shop="shop"/>
    </template>
    <div class="sort-nav">
      <div class="inner w">
        <div class="left">
          <div class="inner-sort">
            <template v-for="sort in sortNav">
              <div class="item" :key="sort.title" :class="[sort.active && 'active', sort.sort]" @click="handleSortChanged(sort)">
                {{ sort.title }}<i class="iconfont ea-icon-arrow-down2"></i>
              </div>
            </template>
          </div>
          <div class="inner-price"></div>
        </div>
        <div class="inner-search">
          <el-input placeholder="店内搜索" size="mini" clearable v-model="params.keyword" @keyup.enter.native="handleSearch('shop')">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch('shop')"></el-button>
          </el-input>
          <el-button size="mini" type="danger" class="search-btn" @click="handleSearch('all')">搜全站</el-button>
        </div>
      </div>
    </div>
    <div class="goods-container">
      <div class="inner w">
        <ul class="goods-list">
          <li v-for="goods in goods.data" :key="goods.goods_id" class="goods-item">
            <div class="goods-image">
              <nuxt-link :to="'/goods/' + goods.goods_id">
                <img :src="goods.goods_image" :alt="goods.goods_name" :title="goods.goods_name">
              </nuxt-link>
            </div>
            <div class="goods-name">
              <nuxt-link :to="'/goods/' + goods.goods_id">{{ goods.goods_name }}</nuxt-link>
            </div>
            <div class="goods-price">
              <span>RMB：<span class="price">￥<strong>{{ goods.goods_price | unitPrice }}</strong></span></span>
              <span>已销售：{{ goods.buy_count }}件</span>
            </div>
          </li>
          <span class="clr"></span>
        </ul>
        <div v-if="goods" class="goods-pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="params.page_no"
            :page-size="params.page_size"
            layout="total, prev, pager, next"
            :total="goods.data_total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as API_Shop from '@/api/shop'
  import Foundation from '@/utils/Foundation'
  const theme1Header = () => import('@/pages/-shop-theme/-theme1-header')
  const theme2Header = () => import('@/pages/-shop-theme/-theme2-header')
  const theme3Header = () => import('@/pages/-shop-theme/-theme3-header')
  import { Pagination, Input } from 'element-ui'
  Vue.use(Pagination)
  Vue.use(Input)
  export default {
    name: 'shop-goods-list',
    validate({ query }) {
      return /^\d+$/.test(query.shop_id)
    },
    asyncData({ query }, callback) {
      Promise.all([
        API_Shop.getShopData(query.shop_id),
        API_Shop.getShopGoods(query)
      ]).then(values => {
        callback(null, { shop: values[0], goods: values[1] })
      }).catch(e => {
        callback({ statusCode: e.response.status })
      })
    },
    components: { theme1Header, theme2Header, theme3Header },
    data() {
      return {
        sortNav: ['新品', '价格', '销量', '收藏', '人气'].map((item, index) => ({ title: item, active: index === 0, sort: 'up', sort_id: index })),
        shop: '',
        goods: '',
        params: {
          page_no: 1,
          page_size: 16,
          ...this.$route.query
        }
      }
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsList()
      },
      /** 排序发生改变 */
      handleSortChanged(sort) {
        this.sortNav.map(item => {
          if (sort.sort_id === item.sort_id) {
            if (!sort.active) {
              item.active = true
            } else {
              item.sort = item.sort === 'up' ? 'down' : 'up'
            }
          }
          item.active = item.sort_id === sort.sort_id
        })
        this.GET_GoodsList()
      },
      /** 商品搜索【店内、全站】 */
      handleSearch(type) {
        if (type === 'all') {
          this.$router.push({ path: '/goods-list', query: { keyword: this.params.keyword } })
        } else {
          const { query } = this.$route
          this.$route.query.keyword = this.params.keyword
          window.history.replaceState(null, null, `?${Foundation.formatQuery(this.$route.query)}`);
          this.GET_GoodsList()
        }
      },
      /** 获取店铺商品列表 */
      GET_GoodsList() {
        API_Shop.getShopGoods(this.params).then(response => {
          this.goods = response
          this.MixinScrollToTop()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  img { width: 100%; height: 100% }
  .container {
    background-color: #F7F7F7;
  }
  .sort-nav {
    width: 100%;
    .inner { border-bottom: 1px solid #D8D8D8 }
    .left { height: 100% }
    .inner, .inner-sort {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      background-color: #F9FCFA;
    }
    .inner-sort .item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 25px;
      border-right: 1px solid #ccc;
      font-size: 14px;
      cursor: pointer;
      &.active { color: #f42424 }
      &.down .iconfont { transform: rotate(0) scale(.8) }
      &:last-child { border-right: 0 }
      .iconfont {
        font-size: 12px;
        margin: 0 5px;
        color: #f42424;
        transform: rotate(180deg) scale(.8);
      }
    }
    .inner-search {
      display: flex;
      margin-right: 30px;
      .search-btn { margin-left: 10px }
    }
  }
  .goods-container {
    .inner {
      background-color: #fff;
    }
  }
  .goods-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
  }
  $s_sep: 30px;
  $g_width: (1190px - $s_sep * 5) / 4;
  .goods-list { padding: 10px $s_sep }
  .goods-item {
    float: left;
    width: $g_width;
    min-height: 300px;
    margin-right: $s_sep;
    margin-bottom: 20px;
    &:nth-child(4n) { margin-right: 0 }
  }
  .goods-image {
    width: $g_width;
    height: $g_width;
  }
  .goods-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height: 36px;
  }
  .goods-price {
    display: flex;
    justify-content: space-between;
    strong { font-size: 16px }
  }
</style>
