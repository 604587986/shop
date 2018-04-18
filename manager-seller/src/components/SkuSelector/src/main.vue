<template>
  <div class="container">
    <el-button type="primary" @click="addSkuItem">添加规格项目</el-button>
    <!--规格选择-->
    <sku-item />
    <!--规格设置-->
    <div class="sku-settings">
    </div>
  </div>
</template>

<script>
  import * as API_goodsSku from '@/api/goodsSkuInfo'
  import SkuItem from './SkuItem'
  import SkuTable from './SkuTable'
  import { mapGetters } from 'vuex'
  export default {
    name: 'EnSkuSelector',
    components: {
      SkuItem, SkuTable
    },
    computed: {
      ...mapGetters([
        'skuInfo'
      ])
    },
    props: {

      /** 商品id */
      goodsId: {
        type: String,
        default: ''
      },

      /** 分类id*/
      categoryId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        /** 当前规格项*/
        currentSkuItem: '',

        /** 标准数据 */
        skuData: []
      }
    },
    mounted() {
      if (this.goodsId) {
        this.getSkuInfoByGoods()
      } else {
        this.getSkuInfoByCategory()
      }
    },
    methods: {
      /** 根据分类id获取规格信息*/
      getSkuInfoByCategory() {
        API_goodsSku.getCategorySkuList(this.params).then(response => {
          this.skuData = response.data
          console.log(this.skuData, 555)
          this.$store.dispatch('updateSkuData', this.skuData)
          this.$store.dispatch('updateSkuInfo', [])
        }).catch(error => {
          console.log(error)
        })
      },
      /** 根据商品id获取规格信息*/
      getSkuInfoByGoods() {
        API_goodsSku.getGoodsSkuList(this.params).then(response => {
          this.skuData = response.data
          this.$store.dispatch('updateSkuData', this.skuData)
          this.$store.dispatch('updateSkuInfo', [])
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 添加规格项 */
      addSkuItem() {
        this.skuInfo.push([{}])
        this.$store.dispatch('updateSkuData', this.skuData)
        this.$store.dispatch('updateSkuInfo', this.skuInfo)
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>

</style>
