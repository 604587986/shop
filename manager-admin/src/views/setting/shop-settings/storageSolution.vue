<template>
  <div>
    <en-tabel-layout
      pagination
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddStorageSolution">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="name" label="储存方案名称"/>
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
        v-if="tableData"
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

        /** 储存方案列表数据 */
        tableData: ''
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

      /** 添加储存方案 */
      handleAddStorageSolution() {},

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
          this.tableData = response
        }).catch(() => (this.loading = false))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
