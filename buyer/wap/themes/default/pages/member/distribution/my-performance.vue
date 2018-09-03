<template>
  <div id="my-performance">
    <nav-bar title="我的业绩"/>
    <van-tabs v-model="active" sticky @change="tabChange">
      <van-tab v-for="(item, index) in performance" :key="index" :title="item.title">
        <!--结算单信息-->
        <div class="settlement-total-container">
          <span>本期佣金：<span class="color-red">{{ settlementTotal.push_money | unitPrice('¥') }}</span></span>
          <span>付款总金额：<span class="color-red">{{ settlementTotal.final_money | unitPrice('¥') }}</span></span>
          <span>订单退款金额：<span class="color-red">{{ settlementTotal.return_order_money | unitPrice('¥') }}</span></span>
        </div>
        <!--头部-->
        <van-cell>
          <template>
            <div class="cell-content">
              <span>订单编号</span>
              <span>结算时间</span>
              <span>结算金额</span>
              <span>操作</span>
            </div>
          </template>
        </van-cell>
        <!--数据-->
        <van-list v-if="performanceList && performanceList.length">
          <van-cell  v-for="item in performanceList" :key="item">
            <template slot>
              <div class="cell-content">
                <span>{{ item.sn }}</span>
                <span style="color: #f42424;">{{ item.apply_money | unitPrice('¥') }}</span>
                <span>{{ item.status | withdraealsStatus }}</span>
                <span @click="handleDetails(item)">查看详情</span>
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
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'my-performance',
    data() {
      return {
        /** 当前面板序列 */
        active: 0,

        /** 我的结算单 */
        settlementTotal: {
          push_money: 0,

          final_money: 0,

          return_order_money: 0
        },

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

        /** 业绩列表 */
        performanceList: [],

        performance: [
          { title: '与我相关的订单'},
          { title: '与我相关的退货单'},
          { title: '我的历史业绩'}
        ]
      }
    },
    mounted() {
      this.GET_SettlementTotal()
    },
    methods: {
      /** 获取与我相关的结算单信息 */
      GET_SettlementTotal(){
        API_distribution.getSettlementTotal({member_id: this.$route.query.member_id || 0}).then(response => {
          this.settlementTotal = response
          this.params = {
            ...this.params,
            member_id: response.member_id,
            bill_id: response.total_id
          }
          this.GET_RelevantList()
        })
      },

      /** 标签改变时触发 */
      tabChange(index) {
        switch (index) {
          case 0: this.GET_RelevantList()
            break
          case 1: this.GET_RelevantRefundList()
            break
          case 2: this.GET_MyhistoryList()
            break
        }
      },

      /** 当前页数发生改变 */
      handleCurrentPageChange(cur) {
        this.params.page_no = cur
        switch (this.active) {
          case 0: this.GET_RelevantList()
            break
          case 1: this.GET_RelevantRefundList()
            break
          case 2: this.GET_MyhistoryList()
            break
        }
      },

      /** 获取与我相关的订单记录 */
      GET_RelevantList() {
        API_distribution.getRelevantList(this.params).then(response => {
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.performanceList = response.data
        })
      },

      /** 获取我的历史业绩记录 */
      GET_MyhistoryList() {
        API_distribution.getMyHistoryList(this.params).then(response => {
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.performanceList = response.data
        })
      },

      /** 获取与我相关的退款单记录 */
      GET_RelevantRefundList() {
        API_distribution.getRelevantRefundList(this.params).then(response => {
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.performanceList = response.data
        })
      },

      /** 查看详情 */
      handleDetails(item) {

      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .cell-content {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
  }
  .settlement-total-container {
    padding: 15px;
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    .color-red {
      color: #f42424;
    }
  }
</style>
