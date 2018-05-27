<template>
  <div class="bg-settlement">
    <!--结算总结-->
    <div class="sum-settlement">
      <div>
        <span>本期结算</span>
        <span>本期结算无误，我要
          <el-button @click="handleConfirmSettlement" size="mini" type="success">确认</el-button>
        </span>
      </div>
      <p>
        <span>结算单号：</span>
        <span>{{ settlementData.bill_sn }}</span>
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
        <span>{{ settlementData.status_text}}</span>
      </p>
    </div>
    <!--表格-->
    <el-tabs type="border-card" @tab-click="handleToogle">
      <el-tab-pane label="订单列表">
        <en-tabel-layout
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <template slot="table-columns">
            <!--订单编号-->
            <el-table-column prop="sn" label="订单编号"/>
            <!--下单时间-->
            <el-table-column label="下单时间">
              <template slot-scope="scope">{{ scope.row.order_time | unixToDate }}</template>
            </el-table-column>
            <!--订单金额-->
            <el-table-column label="订单金额">
              <template slot-scope="scope">{{ scope.row.order_amount | unitPrice('￥') }}</template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleLookOrderDetails(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </template>
          <el-pagination
            slot="pagination"
            v-if="pageData"
            @size-change="handlePageSizeChange"
            @current-change="handlePageCurrentChange"
            :current-page="pageData.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageData.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.data_total">
          </el-pagination>
        </en-tabel-layout>
      </el-tab-pane>
      <el-tab-pane label="退款订单">
        <en-tabel-layout
        pagination
        :tableData="tableData"
        :loading="loading"
      >
        <template slot="table-columns">
          <!--退款金额-->
          <el-table-column label="退款金额">
            <template slot-scope="scope">{{ scope.row.refund_amount | unitPrice('￥') }}</template>
          </el-table-column>
          <!--退货单号-->
          <el-table-column prop="refund_sn" label="退货单号" />
          <!--订单编号-->
          <el-table-column prop="sn" label="订单编号"/>
          <!--会员名称-->
          <el-table-column prop="member_name" label="会员名称"/>
          <!--申请时间-->
          <el-table-column label="申请时间" >
            <template slot-scope="scope">{{ scope.row.order_time | unixToDate }}</template>
          </el-table-column>
        </template>
        <el-pagination
          slot="pagination"
          v-if="pageData"
          @size-change="handlePageSizeChange"
          @current-change="handlePageCurrentChange"
          :current-page="pageData.page_no"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageData.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.data_total">
        </el-pagination>
      </en-tabel-layout>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_Settlement from '@/api/settlement'
  import { TableLayout } from '@/components'

  export default {
    name: 'settlementDetail',
    components: {
      [TableLayout.name]: TableLayout
    },
    mounted() {
      this.GET_SettlementList()
      this.GET_orderList()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.billId = vm.$route.params.sn
        vm.GET_SettlementList()
        vm.GET_orderList()
        next()
      })
    },
    data() {
      return {
        /** 账单id */
        billId: this.$route.params.sn,

        /** 账单类型 */
        bill_type: '1',

        /** 结算单数据 */
        settlementData: {},

        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: [],

        /** 列表分页数据 */
        pageData: []
      }
    },
    methods: {
      /** 获取结算单数据 */
      GET_SettlementList() {
        this.loading = true
        API_Settlement.getBillDetails({ bill_id: this.billId }).then(response => {
          this.loading = false
          this.settlementData = response.data
        })
      },

      /** 确认下一步操作 */
      handleConfirmSettlement() {
      //   for(let value in this.settlementData.operate_allowable){
      //     if (this.settlementData.operate_allowable[value]) {
      //
      //     }
      //   }
        API_Settlement.confirmSettle(this.billId, {}).then(response => {
          this.settlementData = { ...response }
        })
      },

      /** 获取订单列表 */
      GET_orderList() {
        this.loading = true
        API_Settlement.getOrderList(this.billId, this.bill_type, this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SettlementList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SettlementList()
      },

      /** 查看订单详情 */
      handleLookOrderDetails(row) {
        this.$router.push({ path: `/order/detail/${row.sn}` })
      },

      /** 切换状态 */
      handleToogle(tab) {
        this.bill_type = parseInt(tab.index) === 1
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  /** 结算单背景 */
  .bg-settlement {
    margin: 10px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
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
          font-size: 25px;
          font-family: "Microsoft YaHei", "Microsoft JhengHei", SimSun, verdana, Tahoma, arial;
        }
        span:last-child {
          font-size: 12px;
        }
      }
    }
  }



</style>
