<template>
  <div>
    <van-nav-bar left-arrow @click-left="MixinRouterBack">
      <van-tabs v-model="tabActive" slot="title">
        <van-tab title="商品"/>
        <van-tab title="评价"/>
        <van-tab title="详情"/>
      </van-tabs>
      <header-shortcut slot="right"/>
    </van-nav-bar>
    <div class="goods-container">
      <goods-gallery :data="galleryList"/>
      <div class="goods-buy">
        <div class="goods-name">
          <h1>{{ goods.goods_name }}</h1>
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
      <van-goods-action-mini-btn icon="like-o" text="收藏" @click="handleCollectGoods"/>
      <van-goods-action-mini-btn icon="cart" :info="cartBadge ? (cartBadge > 99 ? '99+' : cartBadge) : ''" to="/cart" text="购物车"/>
      <van-goods-action-mini-btn icon="shop" text="店铺"/>
      <van-goods-action-big-btn text="加入购物车"/>
      <van-goods-action-big-btn text="立即购买" primary/>
    </van-goods-action>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { Tabs, Tab, Swipe, SwipeItem, Cell, CellGroup, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant'
  Vue.use(Tabs).use(Tab).use(Swipe).use(SwipeItem).use(Cell).use(CellGroup).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
  import * as API_Goods from '@/api/goods'
  import * as API_Members from '@/api/members'
  import * as API_Promotions from '@/api/promotions'
  import * as goodsComponents from './index'
  import Storage from '@/utils/storage'
  export default {
    name: 'goods-detail',
    validate({ params }) {
      return /^\d+$/.test(params.id)
    },
    async asyncData({ params }) {
      let goods = {}
      try {
        goods = await API_Goods.getGoods(params.id)
      } catch (e) {
        error({ statusCode: 500, message: '服务器出错' })
      }
      return {
        // 商品信息
        goods,
        // 商品相册
        galleryList: goods.gallery_list || [],
        // 当前商品是否可以浏览
        canView: goods.is_auth !== 0 && goods.goods_off === 1
      }
    },
    head() {
      const { goods, site } = this
      return {
        title: `${goods.page_title || goods.goods_name || '商品详情'}-${site.site_name}`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: goods.meta_keywords },
          { hid: 'description', name: 'description', content: `${goods.meta_description}-${goods.site_name}` }
        ]
      }
    },
    components: goodsComponents,
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
      // 如果商品可以查看
      if (this.canView) {
        // 如果用户已登录，加载收藏状态
        if (Storage.getItem('refresh_token')) {
          API_Members.getGoodsIsCollect(goods_id).then(response => {
            this.collected = response.message
          })
        }
        // 浏览量+1
        API_Goods.visitGoods(goods_id)
        // 获取促销信息
        API_Promotions.getGoodsPromotions(goods_id).then(response => { this.promotions = response })
      }
    },
    computed: {
      /** 购物车徽章 */
      cartBadge() {
        return this.$store.getters['cart/allCount']
      }
    },
    methods: {
      /** 收藏商品 */
      handleCollectGoods() {
        if (!Storage.getItem('refresh_token')) {
          this.$message.error('您还未登录！')
          return false
        }
        const { goods_id } = this.goods
        if (this.collected) {
          API_Members.deleteGoodsCollection(goods_id).then(() => {
            this.$message.success('取消收藏成功！')
            this.collected = false
          })
        } else {
          API_Members.collectionGoods(goods_id).then(() => {
            this.$message.success('收藏成功！')
            this.collected = true
          })
        }
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
