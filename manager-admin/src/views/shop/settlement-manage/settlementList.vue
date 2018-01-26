<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="username" label="账号单"/>
        <el-table-column prop="mobile" label="开始日期"/>
        <el-table-column prop="email" label="结束日期"/>
        <el-table-column label="订单金额">
          <template slot-scope="scope">{{ scope.row.register_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="收取佣金">
          <template slot-scope="scope">{{ scope.row.last_login_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column prop="login_count_tm" label="退单金额"/>
        <el-table-column prop="sex" label="退还佣金"/>
        <el-table-column prop="sex" label="本期应结"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOperateSettlement(scope.$index, scope.row)">操作</el-button>
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
  import * as API_Settlement from '@/api/settlement'
  import { TableLayout } from '@/components'
  export default {
    name: 'settlementList',
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
        tableData: null,

        /** 列表分页数据 */
        pageData: null
      }
    },
    mounted() {
      this.GET_SettlementList()
    },
    methods: {
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

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 操作结算单 */
      handleOperateSettlement(index, row) {
        console.log('操作结算单：', row)
      },

      /** 获取结算单列表 */
      GET_SettlementList() {
        this.loading = true
        API_Settlement.getSettlementList(this.params).then(response => {
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

</style>
