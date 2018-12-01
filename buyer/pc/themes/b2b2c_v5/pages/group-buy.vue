<template>
  <div id="group-buy">
    <div class="nav-bar">
      <div class="w">
        <div
          v-for="(cate, index) in categorys"
          v-if="index < 10"
          :key="cate.cat_id"
          :class="['cate-item', cate.active && 'active']"
          @click="handleClickCate(cate)"
        >{{ cate.cat_name }}</div>
      </div>
    </div>
    <div class="group-buy w">
      <ul v-if="groupBuy && groupBuy.data.length" class="group-buy-list">
        <li v-for="(gb, index) in groupBuy.data" :key="index" class="gb-item">
          <div class="inner-gb-item">
            <a target="_blank" class="pic_thumb" :href="'/goods/' + gb.goods_id" :title="gb.goods_name">
              <img :src="gb.img_url" border="0" :alt="gb.goods_name">
            </a>
            <h3 class="gb-title">
              <a target="_blank" :href="'/goods/' + gb.goods_id" :title="gb.gb_name">{{ gb.gb_name }}</a>
            </h3>
            <p class="gb-sub-title">{{ gb.gb_title }}</p>
            <div class="group_price">
              <span class="price" :title="'￥' + gb.price"><i>¥</i>{{ gb.price }}</span>
              <span class="group_num"><em>{{ gb.show_buy_num }}</em>件已购买</span>
              <a class="buy-button" target="_blank" :href="'/goods/' + gb.goods_id">
                我要团
              </a>
            </div>
            <div class="group_dock">
              <span class="group_discount">{{(gb.price / gb.original_price * 10).toFixed(1) }}&nbsp;折</span>
              <del class="group_price">¥{{ gb.original_price }}</del>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-data">暂无数据...</div>
      <el-pagination
        v-if="groupBuy"
        @current-change="handleCurrentPageChange"
        :current-page.sync="groupBuy.page_no"
        :page-size="groupBuy.page_size"
        layout="total, prev, pager, next"
        :total="groupBuy.data_total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Pagination } from 'element-ui'
  Vue.use(Pagination)
  import * as API_Promotions from '@/api/promotions'
  export default {
    name: 'group-buy',
    head() {
      return {
        title: `团购-${this.site.site_name}`
      }
    },
    data() {
      return {
        params: {
          page_no: 1,
          page_size: 10,
          cat_id: 0
        },
        categorys: [
          { cat_id: 0, cat_name: '全部', active: true }
        ],
        groupBuy: ''
      }
    },
    mounted() {
      // 获取团购分类
      API_Promotions.getGroupBuyCategorys().then(response => {
        this.categorys.push(...response.sort((x, y) => x.cat_order > y.cat_order))
      })
      this.GET_GroupBuyGoods()
    },
    methods: {
      /** 当前分页数发生改变 */
      handleCurrentPageChange(page_no) {
        this.params.page_no = page_no
        this.GET_GroupBuyGoods()
      },
      /** 选择团购分类 */
      handleClickCate(cate) {
        const { categorys } = this
        this.$set(this, 'categorys', categorys.map(item => {
          item.active = item.cat_id === cate.cat_id
          return item
        }))
        this.params.cat_id = cate.cat_id
        this.GET_GroupBuyGoods()
      },
      /** 获取团购商品 */
      GET_GroupBuyGoods() {
        const params = JSON.parse(JSON.stringify(this.params))
        if (params.cat_id === 0) delete params.cat_id
        API_Promotions.getGroupBuyGoods(params).then(response => {
          this.groupBuy = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .nav-bar {
    width: 100%;
    height: 40px;
    background-color: $color-main;
  }
  .cate-item {
    float: left;
    height: 24px;
    line-height: 24px;
    margin-top: 7px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #FFCFBF;
    margin-right: 10px;
    border-radius: 12.5px;
    transition: background-color, border-color ease .2s;
    cursor: pointer;
    border: 2px solid $color-main;
    &.active {
      background-color: #fff;
      color: $color-main
    }
    &:hover {
      border-color: #FFCFBF
    }
  }
  .group-buy {
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .gb-item {
    font-size: 12px;
    background-color: #FFF;
    vertical-align: top;
    letter-spacing: normal;
    word-spacing: normal;
    display: inline-block;
    margin-bottom: 20px;
    border: solid 1px #E7E7E7;
    margin: -1px;
    &:hover {
      border-width: 0;
      .inner-gb-item {
        padding: 11px;
        border: solid 1px $color-main;
        box-shadow: 0 0 3px rgba(204,204,204,0.9);
        .group_num {
          display: none;
        }
        .buy-button {
          opacity: 1;
          filter: alpha(opacity=100)/*IE*/;
        }
      }
    }
  }
  .inner-gb-item {
    width: 275px;
    padding: 11px;
    position: relative;
  }
  .pic_thumb {
    line-height: 0;
    text-align: center;
    vertical-align: middle;
    display: block;
    width: 100%;
    height: 193px;
    overflow: hidden;
    img {
      display: block;
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
  }
  .gb-title {
    display: block;
    width: 100%;
    max-height: 20px;
    min-height: 20px;
    margin: 10px auto 0 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .gb-sub-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    min-height: 18px;
  }
  .group_price {
    margin-top: 15px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    .price {
      font: 700 28px/30px "microsoft yahei", Arial;
      color: $color-main;
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 36px;
      float: left;
      overflow: hidden;
      i {
        font-weight: lighter;
        font-size: 20px;
        line-height: 24px;
        vertical-align: bottom;
        display: inline-block;
        margin-right: 2px;
        zoom: 1;
      }
    }
    .group_num {
      font: normal 14px/36px "microsoft yahei", Arial;
      color: #999;
      float: right;
      max-width: 105px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      em {
        font-size: 16px;
        font-weight: 700;
        color: #396;
        margin: 0 2px;
      }
    }
    .buy-button {
      font: normal 16px/20px "microsoft yahei";
      color: #FFF;
      background-color: #FF0000;
      text-align: center;
      display: block;
      width: 80px;
      height: 20px;
      padding: 5px 0;
      position: absolute;
      right: 0;
      bottom: 5px;
      opacity: 0;
      filter: alpha(opacity=0)/*IE*/;
      transition: opacity 0.4s ease-in-out 0s;
    }
  }
  .group_dock {
    margin-left: 8px;
    position: relative;
    .group_discount {
      font: 600 12px/20px "microsoft yahei";
      color: #C30;
    }
    .group_price {
      margin-left: 10px;
      line-height: 16px;
      overflow: hidden;
    }
  }
  /deep/ .el-pagination {
    text-align: right;
    margin-top: 30px;
  }
  .no-data {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
</style>
