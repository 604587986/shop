import Vue from 'vue'
import * as API_Shop from '@/api/shop'
import * as API_Members from '@/api/members'
import ShopSildes from './-shop-sildes'
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
    'en-shop-sildes': ShopSildes,
    'en-shop-star': ShopStar
  },
  methods: {
    collectionShop() {
      API_Members.collectionShop(this.shop_id).then(() => {
        this.$message.success('收藏成功！')
      })
    }
  }
}
