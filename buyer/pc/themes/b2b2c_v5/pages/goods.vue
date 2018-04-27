<template>
  <div id="goods">
    <bread-nav :goods-sn="goods.goods_sn"/>
    <div class="content">
      <goods-zoom :images="goods.goods_gallery" :cur-img="curImg"/>
      <goods-info :goods="goods"/>
      <shop-card :goods="goods"/>
    </div>
    <div class="details">
      <div class="inner w">
        <goods-tags :tag-goods="goods.tagGoods"/>
        <div class="detail-container">
          <div class="detail-tabs">
            <div
              v-for="tab in tabs"
              :key="tab.title"
              :class="['item-tab', tab.active && 'active']"
              @click="handleClickTabItem(tab)"
            >{{ tab.title }}</div>
          </div>
        </div>
        <div class="detail-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_Goods from '@/api/goods'
  import { BreadNav, GoodsInfo, GoodsTags, GoodsZoom, ShopCard } from '@/pages/-goods'
	export default {
		name: 'goods',
    asyncData({ query }, callback) {
		  if (!query.goods_id) {
        callback(null, { goods: '' })
        return
      }
      API_Goods.getGoods(query.goods_id).then(response => {
        callback(null, { goods: response })
      }).catch(e => {
        callback({ statusCode: e.response.status })
      })
    },
    head() {
		  return {
		    title: `${this.goods.goods_name} - Javashop多店铺示例商城`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: '最好的Java网店系统,Java多用户商城,Java商城定制开发' },
          { hid: 'description', name: 'description', content: `${this.goods.goods_name} - Javashop多店铺示例商城` },
          { 'http-equiv': 'mobile-agent', content: `format=xhtml; url=/goods?goods_id=${this.goods.goods_id}` },
          { 'http-equiv': 'mobile-agent', content: `format=html5; url=/goods?goods_id=${this.goods.goods_id}` }
        ]
      }
    },
    components: { BreadNav, GoodsInfo, GoodsTags, GoodsZoom, ShopCard },
    data() {
		  return {
        goods: '',
        /** 当前要展示的图片 */
        curImg: '',
        tabs: ['商品详情', '规格参数', '商品评论', '商品咨询', '销售记录'].map((item, index) => ({ title: item, active: index === 0 }))
      }
    },
    methods: {
		  /** 商品详情tab点击事件 */
      handleClickTabItem(tab) {
        this.tabs.map(item => {
          item.active = tab === item
          return item
        })
      }
    }
	}
</script>

<style type="text/scss" lang="scss">
  .content {
    display: flex;
    justify-content: space-between;
    width: 1110px;
    min-height: 500px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 2px 5px #ccc;
    padding: 40px 40px 12px 40px;
  }
  .details {
    margin: 50px 0;
    .inner {
      display: flex;
      justify-content: space-between;
    }
    $dc_width: 1190px - 200px - 30px;
    .detail-container {
      width: $dc_width;
      min-height: 100px;
    }
    .detail-tabs {
      display: flex;
      width: 100%;
      height: 36px;
      .item-tab {
        width: ($dc_width - 4px) / 5;
        height: 36px;
        background-color: #333;
        border-right: 1px solid #fff;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        transition: all .2s ease;
        &:hover, &.active { background-color: #7f69b3 }
        &:nth-child(5) { border-right: 0 }
      }
    }
  }
</style>
