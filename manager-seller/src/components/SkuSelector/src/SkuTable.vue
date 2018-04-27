<template>
  <div>
    <el-form  status-icon label-width="0" :rules="rules" class="demo-ruleForm">
      <el-table
      :data="tableData"
      border
      :span-method="arraySpanMethod"
      style="width: 100%">
        <el-table-column
          v-for="item in tablehead"
          v-if="item !== 'spec_value_id'"
          :key="item"
          :label="labeltxt(item)"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="checkFixed(item)">
              <span v-if="item === 'price'"> {{ scope.row[item] | unitPrice('￥')}}</span>
              <span v-else> {{ scope.row[item] }}</span>
            </span>
            <el-form-item v-else prop="scope.row[item]">
              <el-input  v-model.number="scope.row[item]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="batch-all">
      <span>批量设置：</span>
      <div v-show="isShowBatch">
        <el-button type="text" size="mini" @click="setBatch(1)">价格</el-button>
        <el-button type="text" size="mini" @click="setBatch(2)">库存</el-button>
      </div>
      <div v-show="!isShowBatch">
        <el-input v-model.number="batch" size="mini" style="width: 100px;"></el-input>
        <el-button type="text" size="mini" @click="saveBatch">保存</el-button>
        <el-button type="text" size="mini" @click="cancelBatch">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'skuTable',
    props: {
      skuInfo: {
        type: Array,
        default: [{
          sn: '',
          weight: '',
          quantity: '',
          cost: '',
          price: ''
        }]
      },
      tablehead: {
        type: Array,
        default: []
      }
    },
    watch: {
      skuInfo() {
        this.tableData = this.skuInfo
        this.concactArray = []
        this.tableData.forEach((key, index) => {
          this.concactArrayCom(index, key)
        })
      }
    },
    mounted() {
      this.tableData.forEach((key, index) => {
        this.concactArrayCom(index, key)
      })
    },
    data() {
      return {
        /** 是否显示批量设置的值 */
        isShowBatch: true,

        /** 批量设置的值 */
        batch: '',

        /** 当前操作的值 1价格 2库存 */
        activeVal: 0,

        /** 列表数据 */
        tableData: this.skuInfo,

        /** 要合并的列的位置数组 */
        concactArray: [],

        /** 固定列校验规则 */
        rules: {
          fixedValue: [
            { required: true, message: `45463` },
            { type: 'number', message: '请输入数字值' }
          ]
        }
      }
    },
    methods: {

      /** 固定表头文本格式化 */
      labeltxt(item) {
        let _output = ''
        switch (item) {
          case 'sn': _output = '货号'; break
          case 'weight': _output = '重量(kg)'; break
          case 'quantity': _output = '库存'; break
          case 'cost': _output = '成本价'; break
          case 'price': _output = '价格(元)'; break
          default: _output = item
        }
        return _output
      },

      /** 当前表头是否属于固定表头的鉴定 */
      checkFixed(item) {
        if (item === 'sn' || item === 'weight' || item === 'quantity' || item === 'cost' || item === 'price') {
          return false
        }
        return true
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

      /** 计算要合并列的位置 */
      concactArrayCom(index, item) {
        let _isMerge = false
        /** 循环列 先循环第一列 若相同则合并 再循环第二列 依次循环 若不相同 则不合并 终止循环 */
        let _currnetRow = []
        for (let i = 0, _len = this.tablehead.length - 5; i < _len; i++) {
          if (this.tablehead[i] === 'spec_value_id') {
            console.log((item[this.tablehead[i]] !== this.skuInfo[index - 1][this.tablehead[i]]))
          }
          if (index > 0 && item[this.tablehead[i]] !== this.skuInfo[index - 1][this.tablehead[i]] && this.tablehead[i] !== 'spec_value_id') {
            _currnetRow[i] = 1
            _isMerge = true
          } else if (index > 0 && !_isMerge) {
            _currnetRow[i] = 0
            let _count = 1
            while (this.concactArray[index - _count][i] === 0) {
              _count++
            }
            this.concactArray[index - _count][i] += 1
          } else { // index === 0
            _currnetRow[i] = 1
          }
        }
        this.concactArray.push(_currnetRow)
      },

      /** 批量设置价格*/
      setBatch(val) {
        this.batch = ''
        this.isShowBatch = !this.isShowBatch
        this.activeVal = val
      },

      /** 保存批量设置值 */
      saveBatch() {
        const _desc = this.activeVal === 1 ? '价格' : '库存'
        if (!this.batch || !Number.isInteger(this.batch)) {
          this.batch = ''
          this.$message.error(`请输入一个有效的库存${_desc}`)
          return
        }
        /** 批量设置 */
        this.activeVal === 1 ? this.tableData.forEach(key => { key.price = this.batch }) : this.tableData.forEach(key => { key.quantity = this.batch })
        this.isShowBatch = !this.isShowBatch
        /** 异步更新skuInfo数据 */
        this.$emit('skuTable', this.skuInfo)
      },

      /** 取消批量设置值 */
      cancelBatch() {
        this.isShowBatch = !this.isShowBatch
      },

      /** 数据改变之后 抛出数据 */
      submitData() {

      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>
  /** 批量设置 */
  .batch-all {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
</style>
