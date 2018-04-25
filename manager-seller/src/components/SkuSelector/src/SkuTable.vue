<template>
  <div>
    {{ skuInfo }}
    <el-table
      :data="skuInfo"
      border
      :span-method="arraySpanMethod"
      style="width: 100%">
      <el-table-column
        v-for="item in tablehead"
        :prop="item"
        :key="item"
        :label="labeltxt(item)"
        align="center"
        contenteditable="true"
      />
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'skuTable',
    props: {
      skuInfo: {
        type: Array,
        default: [{
          sn: '65656262',
          weight: 45,
          stock: 45,
          cost: '25.25',
          price: '56.32'
        }]
      },
      tablehead: {
        type: Array,
        default: []
      }
    },
    watch: {
      skuInfo: function() { // 此方法可能中毒了 不能使用箭头函数 原因不明
        this.concactArray = []
        this.skuInfo.forEach((key, index) => {
          this.concactArrayCom(index, key)
          console.log(this.concactArray, 'bjhb ')
        })
      }
    },
    mounted() {
      this.skuInfo.forEach((key, index) => {
        this.concactArrayCom(index, key)
      })
    },
    data() {
      return {
        b: 5,
        tableData: this.skuInfo,
        concactArray: []
      }
    },
    methods: {
      /** 表头文本格式化 */
      labeltxt(item) {
        let _output = ''
        switch (item) {
          case 'sn': _output = '货号'; break
          case 'weight': _output = '重量(kg)'; break
          case 'stock': _output = '库存'; break
          case 'cost': _output = '成本价'; break
          case 'price': _output = '价格(元)'; break
          default: _output = item
        }
        return _output
      },

      /** 合并数据相同的单元格 */
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex < this.tablehead.length - 5) {
          const _row = this.concactArray[rowIndex]
          const _col = _row >= 1 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      concactArrayCom(index, item) {
        console.log(index, 5555)
        let _isMerge = false
        if (index === 0) {
          this.concactArray.push(1)
        } else {
          for (let i = 0, _len = this.tablehead.length; i < _len; i++) {
            if (i < this.tablehead.length - 5) {
              this.concactArray.push(1)
              console.log(item[this.tablehead[i]], this.skuInfo[index - 1][this.tablehead[i]])
              if (item[this.tablehead[i]] !== this.skuInfo[index - 1][this.tablehead[i]]) {
                _isMerge = true
              } else {
                console.log('weishenme')
                if (!_isMerge) {
                  this.concactArray[index] += 1
                }
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>

</style>
