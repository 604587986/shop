<template>
  <div>
    <!--结算总结-->
    <div>
      <div>
        <span>本期结算</span>
        <span>本期结算无误，我要
          <el-button @click="handleConfirmSettlement" size="mini" type="success">确认</el-button>
        </span>
      </div>
      <p>
        <span>结算单号：</span>
        <span>B20171201582232</span>
        <span>2017-11-01  至 2017-11-30</span>
      </p>
      <p>
        <span>出账时间</span>
        <span>2017-12-01 00:10</span>
      </p>
      <p>
        <span>本期应收：</span>
        <span>￥21,943.00 = ￥21,943.00 (订单金额) - ￥0.00 (佣金金额) - ￥0.00 (退单金额) + ￥0.00 (退还佣金)</span>
      </p>
      <p>
        <span>结算状态：</span>
        <span>已出账</span>
      </p>
    </div>
    <en-tabel-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <!--订单号-->
        <el-table-column prop="sn" label="订单编号"/>
        <!--创建时间-->
        <el-table-column label="下单时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">{{ scope.row.order_amount | unixToDate }}</template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleOperateRefund(scope.$index, scope.row)">查看</el-button>
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
  </div>
</template>

<script>
  import * as API_refund from '@/api/refund'
  import { TableLayout } from '@/components'

  export default {
    name: 'settlementDetail',
    components: {
      [TableLayout.name]: TableLayout
    },
    mounted() {
      this.GET_RefundOrder()
    },
    filters: {
      refuseTypeFilter(val) {
        return val === 'return_money' ? '退款' : '退货'
      }
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RefundOrder()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RefundOrder()
      },

      /** 确认结算 */
      handleConfirmSettlement() {

      },

      /** 获取结算单数据 */
      GET_SettlementList() {
        this.loading = true
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 20px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }
</style>
