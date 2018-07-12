<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)">
      <van-tabs v-model="tabActive" slot="title">
        <van-tab title="商品"/>
        <van-tab title="评价"/>
        <van-tab title="详情"/>
      </van-tabs>
      <header-shortcut slot="right"/>
    </van-nav-bar>
    <div class="goods-container">
      <van-swipe :autoplay="3000" class="goods-swipe">
        <van-swipe-item v-for="(gallery, index) in galleryList" :key="index">
          <img :src="gallery.original" @click="handlePreviewImage(index)">
        </van-swipe-item>
      </van-swipe>
      <div class="goods-buy">
        <div class="goods-name">
          <h1>{{ goods.goods_name }}</h1>
          <div class="collection-goods" @click="handleCollectGoods">
            <van-icon v-if="collected" name="like" color="#f42424"/>
            <van-icon v-else name="like-o"/>
            关注
          </div>
        </div>
        <van-cell-group :border="false">
          <van-cell class="goods-price">
            <div slot="title" class="price">
              ￥<em>{{ goods.price | unitPrice('', 'before') }}</em>.{{ goods.price | unitPrice('', 'after') }}
            </div>
          </van-cell>
        </van-cell-group>
      </div>
      <span class="separated"></span>
    </div>
    <div style="height: 50px"></div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服"/>
      <van-goods-action-mini-btn icon="cart" info="5" text="购物车"/>
      <van-goods-action-mini-btn icon="shop" text="店铺"/>
      <van-goods-action-big-btn text="加入购物车"/>
      <van-goods-action-big-btn text="立即购买" primary/>
    </van-goods-action>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Tabs, Tab, Swipe, SwipeItem, ImagePreview, Cell, CellGroup, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant'
  Vue.use(Tabs).use(Tab).use(Swipe).use(SwipeItem).use(Cell).use(CellGroup).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
  import * as API_Goods from '@/api/goods'
  import * as API_Members from '@/api/members'
  import Storage from '@/utils/storage'
  export default {
    name: 'goods-detail',
    async asyncData({ params }) {
      let goods = await API_Goods.getGoods(params.id)
      return { goods, galleryList: goods.gallery_list || [] }
    },
    head() {
      return {
        title: `${this.goods.page_title}-Javashop多店铺示例商城`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.goods.meta_keywords },
          { hid: 'description', name: 'description', content: `${this.goods.meta_description}-Javashop多店铺示例商城` },
          { 'http-equiv': 'mobile-agent', content: `format=xhtml; url=/goods/${this.goods.goods_id}` },
          { 'http-equiv': 'mobile-agent', content: `format=html5; url=/goods/${this.goods.goods_id}` }
        ]
      }
    },
    data() {
      return {
        // 商品id
        goods_id: this.$route.params.id,
        // 商品信息
        goods: '',
        // 当前tab
        tabActive: 0,
        // 商品是否已被收藏
        collected: false
      }
    },
    mounted() {
      const { goods_id, seller_id } = this.goods
      // 用于服务端记录浏览次数，每次+1【服务端去重】
      API_Goods.visitGoods(goods_id)
      // 如果用户已登录，查询是否已收藏商品
      Storage.getItem('user') && API_Members.getGoodsIsCollect(goods_id).then(response => {
        this.collected = response.message
      })
    },
    methods: {
      /** 收藏商品 */
      handleCollectGoods() {
        if (!Storage.getItem('user')) {
          this.$message.error('请先登录！')
          return
        }
        API_Members.collectionGoods(this.goods_id).then(() => { this.collected = true })
      },
      /** 商品图预览 */
      handlePreviewImage(index) {
        ImagePreview(this.galleryList.map(item => item.original), index)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .separated {
    display: block;
    width: 100%;
    height: 10px;
    background-color: #e8e8ed;
  }
  /deep/ {
    .van-nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
    }
    .van-nav-bar__left .van-nav-bar__arrow { color: #666 }
    .van-tabs__wrap::after {
      border-width: 0;
    }
  }
  .goods-container {
    margin-top: 46px;
    .goods-swipe {
      width: 100%;
      height: 375px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-buy {
      position: relative;
      .goods-name {
        padding: 10px;
        &::before {
          content: "";
          height: 0;
          display: block;
          border-top: 1px solid #ddd;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
        }
        h1 {
          font-size: 16px;
          color: #333;
          line-height: 18px;
          padding-right: 50px;
          min-height: 36px;
          font-weight: 400;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .collection-goods {
          position: absolute;
          width: 50px;
          height: 36px;
          right: 0;
          top: 10px;
          text-align: center;
          border-left: 1px solid #ddd;
          .van-icon {
            display: block;
            font-size: 20px;
          }
        }
      }
      .goods-price {
        font-size: 12px;
        line-height: 1.8;
        padding: 0 10px;
        em {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
</style>
