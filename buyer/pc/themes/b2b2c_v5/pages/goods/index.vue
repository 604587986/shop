<template>
  <div id="goods-list" style="background-color: #ededed;padding-bottom: 20px">
    <div class="gl-container w">
      <div v-if="selectorData.selected_cat && selectorData.selected_cat.length" class="gl-bar-title">
        <span>全部</span>
        <template v-for="(cat, catIndex) in selectorData.selected_cat">
          <i :key="catIndex" class="iconfont ea-icon-arrow-right"></i>
          <div :key="catIndex" class="gl-bar-item">
            <a :href="'/goods?category=' + cat.value" class="gl-bar-trigger">
              <span>{{ cat.name }}</span>
              <i class="iconfont ea-icon-arrow-right"></i>
            </a>
            <div class="gl-bar-content">
              <ul class="clearfix">
                <li v-for="(cc, ccIndex) in cat.other_options" :key="ccIndex">
                  <a class="int" :href="'/goods?category=' + cc.value">{{ cc.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
      <div v-if="selectorData" class="gl-select-condition">
        <dl v-if="selectorData.brand && selectorData.brand.length" class="brand logo-brand">
          <dt>品牌:</dt>
          <dd>
            <div class="small-list brand-list">
              <ul class="show-logo">
                <li v-for="(brand, index) in selectorData.brand" :key="index">
                  <a :href="'/goods?brand=' + brand.value" :title="brand.name">
                    <img :src="brand.url" alt="新农哥">新农哥
                  </a>
                </li>
              </ul>
            </div>
          </dd>
        </dl>
        <dl v-if="selectorData.cat && selectorData.cat.length">
          <dt>分类:</dt>
          <dd>
            <div class="small-list">
              <a
                v-for="(cat, index) in selectorData.cat"
                :key="index"
                :href="'/goods?category=' + cat.value"
              >{{ cat.name }}</a>
            </div>
          </dd>
        </dl>
      </div>
      <div class="gl-sku-box">
        <div class="gl-sku-filter">
          <div class="btns">
            <a
              v-for="sort in sorts"
              :key="sort.name"
              href="javascript:;"
              :class="[sort.active && 'active']"
              @click="handleClickSort(sort)"
            >{{ sort.title }}<i :class="['iconfont ea-icon-arrow-down3', sort.type === 'desc' && 'desc']"></i>
            </a>
          </div>
          <div class="price">
            <div class="p-c-i">
              <div class="p-c-i-b"><em>￥</em><input type="text" v-model="prices[0]" class="custom-pro" maxlength="5"/></div>
              <i></i>
              <div class="p-c-i-b"><em>￥</em><input type="text" v-model="prices[1]" class="custom-pro" maxlength="5"/></div>
            </div>
            <div class="p-c-b">
              <a href="javascript:;" class="empty-pro" @click="prices = []">清空</a>
              <a href="javascript:;" class="enter-pro" @click="GET_GoodsList">确定</a>
            </div>
          </div>
        </div>
        <div class="gl-sku-list">
          <div class="empty-goods" v-if="!goodsListData || !goodsListData.data || goodsListData.data.length === 0">
            暂无数据...
          </div>
          <ul v-else class="list-ul clearfix">
            <li v-for="goods in goodsListData.data" :key="goods.goods_id">
              <div class="gl-item">
                <div class="gl-img">
                  <nuxt-link :to="'/goods/' + goods.goods_id" target="_blank">
                    <img :src="goods.small" :alt="goods.name">
                  </nuxt-link>
                </div>
                <div class="gl-price">
                  <strong><em>¥</em><i>{{ goods.price | unitPrice }}</i></strong>
                </div>
                <div class="gl-name">
                  <nuxt-link :to="'/goods/' + goods.goods_id" :title="goods.name" target="_blank">
                    <em>{{ goods.name }}</em>
                  </nuxt-link>
                  <!--// Andste_TODO 2018/6/26: 商品对应关键字，做为体验优化处理-->
                  <!--<span class="gl-attribute">
                    <a title="吊带裙/背心裙" href="#" target="_blank" class="attr">
                      <b>吊带裙/背心裙</b>
                    </a>
                    <a title="淑女风" href="#" target="_blank" class="attr">
                      <b>淑女风</b>
                    </a>
                    <a title="纯棉" href="#" target="_blank" class="attr">
                      <b>纯棉</b>
                    </a>
                  </span>-->
                </div>
                <div class="gl-commit">
                  <strong>已有<a class="comment">{{ goods.comment_num }}</a>人评价</strong>
                </div>
                <div class="gl-shop">
                  <span>
                    <a :href="'/shop/' + goods.seller_id" :title="goods.seller_name">{{ goods.seller_name }}<i class="iconfont ea-icon-shop" title="进入店铺"></i></a>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <el-pagination
            v-if="goodsListData"
            @current-change="handleCurrentPageChange"
            :current-page.sync="goodsListData.page_no"
            :page-size="goodsListData.page_size"
            layout="total, prev, pager, next"
            :total="goodsListData.data_total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Pagination } from 'element-ui'
  Vue.use(Pagination)
  import * as qs from 'qs'
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Goods from '@/api/goods'
  export default {
    name: 'goods-list',
    async asyncData({ params, query, error }) {
      let goodsListData
      let selectorData
      const _parmas = {
        page_no: 1,
        page_size: 20,
        sort: 'def_asc',
        ...query
      }
      try {
        goodsListData = await API_Goods.getGoodsList(_parmas)
        selectorData = await API_Goods.getGoodsSelector(query)
      } catch (e) {
        error({ statusCode: 500, message: '服务器出错' })
      }
      return {
        goodsListData,
        selectorData,
        params: _parmas
      }
    },
    head() {
      return {
        title: `商品列表-${this.site.title}`
      }
    },
    data() {
      let { price, sort } = this.$route.query
      if (sort) {
        sort = sort.split('_')
      } else {
        sort = ['def', 'asc']
      }
      return {
        params: this.$route.query,
        // 排序
        sorts: [
          { title: '默认', name: 'def', type: 'asc' },
          { title: '销量', name: 'buynum', type: 'asc' },
          { title: '价格', name: 'price', type: 'asc' },
          { title: '评价', name: 'grade', type: 'asc' },
        ].map(item => {
          item.active = item.name === sort[0]
          if (item.name === sort[0]) {
            item.type = sort[1]
          }
          return item
        }),
        // 价格区间
        prices: price ? price.split('_') : ['', '']
      }
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentPageChange(page_no) {
        this.params.page_no = page_no
        this.GET_GoodsList()
      },
      /** 排序 */
      handleClickSort(sort) {
        if (sort.active) sort.type = sort.type === 'asc' ? 'desc' : 'asc'
        this.$set(this, 'sorts', this.sorts.map(item => {
          item.active = item.name === sort.name
          return item
        }))
        this.params.sort = `${sort.name}_${sort.type}`
        this.GET_GoodsList()
      },
      /** 获取商品列表 */
      GET_GoodsList() {
        const params = JSON.parse(JSON.stringify(this.params))
        Object.keys(params).forEach(key => {
          if (!params[key]) delete params[key]
        })
        const { prices } = this
        if (prices[0] || prices[1]) {
          params.price = prices.join('_')
        } else {
          delete params.price
        }
        location.href = `/goods?${qs.stringify(params)}`
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
  .gl-container {
    overflow: hidden;
    .iconfont {
      font-size: 12px;
      transition: all .3s ease;
      display: inline-block;;
    }
  }
  .gl-bar-title {
    font-size: 12px;
    color: #666;
    margin-top: 25px;
    line-height: 19px;
    position: relative;
    z-index: 10;
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
      a:hover { color: $color-main }
    }
  }
  .gl-select-condition {
    box-shadow: rgb(204, 204, 204) 0 2px 5px;
    background-color: #fff;
    width: 1210px;
    margin-top: 20px;
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
      width: 1090px;
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
        &:hover { color: $color-main }
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
    width: 1210px;
    margin: 35px auto;
    overflow: hidden;
    box-shadow: rgb(204, 204, 204) 0 2px 5px;
    .gl-sku-filter {
      position: relative;
      z-index: 3;
      height: 45px;
      background-color: #f5f5f5;
      $margin-top: (45px - 24px) / 2;
      .btns {
        float: left;
        margin-top: $margin-top;
        margin-left: 30px;
        .iconfont {
          transform: rotate(-180deg);
        }
        .iconfont.desc {
          transform: rotate(0deg);
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
            background: $color-main;
            border-color: $color-main;
            color: #fff;
          }
        }
      }
      .price {
        position: relative;
        float: left;
        width: 124px;
        height: 45px;
        margin-left: 15px;
        text-align: center;
        &:hover {
          background: #ededed;
          .p-c-b {
            display: block;
          }
        }
        .p-c-i {
          height: 24px;
          margin-top: $margin-top;
          overflow: hidden;
        }
        .p-c-b {
          display: none;
          position: absolute;
          bottom: -30px;
          left: 0;
          width: 100%;
          background: #ededed;
        }
        .p-c-i-b {
          display: inline-block;
          width: 45px;
          height: 22px;
          border: 1px solid #ededed;
          background-color: #fff;
        }
        input {
          width: 33px;
          height: 14px;
          border: 0 none;
          padding: 0 3px;
          margin-top: 4px;
          box-sizing: border-box;
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
          border: 1px solid $color-main;
          background: $color-main;
          margin-left: 5px;
          color: #fff;
        }
      }
    }
    .gl-sku-list {
      position: relative;
      background-color: #fff;
      .list-ul {
        min-height: 200px;
      }
      .empty-goods {
        height: 150px;
        line-height: 150px;
        text-align: center;
      }
    }
  }
  .gl-sku-list {
    padding: 0 10px;
    li {
      width: 234px;
      height: 400px;
      float: left;
      position: relative;
      z-index: 1;
      margin-top: 10px;
      box-shadow: 0 0 0 0 #e4e7ed;
      transition: box-shadow .2s ease;
    }
    li:hover {
      border-color: #e9e9e9;
      box-shadow: 0 0 5px 2px #e4e7ed;
      z-index: 2;
    }
    /deep/ .el-pagination {
      padding: 10px 0 30px 0;
      text-align: right;
      margin-right: 10px;
    }
    .gl-item {
      padding: 12px 6px;
      width: 220px;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      background: #fff;
      border: 1px solid #fff;
      transition: border-color .1s ease;
      .gl-img {
        margin-bottom: 5px;
        img {
          display: block;
          width: 220px;
          height: 220px;
          background-color: #fafafa;
        }
      }
    }
    .gl-price {
      position: relative;
      line-height: 22px;
      height: 22px;
      overflow: hidden;
      width: 100%;
      margin: 0 0 8px;
      strong {
        float: left;
        margin-right: 10px;
        color: $color-main;
        font-size: 20px;
        font-weight: 400;
        font-family: Verdana;
        em { font-size: 16px }
      }
    }
    .gl-name {
      height: 40px;
      margin-bottom: 8px;
      overflow: hidden;
      a {
        color: #666;
        &:hover { color: $color-main }
      }
      em {
        display: block;
        height: 40px;
        line-height: 20px;
        overflow: hidden;
        transition: height .08s ease;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .gl-attribute {
        display: block;
        width: 228px;
        height: 19px;
        margin-top: 1px;
        margin-right: -8px;
        overflow: hidden;
        .attr {
          float: left;
          height: 19px;
          line-height: 19px;
          padding: 0 4px;
          margin-right: 7px;
          background: #f4f4f4;
          b {
            font-weight: 400;
            color: #999;
          }
        }
      }
    }
    .gl-commit {
      width: 100%;
      height: 18px;
      margin-top: -3px;
      margin-bottom: 9px;
      overflow: hidden;
      strong {
        color: #a7a7a7;
        font-weight: 400;
        a {
          color: #646fb0;
          font-family: verdana;
          font-weight: 700;
        }
      }
    }
    .gl-shop {
      line-height: 18px;
      height: 18px;
      overflow: hidden;
      margin-top: -3px;
      margin-bottom: 9px;
      span {
        display: inline-block;
        position: relative;
        height: 18px;
        a { color: #999 }
        a:hover { color: $color-main }
        i { margin-left: 5px }
      }
    }
  }
</style>
