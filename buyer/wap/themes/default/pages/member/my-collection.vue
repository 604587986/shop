<template>
  <div id="my-collection">
    <nav-bar title="我的收藏"/>
    <div class="collection-container">
      <van-tabs v-model="tabActive">
        <van-tab title="收藏的商品">
          <empty-member v-if="!goodsData || !goodsData.length">暂无收藏的商品</empty-member>
          <van-list
            v-else
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >

          </van-list>
        </van-tab>
        <van-tab title="收藏的店铺">
          <empty-member v-if="!shopData || !shopData.length">暂无收藏的店铺</empty-member>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { List } from 'vant'
  Vue.use(List)
  import * as API_Members from '@/api/members'
  export default {
    name: 'my-collection',
    head() {
      return {
        title: `我的收藏-${this.site.site_name}`
      }
    },
    data() {
      return {
        // 收藏类型
        type: this.$route.query.type,
        // tab校验
        tabActive: this.$route.query.type !== 'shop' ? 0 : 1,
        // 商品收藏参数
        params_goods: {
          page_no: 1,
          page_size: 30
        },
        // 店铺收藏参数
        params_shop: {
          page_no: 1,
          page_size: 10
        },
        // 加载中
        loading: false,
        // 是否加载完成
        finished: false,
        // 商品数据
        goodsData: '',
        // 店铺数据
        shopData: ''
      }
    },
    mounted() {
      this.GET_Collection(this.type)
    },
    watch: {
      $route: function () {
        const { type } = this.$route.query
        this.type = type
        if (type !== 'shop' && !this.goodsData) this.GET_Collection('goods')
        if (type === 'shop' && !this.shopData) this.GET_Collection('shop')
      }
    },
    methods: {
      /** 加载数据 */
      onLoad() {
        const { type } = this
        if (type !== 'shop') {
          this.params_goods.page_no += 1
          this.GET_Collection('goods')
        } else {
          this.params_shop.page_no += 1
          this.GET_Collection('shop')
        }
      },
      /** 删除商品收藏 */
      handleDeleteGoodsColl(goods) {
        API_Members.deleteGoodsCollection(goods.goods_id).then(() => {
          this.GET_Collection('goods')
        })
      },
      /** 删除店铺收藏 */
      handleDeleteShopColl(shop) {
        API_Members.deleteShopCollection(shop.shop_id).then(() => {
          this.GET_Collection('shop')
        })
      },
      /** 获取收藏 */
      GET_Collection(type) {
        if (type !== 'shop') {
          API_Members.getGoodsCollection(this.params_goods).then(response => {
            this.goodsData = response
          })
        } else {
          API_Members.getShopCollection(this.params_shop).then(response => {
            this.shopData = response
          })
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
</style>
