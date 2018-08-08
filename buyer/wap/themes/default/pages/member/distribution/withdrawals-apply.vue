<template>
  <div id="withdrawals-apply">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li><nuxt-link to="./withdrawals-apply">提现申请</nuxt-link></li>
      </ul>
    </div>
    <div class="recommend-container">
    </div>
  </div>
</template>

<script>
  import { RegExp } from '~/ui-utils'
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'withdrawals-apply',
    data() {
      const checkApplyMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('提现金额不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(value)) {
            callback(new Error('请输入正整数或者两位小数'))
          } else {
              callback()
          }
        }, 1000)
      }
      return {
        /** 申请表单 */
        applyWithdrawalsForm: {
          /** 可提现金额 */
          can_rebate: 0,

          /** 提现金额 */
          apply_money: 0,

          /** 备注 */
          remark: ''
        },

        /** 申请规则校验 */
        applyWithdrawalsRules: {
          apply_money: [
            { required: true, message: '提现金额不能为空', trigger: 'blur' },
            { validator: checkApplyMoney, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.GET_canRebate()
    },
    methods: {
      /** 获取可提现金额 */
      GET_canRebate() {
        API_distribution.getWithdrawalsCanRebate().then(response => {
          this.applyWithdrawalsForm.can_rebate = response.message
        })
      },

      /** 申请提现 */
      handleApplyWithdrawals(FormName) {
        this.$refs[FormName].validate((valid) => {
          if (valid) {
            const _params = {
              apply_money: this.applyWithdrawalsForm.apply_money,
              remark: this.applyWithdrawalsForm.remark
            }
            API_distribution.applyWithdrawals(_params).then(response => {
              this.$message.success('已提交申请，请耐心等待。。。')
            })
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/.el-form {
    padding: 25px;
    .el-form-item {
      .el-form-item__label {
        font-size: 13px;
      }
      .el-form-item__content {
        width: 250px;
      }
    }
  }
</style>
