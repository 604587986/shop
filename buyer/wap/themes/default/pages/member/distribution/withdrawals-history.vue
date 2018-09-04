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
    <van-popup v-model="isShowDialog" class="pop-details">
      <i @click="closeDialog"> &times; </i>
      <div>
        <p>提现详情</p>
        <ul>
          <li><span>提现金额</span>: <span style="color: #f42424;">{{ currentRow.apply_money | unitPrice('¥') }}</span></li>
          <li><span>当前状态</span>: <span>{{ currentRow.status | withdraealsStatus }}</span></li>
          <li><span>备注信息</span>: <span>{{ currentRow.apply_remark }}</span></li>
          <li><span>提现日志</span>: <span>{{ currentRow.transfer_remark }}</span></li>
          <li><span>审核备注</span>: <span>{{ currentRow.inspect_remark }}</span></li>
        </ul>
      </div>
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
      },

      /** 关闭弹框 */
      closeDialog() {
        this.isShowDialog = false
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
  /** 弹层 */
  .pop-details {
    width: 80%;
    padding: 10px;
    position: relative;
    & > i {
      position: absolute;
      top: 25px;
      right: 15px;
      z-index: 2000;
      display: inline-block;
    }
    p {
      margin: 10px 15px;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #303133
    }
    ul {
      li {
        list-style:none;
        margin: 8px 0;
        padding: 0 8px;
        span {
          font-size: 14.5px;
        }
      }
    }
  }
</style>
