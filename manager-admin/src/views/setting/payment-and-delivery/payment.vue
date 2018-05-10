<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      :tableData="tableData.data"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="name" label="支付方式"/>
        <el-table-column label="已启用PC">
          <template slot-scope="scope">{{ scope.row.pc_enable === 'YES' ? '已启用' : '未启用' }}</template>
        </el-table-column>
        <el-table-column prop="wap_enable" label="已启用WAP">
          <template slot-scope="scope">{{ scope.row.wap_enable === 'YES' ? '已启用' : '未启用' }}</template>
        </el-table-column>
        <el-table-column prop="app_enable" label="已启用APP">
          <template slot-scope="scope">{{ scope.row.app_enable === 'YES' ? '已启用' : '未启用' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditPayment(scope.$index, scope.row)">配置</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="params.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.data_total">
      </el-pagination>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_Payment from '@/api/payment'
  import { TableLayout } from '@/components'
  export default {
    name: 'payment',
    components: {
      [TableLayout.name]: TableLayout
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
        tableData: null
      }
    },
    mounted() {
      this.GET_PaymentList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_PaymentList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_PaymentList()
      },

      /** 配置支付方式 */
      handleEditPayment(index, row) {},

      /** 获取短信网关列表 */
      GET_PaymentList() {
        this.loading = true
        API_Payment.getPaymentList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
