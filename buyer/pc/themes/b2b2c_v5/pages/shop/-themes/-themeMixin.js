import Vue from 'vue'
import * as API_Shop from '@/api/shop'
import * as API_Members from '@/api/members'
import ShopSildes from './-shop-sildes'
import ShopStar from './-shop-star'

export default {
  data() {
    return {
      shop_id: this.$route.params.id,
      categorys: []
    }
  },
  props: {
    shop: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    'en-shop-sildes': ShopSildes,
    'en-shop-star': ShopStar
  },
  mounted() {
    /** 获取店铺分类【分组】 */
    console.log(this)
    API_Shop.getShopCategorys(this.shop_id).then(response => {
      console.log(response)
    })
  },
  methods: {
    collectionShop() {
      API_Members.collectionShop(this.shop_id).then(() => {
        this.$message.success('收藏成功！')
      })
    }
  }
}
