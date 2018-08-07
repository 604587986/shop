<template>
  <div id="withdrawals-setting">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li><nuxt-link to="./withdrawals-setting">提现设置</nuxt-link></li>
      </ul>
    </div>
    <div class="recommend-container">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'withdrawals-setting',
    data() {
      return {
        /** 申请表单 */
        setWithdrawalsForm: {
          /** 户名 */
          member_name: '',

          /** 银行名称 */
          bank_name: '',

          /** 开户行号 */
          opening_name: '',

          /** 银行卡号 */
          bank_card: ''
        }
      }
    },
    mounted() {
      this.GET_withdrawalsParams()
    },
    methods: {
      /** 获取可提现金额 */
      GET_withdrawalsParams() {
        API_distribution.getWithdrawalsParams().then(response => {
          this.setWithdrawalsForm = { ...response }
        })
      },

      /** 保存设置 */
      handleReserveWithdrawalsParams() {
        API_distribution.reserveWithdrawalsParams(this.setWithdrawalsForm).then(response => {
          this.$message.success('保存成功')
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
