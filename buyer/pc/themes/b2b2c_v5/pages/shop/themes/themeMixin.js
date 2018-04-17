import Vue from 'vue'
import * as API_Shop from '@/api/shop'
import * as API_Collection from '@/api/collection'
import banner from './__banner'

export default {
  data() {
    return {
      shop_id: this.shop.shop_id
    }
  },
  props: ['shop'],
  components: {
    'en-banner': banner
  },
  mounted() {
  
  },
  methods: {
    collectionShop() {
      API_Collection.collectionShop(this.shop_id).then(() => {
        this.$message.success('收藏成功！')
      })
    }
  }
}
