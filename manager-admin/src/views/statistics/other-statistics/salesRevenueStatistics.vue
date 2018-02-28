<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>订单周期：</span>
          <en-year-month-picker @changed="handleYearMonthChanged" :optional="false"/>
        </div>
      </div>
      <en-tabel-layout
        :toolbar="false"
        :pagination="true"
        :tableData="tableData"
        :loading="loading"
      >
        <template slot="table-columns">
          <el-table-column prop="name" label="商品名称"/>
          <el-table-column prop="t_num" label="商品数量" width="100"/>
          <el-table-column label="商品单价" width="150">
            <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
          </el-table-column>
          <el-table-column label="订单金额" width="150">
            <template slot-scope="scope">{{ scope.row.t_price | unitPrice('￥') }}</template>
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
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { YearMonthPicker, TableLayout } from '@/components'
  export default {
    name: 'salesRevenueStatistics',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [TableLayout.name]: TableLayout
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          year: '',
          month: ''
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null
      }
    },
    created() {},
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SalesRevenueStatisticsData()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SalesRevenueStatisticsData()
      },

      /** 年月发生改变 */
      handleYearMonthChanged(object) {
        this.params.year = object.year
        this.params.month = object.month
        this.GET_SalesRevenueStatisticsData()
      },

      /** 获取销售收入统计 */
      GET_SalesRevenueStatisticsData() {
        this.loading = true
        API_Statistics.getSalesRevenueStatistics(this.params).then(response => {
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
  .container {
    background-color: #fff;
    padding: 10px;
  }
  .chart-header {
    padding: 0 10px;
  }
  .chart-header-item {
    display: inline-block;
    margin-right: 30px;
  }
</style>
