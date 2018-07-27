<template>
  <div class="bg-settlement">
    <!--结算总结-->
    <div class="sum-settlement">
      <div>
        <span>本期结算</span>
        <span v-if="settlementData.operate_allowable && settlementData.operate_allowable.allow_recon" class="settlement-list">
          <span>本期结算无误，我要</span>
          <el-button @click="handleConfirmSettlement" type="primary">确认</el-button>
        </span>
      </div>
      <p>
        <span>结算单号：</span>
        <span>{{ settlementData.bill_sn }}</span>
      </p>
      <p>
        <span>起止时间：</span>
        <span>{{ settlementData.start_time | unixToDate }}  至 {{ settlementData.end_time | unixToDate }}</span>
      </p>
      <p>
        <span>出账时间：</span>
        <span>{{ settlementData.create_time | unixToDate }}</span>
      </p>
      <p>
        <span>本期应收：</span>
        <span>{{ settlementData.price | unitPrice('￥') }} = {{ settlementData.bill_price | unitPrice('￥') }} (订单金额) -
          {{ settlementData.commi_price | unitPrice('￥') }} (佣金金额) - {{ settlementData.refund_price | unitPrice('￥') }} (退单金额)
          + {{ settlementData.refund_commi_price | unitPrice('￥') }} (退还佣金) -
          {{ settlementData.cod_price | unitPrice('￥') }} (货到付款金额)
          + {{ settlementData.cod_refund_price | unitPrice('￥') }} (货到付款退款金额)</span>
      </p>
      <p>
        <span>结算状态：</span>
        <span>{{ settlementData.status_text }}</span>
      </p>
    </div>
    <!--表格-->
    <el-tabs type="border-card" @tab-click="handleToogle">
      <el-tab-pane label="订单列表">
        <en-table-layout
          pagination
          :tableData="tableData"
          :loading="loading">
          <template slot="table-columns">
            <!--订单编号-->
            <el-table-column prop="order_sn" label="订单编号"/>
            <!--下单时间-->
            <el-table-column label="下单时间">
              <template slot-scope="scope">{{ scope.row.order_time | unixToDate }}</template>
            </el-table-column>
            <!--订单金额-->
            <el-table-column label="订单金额">
              <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleLookOrderDetails(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </template>
          <el-pagination
            slot="pagination"
            v-if="pageDataPayment"
            @size-change="handlePaymentPageSizeChange"
            @current-change="handlePaymentPageCurrentChange"
            :current-page="pageDataPayment.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageDataPayment.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageDataPayment.data_total">
          </el-pagination>
        </en-table-layout>
      </el-tab-pane>
      <el-tab-pane label="退款订单">
        <en-table-layout
        pagination
        :tableData="tableData"
        :loading="loading">
        <template slot="table-columns">
          <!--退款金额-->
          <el-table-column label="退款金额">
            <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
          </el-table-column>
          <!--退货单号-->
          <el-table-column prop="refund_sn" label="退货单号" />
          <!--订单编号-->
          <el-table-column prop="order_sn" label="订单编号"/>
          <!--会员名称-->
          <el-table-column prop="member_name" label="会员名称"/>
          <!--申请时间-->
          <el-table-column label="申请时间" >
            <template slot-scope="scope">{{ scope.row.order_time | unixToDate }}</template>
          </el-table-column>
        </template>
        <el-pagination
          slot="pagination"
          v-if="pageDataRefund"
          @size-change="handleRefundPageSizeChange"
          @current-change="handleRefundPageCurrentChange"
          :current-page="pageDataRefund.page_no"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageDataRefund.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageDataRefund.data_total">
        </el-pagination>
      </en-table-layout>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_Settlement from '@/api/settlement'
  export default {
    name: 'settlementDetail',
    mounted() {
      this.billId = this.$route.params.sn
      this.GET_SettlementList()
      this.GET_orderList()
    },
    activated() {
      this.billId = this.$route.params.sn
    },
    beforeRouteUpdate(to, from, next) {
      this.billId = to.params.sn
      next()
    },
    watch: {
      billId: ['GET_SettlementList', 'GET_orderList']
    },
    data() {
      return {
        /** 账单id */
        billId: '',

        /** 账单类型 */
        bill_type: 'REFUND',

        /** 结算单数据 */
        settlementData: {},

        /** 列表loading状态 */
        loading: false,

        /** 退款单列表参数 */
        refundParams: {
          page_no: 1,
          page_size: 10
        },

        /** 订单列表参数 */
        paymentParams: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: [],

        /** 退款单列表分页数据 */
        pageDataRefund: [],

        /** 订单列表分页数据 */
        pageDataPayment: []
      }
    },
    methods: {
      /** 获取结算单数据 */
      GET_SettlementList() {
        this.loading = true
        API_Settlement.getBillDetails(this.billId, { }).then(response => {
          this.loading = false
          this.settlementData = response
        })
      },

      /** 确认下一步操作 */
      handleConfirmSettlement() {
        API_Settlement.confirmSettle(this.billId, {}).then(response => {
          this.$message.success('确认成功')
          this.GET_SettlementList()
        })
      },

      /** 获取订单列表 */
      GET_orderList() {
        this.loading = true
        let _params = {}
        switch (this.bill_type) {
          case 'REFUND':
            _params = this.refundParams
            break
          case 'PAYMENT':
            _params = this.paymentParams
            break
        }
        API_Settlement.getOrderList(this.billId, this.bill_type, _params).then(response => {
          this.loading = false
          this.tableData = response.data
          switch (this.bill_type) {
            case 'REFUND':
              this.pageDataRefund = {
                page_no: response.page_no,
                page_size: response.page_size,
                data_total: response.data_total
              }
              break
            case 'PAYMENT':
              this.pageDataPayment = {
                page_no: response.page_no,
                page_size: response.page_size,
                data_total: response.data_total
              }
              break
          }
        })
      },

      /** 退款单分页大小发生改变 */
      handleRefundPageSizeChange(size) {
        this.refundParams.page_size = size
        this.GET_orderList()
      },

      /** 退款单分页页数发生改变 */
      handleRefundPageCurrentChange(page) {
        this.refundParams.page_no = page
        this.GET_orderList()
      },

      /** 订单分页大小发生改变 */
      handlePaymentPageSizeChange(size) {
        this.paymentParams.page_size = size
        this.GET_orderList()
      },

      /** 订单分页页数发生改变 */
      handlePaymentPageCurrentChange(page) {
        this.paymentParams.page_no = page
        this.GET_orderList()
      },

      /** 查看订单详情 */
      handleLookOrderDetails(row) {
        this.$router.push({ path: `/order/detail/${row.order_sn}` })
      },

      /** 切换状态 */
      handleToogle(tab) {
        this.bill_type = parseInt(tab.index) === 1 ? 'REFUND' : 'PAYMENT'
        this.GET_orderList()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  /** 结算单背景 */
  .bg-settlement {
    margin: 10px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    /** 下一步操作 **/
    .settlement-list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
    }
    /** 结算总结 */
    .sum-settlement {
      padding: 10px;
      border: 1px solid #F1F1F1;
      background-color: #F9FAFC;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
      line-height: 30px;
      font-size: 14px;
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        span:first-child {
          font-size: 19px;
          font-family: "Microsoft YaHei", "Microsoft JhengHei", SimSun, verdana, Tahoma, arial;
        }
        span:last-child {
          font-size: 16px;
        }
      }
    }
  }



</style>
