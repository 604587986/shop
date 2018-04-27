<template>
  <div class="container">
    <!--规格选择-->
    <sku-item
      :skuData="skuData"
      :goodsId="goodsId"
      :categoryId="categoryId"
      v-on:updateSkuItem="updateSkuItem"
      v-on:updateSkuInfo="updateSkuInfo"
    ></sku-item>
    <!--规格设置-->
    <div class="sku-settings">
      <label class="label-sku">规格明细：</label>
      <sku-table
        :skuInfo="skuInfo"
        :tablehead="tablehead"
      ></sku-table>
    </div>
  </div>
</template>

<script>
  import * as API_goodsSku from '@/api/goodsSkuInfo'
  import SkuItem from './SkuItem'
  import SkuTable from './SkuTable'
  import { cloneObj } from '@/utils/index'
  export default {
    name: 'EnSkuSelector',
    components: {
      SkuItem, SkuTable
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
        /** 标准数据  请求回来的数据库现存规格数据 */
        skuData: [],

        /** 操作数据 用来渲染表格用的 */
        skuInfo: [],

        /** 固定表头数据 */
        origin: {
          sn: '',
          weight: '',
          stock: '',
          cost: '',
          price: ''
        },

        /** 定制表头*/
        tablehead: []
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
      updateSkuItem(item) {
        const _params = {
          ...item
        }
        // API_goodsSku.saveCustomSkuItem(this.categoryId, _params).then(response => {
        //   this.skuData = response.data
        // }).catch(error => {
        //   console.log(error)
        // })
      },
      updateSkuInfo(target) {
        this.skuInfo = target
        /** 构造表格数据 转换数据格式 */
        const obj = this.skuInfo.map((key) => {
          return key.value_list.map((item) => {
            let map = new Map().set(key.spec_name, item.spec_value || '')
            let obj = Object.create(null)
            for (let [k, v] of map) {
              obj[k] = v
            }
            return obj
          })
        })
        this.skuInfo = this.printResult(this.combination(...obj))
        console.log(this.skuInfo, '表格数据')
      },

      /** 重组数据*/
      combination() {
        var heads = arguments[0]
        for (let i = 1, len = arguments.length; i < len; i++) {
          if (arguments[i].length) {
            heads = this.addNewType(heads, arguments[i])
          }
        }
        return heads
      },

      /** 递归方法 */
      addNewType(heads, choices) {
        let result = []
        for (var i = 0, len = heads.length; i < len; i++) {
          for (var j = 0, lenj = choices.length; j < lenj; j++) {
            if (Array.isArray(heads[i])) {
              var _result = cloneObj(heads[i])
              _result.push(choices[j])
              result.push(_result)
            } else {
              result.push([heads[i], choices[j]])
            }
          }
        }
        return result
      },

      /** 打印方法 */
      printResult(result) {
        for (let i = 0, len = result.length; i < len; i++) {
          if (Array.isArray(result[i])) {
            result[i] = Object.assign({ }, ...result[i], this.origin)
          } else {
            result[i] = Object.assign({ }, result[i], this.origin)
          }
        }
        this.tablehead = Object.keys(result[0])
        return result
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>
  .container {
    margin-left: 0;
    padding-left: 0;
  }

  .sku-settings {
    border: 1px solid #e5e5e5;
    padding: 10px;
    position: relative;
    .label-sku {
      position: absolute;
      top: -5px;
      left: -7%;
      z-index: 100;
      color: #606266;
    }
  }
</style>
