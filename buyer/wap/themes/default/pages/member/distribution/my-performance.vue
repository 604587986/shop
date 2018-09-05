<template>
  <div id="my-performance">
    <nav-bar title="我的业绩"/>
    <van-tabs v-model="active" sticky @change="tabChange">
      <van-tab v-for="(item, index) in performance" :key="index" :title="item.title">
        <!--结算单信息-->
        <div class="settlement-total-container">
          <span>本期佣金:<span class="color-red">{{ settlementTotal.push_money | unitPrice('¥') }}</span></span>
          <span>付款总金额:<span class="color-red">{{ settlementTotal.final_money | unitPrice('¥') }}</span></span>
          <span>订单退款金额:<span class="color-red">{{ settlementTotal.return_order_money | unitPrice('¥') }}</span></span>
        </div>
        <!--头部-->
        <van-cell>
          <template>
            <div class="cell-content">
              <span v-for="(row, $index) in cellTitles" :key="$index">{{ row.title }}</span>
            </div>
          </template>
        </van-cell>
        <!--数据-->
        <van-list v-if="performanceList && performanceList.length">
          <van-cell  v-for="(item, _index) in performanceList" :key="_index">
            <template slot>
              <div class="cell-content">
                <!--订单编号-->
                <span >{{ item.sn }}</span>
                <!--订单金额-->
                <span v-if="item.orer_price">{{ item.orer_price | unitPrice('¥') }}</span>
                <!--会员名称-->
                <span v-if="item.member_name">{{ item.member_name }}</span>
                <!--会员级别-->
                <span v-if="item.level">{{ item.level }}</span>
                <!--会员返利-->
                <span v-if="item.point">{{ item.point }}</span>
                <!--返利金额-->
                <span v-if="item.price" style="color: #f42424;">{{ item.price | unitPrice('¥') }}</span>
                <!--下单时间-->
                <span v-if="item.create_time">{{ item.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</span>
                <!--结算时间-->
                <span v-if="item.end_time">{{ item.end_time | unixToDate('yyyy-MM-dd') }}</span>
                <!--结算金额-->
                <span v-if="item.final_money" style="color: #f42424;">{{ item.final_money | unitPrice('¥') }}</span>
                <!--操作-->
                <span v-if="active === 2" @click="handleDetails(item)">详情</span>
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
        ],

        /** 结算单id */
        billId: '',

        /** 表头信息 */
        cellTitles: []
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
          this.billId = response.total_id
          this.params = {
            ...this.params,
            member_id: response.member_id,
            bill_id: response.total_id
          }
          switch (this.active) {
            case 0: this.GET_RelevantList()
              this.cellTitles = [
                { title: '订单编号'},
                { title: '订单金额'},
                { title: '会员名称'},
                { title: '会员级别'},
                { title: '会员返利'},
                { title: '返利金额'},
                { title: '下单时间'}
              ]
              break
            case 1: this.GET_RelevantRefundList()
              this.cellTitles = [
                { title: '订单编号'},
                { title: '订单金额'},
                { title: '会员名称'},
                { title: '会员级别'},
                { title: '会员返利'},
                { title: '返利金额'},
                { title: '下单时间'}
              ]
              break
            case 2: this.GET_MyhistoryList()
              this.cellTitles = [
                { title: '订单编号'},
                { title: '结算时间'},
                { title: '结算金额'},
                { title: '操作'}
              ]
              break
          }
        })
      },

      /** 标签改变时触发 */
      tabChange(index) {
        this.active = index
        switch (index) {
          case 0: this.GET_RelevantList()
            this.cellTitles = [
              { title: '订单编号'},
              { title: '订单金额'},
              { title: '会员名称'},
              { title: '会员级别'},
              { title: '会员返利'},
              { title: '返利金额'},
              { title: '下单时间'}
            ]
            break
          case 1: this.GET_RelevantRefundList()
            this.cellTitles = [
              { title: '订单编号'},
              { title: '订单金额'},
              { title: '会员名称'},
              { title: '会员级别'},
              { title: '会员返利'},
              { title: '返利金额'},
              { title: '下单时间'}
            ]
            break
          case 2: this.GET_MyhistoryList()
            this.cellTitles = [
              { title: '订单编号'},
              { title: '结算时间'},
              { title: '结算金额'},
              { title: '操作'}
            ]
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
        this.active = 0
        this.params = {
          ...this.params,
          member_id: item.member_id,
          bill_id: this.billId
        }
        this.GET_RelevantList()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .settlement-total-container {
    padding: 15px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    .color-red {
      color: #f42424;
    }
  }
  /deep/ .van-cell {
    padding: 10px 0;
    div.cell-content {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 12px;
        display: inline-block;
        text-align: center;
      }
      span:first-child {
        width: 30%;
      }
      span:nth-child(2) {
        width: 20%;
      }
      span:nth-child(3) {
        width: 20%;
      }
      span:nth-child(3) {
        width: 20%;
      }
    }
  }
</style>
