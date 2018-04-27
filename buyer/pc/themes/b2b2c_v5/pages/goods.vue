<template>
  <div id="goods">
    <bread-nav :goods-sn="goods.goods_sn"/>
    <div class="content">
      <goods-zoom :images="goods.goods_gallery" :cur-img="curImg"/>
      <div class="goods-operate"></div>
      <shop-card :goods="goods"/>
    </div>
  </div>
</template>

<script>
  import * as API_Goods from '@/api/goods'
  import { BreadNav, GoodsZoom, ShopCard } from '@/pages/-goods'
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
    components: { BreadNav, GoodsZoom, ShopCard },
    data() {
		  return {
        goods: '',
        /** 当前要展示的图片 */
        curImg: ''
      }
    }
	}
</script>

<style type="text/scss" lang="scss">
  .content {
    display: flex;
    justify-content: space-between;
    width: 1190px;
    min-height: 500px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 2px 5px #ccc;
    padding: 40px 40px 12px 40px;
  }

  .goods-other {
    margin-top: 50px;
  }
</style>
