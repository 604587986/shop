<template>
  <div>
    <van-nav-bar left-arrow @click-left="MixinRouterBack">
      <van-tabs v-model="tabActive" slot="title" @click="handleClickNavTab">
        <van-tab :disabled="goods_off" title="商品"/>
        <van-tab :disabled="goods_off" title="评价"/>
        <van-tab :disabled="goods_off" title="详情"/>
        <van-tab v-if="show_dis" :disabled="goods_off" title="推荐"/>
      </van-tabs>
      <header-shortcut slot="right"/>
    </van-nav-bar>
    <div v-if="goods.goods_off === 0" class="goods-auth">
      <div style="height: 50px"></div>
      <img src="../../assets/images/background-goods-off.jpg" alt="">
      <van-button type="default" size="small" @click="$router.push('/')">去首页</van-button>
      <van-button type="default" size="small" @click="MixinRouterBack">返回上页</van-button>
    </div>
    <template v-else>
      <div class="goods-container">
        <!--商品相册 start-->
        <goods-gallery :data="galleryList"/>
        <!--团购、限时抢购 start-->
        <goods-groupbuy-seckill :promotions="promotions"/>
        <!--团购、限时抢购 end-->
        <!--积分兑换 start-->
        <goods-exchange :promotions="promotions"/>
        <!--积分兑换 end-->
        <!--商品相册 end-->
        <div class="goods-buy">
          <div class="goods-name">
            <h1>{{ goods.goods_name }}</h1>
          </div>
          <van-cell-group v-if="!hiddenPrice" :border="false">
            <van-cell class="goods-price">
              <div slot="title" class="price">
                ￥<em>{{ goods.price | unitPrice('', 'before') }}</em>.{{ goods.price | unitPrice('', 'after') }}
              </div>
            </van-cell>
          </van-cell-group>
        </div>
        <span class="separated"></span>
        <!--店铺优惠券 start-->
        <goods-coupons :shop-id="goods.seller_id"/>
        <!--店铺优惠券 end-->
        <!--促销活动 start-->
        <goods-promotions :promotions="promotions"/>
        <!--促销活动 end-->
        <!--商品规格 start-->
        <goods-specs
          :goods="goods"
          :show="showSpecsPopup"
          :promotions="promotions"
          @sku-changed="(sku) => { selectedSku = sku }"
          @num-changed="(num) => { buyNum = num }"
          @add-cart="handleAddToCart"
          @buy-now="handleBuyNow"
          @close="showSpecsPopup = false"
        />
        <!--商品规格 end-->
        <span class="separated"></span>
        <!--店铺卡片 start-->
        <shop-card :shop-id="goods.seller_id"/>
        <!--店铺卡片 end-->
        <span class="separated"></span>
        <!--评价 start-->
        <goods-comments :goods-id="goods.goods_id" :grade="goods.grade"/>
        <!--评价 end-->
        <span class="separated"></span>
        <!--商品简介、参数 start-->
        <van-tabs class="params-container" :line-width="100">
          <van-tab title="商品介绍">
            <div v-html="goods.intro" class="goods-intro"></div>
          </van-tab>
          <van-tab title="商品参数">
            <goods-params :goods-params="goods.param_list"/>
          </van-tab>
        </van-tabs>
        <!--商品简介、参数 end-->
      </div>
      <div style="height: 50px"></div>
      <van-goods-action style="z-index: 99">
        <van-goods-action-mini-btn
          :icon="collected ? 'like' : 'like-o'"
          :text="collected ? '已收藏' : '收藏'"
          @click="handleCollectGoods"
        />
        <van-goods-action-mini-btn icon="cart" :info="cartBadge ? (cartBadge > 99 ? '99+' : cartBadge) : ''" to="/cart" text="购物车"/>
        <van-goods-action-mini-btn icon="shop" text="店铺" :to="'/shop/' + goods.seller_id"/>
        <van-goods-action-big-btn
          v-if="goods.is_auth === 0 || goods.goods_off === 0"
          :text="goods.is_auth === 0 ? '商品审核中' : '商品已下架'"
          class="buy-disabled"
        />
        <template v-else>
          <van-goods-action-big-btn text="加入购物车" @click="handleAddToCart"/>
          <van-goods-action-big-btn text="立即购买" primary @click="handleBuyNow"/>
        </template>
      </van-goods-action>
      <goods-distribution
        v-if="show_dis"
        :show="showDisPopup"
        :goods_name="goods.goods_name"
        :thumbnail="goods.thumbnail"
        @close="showDisPopup = false"/>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { Tabs, Tab, Swipe, SwipeItem, Cell, CellGroup, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant'
  Vue.use(Tabs).use(Tab).use(Swipe).use(SwipeItem).use(Cell).use(CellGroup).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
  import * as API_Goods from '@/api/goods'
  import * as API_Trade from '@/api/trade'
  import * as API_Common from '@/api/common'
  import * as API_Members from '@/api/members'
  import * as API_Promotions from '@/api/promotions'
  import * as API_distribution from '@/api/distribution'
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
        canView: goods.is_auth !== 0 && goods.goods_off === 1,
        // 当前商品是否下架
        goods_off: goods.goods_off === 0
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
        // 显示分销分享按钮
        show_dis: process.env.distribution,
        // 商品id
        goods_id: this.$route.params.id,
        // 商品信息
        goods: '',
        // 当前tab
        tabActive: 0,
        // 商品是否已被收藏
        collected: false,
        // 已选sku
        selectedSku: '',
        // 购买数量
        buyNum: 1,
        // 距离顶部距离
        offsetTop: {
          cm: 0,
          pa: 0
        },
        // 锁住滚动出发事件
        lockScroll: false,
        // 促销信息
        promotions: '',
        // 展示分销弹框
        showDisPopup: false,
        // 显示规格弹框
        showSpecsPopup: false
      }
    },
    mounted() {
      const { goods_id, seller_id } = this.goods
      // 如果商品可以查看
      if (this.canView) {
        // 获取促销信息
        API_Promotions.getGoodsPromotions(goods_id).then(response => { this.promotions = response })
        // 记录浏览量统计【用于统计】
        API_Common.recordViews(window.location.href)
        // 滚动监听
        window.addEventListener('scroll', this.handleCountOffset)
        // 如果页面是被分享的
        if (this.$route.query.su) {
          API_distribution.accessShortLink({su: this.$route.query.su }).then(() => { console.log(9856) })
        }
      }
      // 如果用户已登录，加载收藏状态，加载购物车
      if (Storage.getItem('refresh_token')) {
        // 获取收藏状态
        API_Members.getGoodsIsCollect(goods_id).then(response => {
          this.collected = response.message
        })
        // 获取购物车数据
        this.$store.dispatch('cart/getCartDataAction')
      }
    },
    computed: {
      /** 购物车徽章 */
      cartBadge() {
        return this.$store.getters['cart/allCount']
      },
      /** 是否隐藏价格 */
      hiddenPrice() {
        const { promotions = prom } = this
        if (!promotions || !promotions.length) return false
        // 如果有团购，隐藏价格
        if (promotions.filter(item => item.groupbuy_goods_vo)[0]) return true
        // 如果有限时抢购，隐藏价格
        if (promotions.filter(item => item.seckill_goods_vo)[0]) return true
        // 如果有积分兑换，隐藏价格
        if (promotions.filter(item => item.exchange)[0]) return true
        return false
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
      },
      /** 立即购买 */
      handleBuyNow() {
        if (!this.isLogin()) return
        const { buyNum } = this
        const { sku_id } = this.selectedSku
        API_Trade.buyNow(sku_id, buyNum, this.getActivityId()).then(response => {
          this.$store.dispatch('cart/getCartDataAction')
          this.$router.push('/checkout')
        })
      },
      /** 加入购物车 */
      handleAddToCart() {
        if (!this.isLogin()) return
        const { buyNum } = this
        const { sku_id } = this.selectedSku
        API_Trade.addToCart(sku_id, buyNum, this.getActivityId()).then(response => {
          this.$store.dispatch('cart/getCartDataAction')
          this.$confirm('加入购物车成功！要去看看吗？', () => {
            this.$router.push({ path: '/cart' })
          })
        })
      },
      /** 是否已登录 */
      isLogin() {
        if (!this.selectedSku) {
          this.$message.error('请选择商品规格！')
          this.showSpecsPopup = true
          this.unselectedSku = true
          return false
        }
        if (!Storage.getItem('refresh_token')) {
          this.$confirm('您还未登录，要现在去登录吗？', () => {
            this.$router.push({ path: '/login', query: { forward: `${this.$route.path}?sku_id=${this.selectedSku.sku_id}`} })
          })
          return false
        } else {
          return true
        }
      },
      /** 检查是否有积分兑换、团购、限时抢购活动 */
      getActivityId() {
        const { promotions } = this
        if (!promotions || !promotions.length) return ''
        let pro
        for (let i = 0; i < promotions.length; i++) {
          let item = promotions[i]
          if (item.exchange || item.groupbuy_goods_do || item.seckill_goods_vo) {
            pro = item
            break
          }
        }
        if (!pro) return ''
        return pro.activity_id
      },
      /** 导航栏tab发生改变 */
      handleClickNavTab(index) {
        const { cm, pa } = this.offsetTop
        this.lockScroll = true
        if (index === 0) this.MixinScrollToTop(0)
        if (index === 1) this.MixinScrollToTop(cm)
        if (index === 2) this.MixinScrollToTop(pa)
        if (index === 3) this.showDisPopup = true
      },
      /** 计算滚动offset */
      handleCountOffset() {
        if (this.lockScroll) {
          setTimeout(() => {
            this.lockScroll = false
          }, 300)
          return
        }
        const sy = window.scrollY
        const { cm, pa } = this.offsetTop
        if (sy >= cm && sy < pa) {
          this.tabActive = 1
        } else if (sy >= pa) {
          this.tabActive = 2
        } else {
          this.tabActive = 0
        }
      }
    },
    updated() {
      this.$nextTick(() => {
        this.offsetTop = {
          cm: $('#goods-comments').offset().top - 54,
          pa: $('.params-container').offset().top - 54
        }
      })
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleCountOffset)
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
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
      z-index: 99 !important;
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
    .params-container {
      z-index: 1;
      /deep/ .van-tabs__wrap {
        border-bottom: 1px solid #f5f5f5;
      }
      .goods-intro {
        width: 100%;
        overflow-x: hidden;
        padding: 10px;
        box-sizing: border-box;
        /deep/ img {
          max-width: 100%;
        }
      }
    }
  }
  /deep/ .van-goods-action {
    a:hover {
      color: #666
    }
    .van-icon-like {
      color: $color-main
    }
  }
  /deep/ .buy-disabled {
    background-color: #e5e5e5;
    pointer-events:none;
  }
  .goods-auth {
    text-align: center;
    /deep/ .van-button {
      margin-right: 20px;
    }
    img {
      margin-top: 50px;
      width: 100%;
    }
  }
</style>
