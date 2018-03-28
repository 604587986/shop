<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddRole">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="role_name" label="角色名称"/>
        <el-table-column prop="role_memo" label="角色描述"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditRole(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteRole(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>

      <el-pagination
        slot="pagination"
        v-if="pageData.data_total"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="params.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_AuthSetting from '@/api/authSetting'
  import { TableLayout } from '@/components'
  export default {
    name: 'roleManage',
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
        tableData: [],

        /** 列表分页数据 */
        pageData: {}
      }
    },
    created() {
      this.GET_RoleList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RoleList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RoleList()
      },

      /** 添加角色 */
      handleAddRole() {
      },

      /** 编辑角色 */
      handleEditRole(row) {
      },

      /** 删除角色 */
      handleDeleteRole(row) {
        this.$confirm('确定要删除这个角色吗？', '提示', { type: 'warning' }).then(() => {
          API_AuthSetting.deleteRole(row.role_id).then(() => {
            this.$message.success('删除成功！')
            this.GET_RoleList()
          })
        }).catch(() => {})
      },

      /** 获取管理员列表 */
      GET_RoleList() {
        this.loading = true
        API_AuthSetting.getRoleList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData.data_total = response.data_total
        }).catch(() => (this.loading = false))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
