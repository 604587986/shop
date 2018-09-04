<template>
  <div id="withdrawals-history">
    <nav-bar title="提现记录"/>
    <div class="withdrawals-container">
      <van-cell>
        <template>
          <div class="cell-content">
            <span>提现时间</span>
            <span>提现金额</span>
            <span>提现状态</span>
            <span>操作</span>
          </div>
        </template>
      </van-cell>
      <van-list v-if="withdrawalsList && withdrawalsList.length">
        <van-cell  v-for="item in withdrawalsList" :key="item">
          <template slot>
            <div class="cell-content">
              <span>{{ item.apply_time | unixToDate }}</span>
              <span style="color: #f42424;">{{ item.apply_money | unitPrice('¥') }}</span>
              <span>{{ item.status | withdraealsStatus }}</span>
              <span @click="lookDetails(item)">查看详情</span>
            </div>
          </template>
        </van-cell>
      </van-list>
      <van-cell v-else>
        <template>
          <div class="cell-content">
            <span>暂无数据</span>
          </div>
        </template>
      </van-cell>
    </div>
    <van-popup v-model="isShowDialog">
       <span>neiro</span>
    </van-popup>
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
        withdrawalsList: null,

        /** 是否显示详情 */
        isShowDialog: false,

        /** 当前行的对象 */
        currentRow: {}
      }
    },
    mounted() {
      this.GET_WithdrawalsList()
    },
    filters: {
      withdraealsStatus(val) {
        switch (val) {
          case 'APPLY': return '申请中'
            break
          case 'TRANSFER_ACCOUNTS': return '已转账'
            break
          case 'VIA_AUDITING': return '审核通过'
            break
          case 'FAIL_AUDITING': return '审核失败'
            break
        }
      }
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
          this.withdrawalsList = response.data
        })
      },

      /** 查看详情 */
      lookDetails(item) {
        this.isShowDialog = true
        this.currentRow = item
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .withdrawals-container {
    padding-top: 46px;
  }
  .cell-content {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
  }
</style>
