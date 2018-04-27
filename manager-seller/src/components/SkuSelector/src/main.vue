<template>
  <div class="container">
    <!--规格选择-->
    <sku-item
      :skuData="skuData"
      :goodsId="goodsId"
      :categoryId="categoryId"
      v-on:updateSkuItem="updateSkuItem"
      v-on:updateSkuVal="updateSkuVal"
      v-on:updateSkuInfo="updateSkuInfo"
    ></sku-item>
    <!--规格设置-->
    <div class="sku-settings">
      <label class="label-sku">规格明细：</label>
      <sku-table
        :skuInfo="skuInfo"
        :tablehead="tablehead"
        v-on:skuTable="skuTable"
      ></sku-table>
    </div>
  </div>
</template>

<script>
  import * as API_goodsSku from '@/api/goodsSkuInfo'
  import SkuItem from './SkuItem'
  import SkuTable from './SkuTable'
  import { cloneObj, deepClone } from '@/utils/index'
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
          quantity: '',
          cost: '',
          price: ''
        },

        /** 定制表头*/
        tablehead: [],

        /** 表格要抛出的固定属性数据 */
        fixData: [],

        /** 规格选择部分跑出的计算数据 */
        choiceData: []
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
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 更新用户自定义规格项 */
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

      /** 更新用户自定义规格值 */
      updateSkuVal(target) {
        console.log(target, 456)
      },

      /** 更新表格部分skuInfo数据 */
      skuTable(target) {
        this.fixData = target.map(key => {
          let { cost, price, quantity, sn, weight, spec_value_id } = key
          return { cost, price, quantity, sn, weight, spec_value_id }
        })

        /** 在此出可抛出最终数据 */
      },

      /** 更新规格选择部分skuInfo数据 */
      updateSkuInfo(target) {
        /** 计算选择数据 */
        let _target = target.map(key => { return key.value_list })
        this.choiceData = this.printResult(this.combination(..._target))[0]

        /** 计算表格数据 */
        this.skuInfo = target
        /** 构造表格数据 转换数据格式 */
        const obj = this.skuInfo.map((key) => {
          return key.value_list.map((item) => {
            let map = new Map().set(key.spec_name, item.spec_value || '').set('spec_value_id', item.spec_value_id)
            let obj = Object.create(null)
            for (let [k, v] of map) {
              obj[k] = v
            }
            return obj
          })
        })
        this.skuInfo = this.printResult(this.combination(...obj))[1]
        console.log(this.skuInfo)
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
        const _result = cloneObj(result)
        let _empty = []
        _empty.push(_result)
        for (let i = 0, len = result.length; i < len; i++) {
          if (Array.isArray(result[i])) {
            result[i] = Object.assign({ }, ...result[i], this.origin)
          } else {
            result[i] = Object.assign({ }, result[i], this.origin)
          }
        }
        _empty.push(result)
        this.tablehead = Object.keys(result[0])
        return _empty
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
