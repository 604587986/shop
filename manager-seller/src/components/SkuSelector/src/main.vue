<template>
  <div class="container">
    <!--规格选择-->
    <sku-item
      :goodsId="goodsId"
      :goodsSkuInfo="goodsSkuInfo"
      :categoryId="categoryId"
      @updateSkuInfo="updateSkuInfo"
    ></sku-item>
    <!--规格设置-->
    <div class="sku-settings">
      <label class="label-sku">规格明细：</label>
      <sku-table
        :skuInfo="skuInfo"
        :tablehead="tablehead"
        @skuTable="skuTable"
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
        type: [String, Number],
        default: ['', 0]
      },

      /** 分类id*/
      categoryId: {
        type: [String, Number],
        default: ['', 0]
      },

      /** 商品规格信息 */
      goodsSkuInfo: []
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

        /** 表格要抛出的固定属性数据 经过处理之后也是最终要抛出的数据*/
        fixData: [],

        /** 规格选择部分抛出的计算数据 */
        choiceData: []
      }
    },
    mounted() {
      /** 赋值给选择数据 同时计算表格数据 */
      if (Array.isArray(this.goodsSkuInfo) && this.goodsSkuInfo.length > 0) {
        this.skuInfo = this.goodsSkuInfo
        this.updateSkuInfo(this.skuInfo)
      }
    },
    methods: {
      /** 计算最终数据 */
      finalData() {
        /** 在此处可抛出最终数据 */
        this.fixData.forEach(key => {
          this.$set(key, 'spec_list', [])
          this.choiceData.forEach(item => {
            if (Array.isArray(item)) {
              const _isExit = item.some(elem => {
                return elem.spec_value_id === key.spec_value_id
              })
              if (_isExit) {
                key.spec_list = item
              }
            } else if (item.spec_value_id === key.spec_value_id) {
              key.spec_list.push(item)
            }
          })
        })
        /** 抛出最终数据 */
        this.$emit('finalSku', this.fixData)
      },

      /** 更新表格部分skuInfo数据 */
      skuTable(target) {
        this.fixData = target.map(key => {
          let { cost, price, quantity, sn, weight, spec_value_id } = key
          return { cost, price, quantity, sn, weight, spec_value_id }
        })
        this.finalData()
      },

      /** 更新规格选择部分skuInfo数据 */
      updateSkuInfo(target) {
        /** 计算选择数据 */
        let _target = target.map(key => { return key.value_list })
        this.choiceData = this.printResult(this.combination(..._target))[0]

        /** 计算表格数据 */
        this.skuInfo = target
        /** 构造表格数据 转换数据格式 */
        if (this.skuInfo.length === 0) {
          return
        }
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
        // 完成规格选择和计算之后 可抛出一次最终数据
        this.skuTable(this.skuInfo)
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
        this.tablehead = Object.keys(result[0]).filter(key => {
          return key !== 'spec_value_id'
        })
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
