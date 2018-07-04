/**
 * Created by andste.cc@gmail.com on 2018/7/4.
 * 店铺头部Mixin
 */

import * as API_Shop from '@/api/shop'
import * as API_Members from "@/api/members"

export default {
  props: ['shop'],
  data() {
    return {
      shop_id: this.shop.shop_id,
      // 店铺分类【分组】
      categorys: [],
      // 店铺导航
      navs: []
    }
  },
  mounted() {
    /** 获取店铺分类【分组】 */
    API_Shop.getShopCategorys(this.shop_id).then(response => {
      this.categorys = response
    })
    /** 获取店铺导航 */
    API_Shop.getShopNav(this.shop_id).then(response => {
      this.navs = response
    })
  },
  methods: {
    /** 收藏店铺 */
    collectionShop() {
      if (!this.$store.getters.user) {
        this.$message.error('未登录不能收藏店铺！')
        return false
      }
      API_Members.collectionShop(this.shop_id).then(() => {
        this.$message.success('收藏成功！')
      })
    }
  }
}

