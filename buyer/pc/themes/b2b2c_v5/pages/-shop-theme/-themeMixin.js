import Vue from 'vue'
import * as API_Shop from '@/api/shop'
import * as API_Members from '@/api/members'
import ShopBanner from './-shop-banner'
import ShopStar from './-shop-star'

export default {
  data() {
    return {
      shop_id: this.$route.query.shop_id
    }
  },
  props: {
    shop: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    'en-shop-banner': ShopBanner,
    'en-shop-star': ShopStar
  },
  mounted() {

  },
  methods: {
    collectionShop() {
      API_Members.collectionShop(this.shop_id).then(() => {
        this.$message.success('收藏成功！')
      })
    }
  }
}
