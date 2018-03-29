<template>
  <div>
    <en-tabel-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="goods_name" label="商品名称"/>
        <el-table-column label="活动时间">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time | unixToDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.examine_status === 1">审核中</span>
            <span v-if="scope.row.examine_status === 2">通过</span>
            <span v-if="scope.row.examine_status === 0">驳回</span> <br>
            <el-button
              v-if="scope.row.examine_status === 0"
              type="text"
              @click="lookReason(scope.row)">（查看原因）</el-button>
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
  import * as API_activityGoods from '@/api/activityGoods'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'activityGoodsData',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
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
      this.GET_ActivityGoodsList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ActivityGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ActivityGoodsList()
      },

      /** 获取活动商品信息*/
      GET_ActivityGoodsList() {
        this.loading = true
        API_activityGoods.getActivityGoddsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 查看原因 */
      lookReason(row) {
        this.$alert(row.reject_reason, '驳回原因')
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }
</style>
