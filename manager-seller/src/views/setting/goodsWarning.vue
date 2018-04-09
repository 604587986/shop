<template>
  <div class="bg-settings">
    <el-form :model="stockWarningForm" ref="stockWarningForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="库存预警数"
        prop="stockWarningNum"
        :rules="[
          { required: true, message: '数量不能为空' },
          { type: 'number', message: '库存预警数必须为数字值' }
        ]"
      >
        <el-input
          type="number"
          v-model.number="stockWarningForm.stockWarningNum"
          style="width: 200px;"
          auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleSaveStockWarning('stockWarningForm')">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as API_stockWarningNum from '@/api/stockWarningNum'
  export default {
    name: 'goodsWarning',
    data() {
      return {
        /** 库存预警数*/
        stockWarningForm: {
          stockWarningNum: 0
        }
      }
    },
    mounted() {
      this.GET_stockWarningNum()
    },
    methods: {
      /** 获取当前库存预警数*/
      GET_stockWarningNum() {
        API_stockWarningNum.getStockWarningNum({}).then(response => {
          this.stockWarningForm = { ...response }
        }).catch(error => {
          console.log(error)
        })
      },

      /** 保存修改 */
      handleSaveStockWarning(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_stockWarningNum.saveStockWarningNum(this.stockWarningForm).then(response => {
              this.$message.success('修改成功')
              this.GET_stockWarningNum()
            }).catch(error => {
              this.$message.success('修改失败，请稍后重试！')
              console.log(error)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .bg-settings {
    background: #fff;
    border: 1px solid #FAFAFA;
    margin: 15px;
    padding: 10px;
  }
</style>
