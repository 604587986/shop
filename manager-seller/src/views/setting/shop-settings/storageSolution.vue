<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="name" label="储存泛滥名称"/>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            {{ scope.row.is_open === 1 ? '已开启' : '已关闭' }}
            <el-button v-if="scope.row.is_open === 0" type="text" @click="handleOpenStorageSolution(scope.$index, scope.row)">开启</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditStorageSolution(scope.$index, scope.row)">设置</el-button>
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
  import * as API_StorageSolution from '@/api/storageSolution'
  import { TableLayout } from '@/components'
  export default {
    name: 'storageSolution',
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
      this.GET_StorageSolutiontList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_StorageSolutiontList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_StorageSolutiontList()
      },

      /** 开启储存方案 */
      handleOpenStorageSolution(index, row) {
        API_StorageSolution.openStorageSolutionById(row.code).then(response => {
          this.$message.success('开启成功！')
          this.GET_StorageSolutiontList()
        }).catch(error => console.log(error))
      },

      /** 配置储存方案 */
      handleEditStorageSolution(index, row) {},

      /** 获取储存方案列表 */
      GET_StorageSolutiontList() {
        this.loading = true
        API_StorageSolution.getStorageSolutionList(this.params).then(response => {
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
