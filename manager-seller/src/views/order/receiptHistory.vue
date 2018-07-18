<template>
  <div>
    <en-table-layout
      pagination
      :tableData="tableData"
      :loading="loading">
      <template slot="table-columns">
        <!--日期-->
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <!--会员名称-->
        <el-table-column prop="member_name" label="会员名称"/>
        <!--订单编号-->
        <el-table-column prop="sn" label="订单编号"/>
        <!--发票金额-->
        <el-table-column label="发票金额">
          <template slot-scope="scope">{{ scope.row.need_pay_money | unitPrice('￥') }}</template>
        </el-table-column>
        <!--发票类别-->
        <el-table-column prop="receipt_type" label="发票类别"/>
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
    </en-table-layout>
    <el-dialog title="发票详情" center :visible.sync="dialogReceiptVisible" width="550px">
      <div v-for="item in viewRectiptData" class="item-receipt">
        <span class="item-recitem-receipt-labeleipt-label">{{ item.label }}</span>
        <span v-if="item.key === 'goods_price'" class="item-receipt-value">{{ item.value | unitPrice('￥') }}</span>
        <span v-else class="item-receipt-value">{{ item.value || '无' }}</span>
      </div>
      <en-table-layout :tableData="goodsList">
        <template slot="table-columns">
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <a :href="`${HTTP_URL}/${scope.row.goods_id}`" target="_blank" style="color: #00a2d4;">{{ scope.row.goods_name }}</a>
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template slot-scope="scope"> {{ scope.row.price }}</template>
          </el-table-column>
          <el-table-column  prop="" label="数量" />
        </template>
      </en-table-layout>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Receipt from '@/api/receipt'
  export default {
    name: 'receiptHistory',
    data() {
      return {
        /** 域名配置 */
        HTTP_URL: `${process.env.HTTP_URL}/goods`,

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
        pageData: [],

        /** 当前查看的发票数据 */
        viewRectiptData: [],

        /** 当前发票所关联的商品列表信息 */
        goodsList: [],

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
          { label: '发票抬头', key: 'receipt_title' },
          { label: '发票税号', key: 'duty_invoice' },
          { label: '收件地址', key: 'receipt_content' },
          { label: '发票明细', key: 'receipt_content' }
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
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
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
