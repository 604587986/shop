<template>
  <div id="withdrawals-setting">
    <nav-bar title="提现设置"/>
    <div class="withdrawals-container">
      <van-cell-group>
        <van-field
          label-align="right"
          v-model="setWithdrawalsForm.member_name"
          placeholder="请输入户名"
          label="户名:"/>
        <van-field
          label-align="right"
          v-model="setWithdrawalsForm.bank_name"
          placeholder="请输入所属银行"
          label="所属银行:" />
        <van-field
          v-model="setWithdrawalsForm.opening_num"
          label="开户行号:"
          placeholder="请输入开户行号"
          label-align="right"/>
        <van-field
          v-model="setWithdrawalsForm.bank_card"
          label="银行卡号:"
          placeholder="请输入银行卡号"
          label-align="right"/>
        <div style="padding:15px 0 15px 114px;">
          <van-button type="danger" size="small" @click="handleReserveWithdrawalsParams">保存设置</van-button>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
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
          opening_num: '',

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
  .withdrawals-container {
    padding-top: 46px;
  }
  /deep/ .van-field__control {
    padding-left: 16px;
  }
</style>
