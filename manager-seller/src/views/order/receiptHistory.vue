<template>
  <div>
    <en-tabel-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <!--日期-->
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <!--会员名称-->
        <el-table-column prop="member_name" label="会员名称"/>
        <!--订单编号-->
        <el-table-column prop="order_sn" label="订单编号"/>
        <!--发票金额-->
        <el-table-column label="发票金额">
          <template slot-scope="scope">{{ scope.row.receipt_amount | unitPrice('￥') }}</template>
        </el-table-column>
        <!--发票类别-->
        <el-table-column prop="receipt_title" label="发票类别"/>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleOperateReceipt(scope.$index, scope.row)">查看
            </el-button>
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

    <el-dialog title="发票详情" center :visible.sync="dialogReceiptVisible" width="550px">
      <div v-for="item in viewRectiptData" class="item-receipt">
        <span class="item-receipt-label">{{ item.label }}</span>
        <span v-if="item.key === 'goods_price'" class="item-receipt-value">{{ item.value | unitPrice('￥') }}</span>
        <span v-else class="item-receipt-value">{{ item.value || '无' }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Receipt from '@/api/receipt'
  export default {
    name: 'receiptHistory',
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
        pageData: null,

        /** 当前查看的发票数据 */
        viewRectiptData: [],

        /** 查看发票详情 dialog */
        dialogReceiptVisible: false
      }
    },
    mounted() {
      this.GET_ReceiptHistory()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ReceiptHistory()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ReceiptHistory()
      },

      /** 查看发票 */
      handleOperateReceipt(index, row) {
        const keys = [
          { label: '订单编号', key: 'order_sn' },
          { label: '发票抬头', key: 'receipt_title' },
          { label: '发票类型', key: 'receipt_type_code' },
          { label: '发票内容', key: 'receipt_content' },
          { label: '发票税号', key: 'ITIN' }
        ]
        this.viewRectiptData = keys.map(item => {
          item.value = row[item.key]
          return item
        })
        this.dialogReceiptVisible = true
      },

      /** 获取发票历史 */
      GET_ReceiptHistory() {
        this.loading = true
        API_Receipt.getHistoryReceiptList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    display: none;
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .item-receipt {
    padding: 10px;

    .item-receipt-label {
      display: inline-block;
    }

    .item-receipt-value {
      display: inline-block;
      margin-left: 20px;
    }
  }
</style>
