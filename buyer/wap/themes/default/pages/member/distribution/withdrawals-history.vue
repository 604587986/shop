<template>
  <div id="withdrawals-history">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li><nuxt-link to="./withdrawals-history">提现记录</nuxt-link></li>
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
    name: 'withdrawals-history',
    data() {
      return {
        /** 分页请求参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 分页信息 */
        pageData: {
          page_no: 1,
          page_size: 10,
          data_total: 0
        },

        /** 提现记录列表 */
        withdrawalsList: [],

        /** 是否显示详情 */
        isShowDialog: false,

        /** 当前行的对象 */
        currentRow: {}
      }
    },
    mounted() {
      this.GET_WithdrawalsList()
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentPageChange(cur) {
        this.params.page_no = cur
        this.GET_WithdrawalsList()
      },

      /** 获取提现记录 */
      GET_WithdrawalsList() {
        API_distribution.getWithdrawalsList(this.params).then(response => {
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.withdrawalsList = response.data
        })
      },

      /** 查看详情 */
      lookDetails(row) {
        this.isShowDialog = true
        this.currentRow = row
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .recommend-container {
    div {
      font-size: 12px;
    }
  }
  /deep/ .el-dialog__body {
    padding-top: 10px;
    & > div {
      margin: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
