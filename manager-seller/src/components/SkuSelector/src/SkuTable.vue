<template>
  <div>
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
          const _row = this.concactArray[rowIndex][columnIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      concactArrayCom(index, item) {
        let _isMerge = false
        /** 循环列 先循环第一列 若相同则合并 再循环第二列 依次循环 若不相同 则不合并 终止循环 */
        let _currnetRow = []
        for (let i = 0, _len = this.tablehead.length - 5; i < _len; i++) {
          if (index > 0 && item[this.tablehead[i]] !== this.skuInfo[index - 1][this.tablehead[i]]) {
            _currnetRow[i] = 1
            _isMerge = true
          } else if (index > 0 && !_isMerge) {
            _currnetRow[i] = 0
            let _count = 1
            while (this.concactArray[index - _count][i] === 0) {
              _count++
            }
            console.log(_count, index - _count, i, this.concactArray[index - _count][i])
            this.concactArray[index - _count][i] += 1
          } else { // index === 0
            _currnetRow[i] = 1
          }
        }
        this.concactArray.push(_currnetRow)
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>

</style>
