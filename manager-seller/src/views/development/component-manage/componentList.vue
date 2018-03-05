<template>
  <div class="container">
    <en-tabel-layout
      :toolbar="false"
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="name" label="组件名称"/>
        <el-table-column label="包含组件">
          <template slot-scope="scope">
            <div class="component-children">
              <span class="component-children-item" v-for="item in scope.row.children">{{ item.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="installed" label="安装状态">
          <template slot-scope="scope">{{ scope.row.installed === 1 ? '已安装' : '未安装' }}</template>
        </el-table-column>
        <el-table-column prop="enabled" label="启用状态">
          <template slot-scope="scope">{{ scope.row.enabled === 1 ? '已启用' : '未启用' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.enabled === 1"
              size="mini"
              type="warning"
              @click="handleEditDisabledComponent(scope.$index, scope.row)">停用</el-button>
            <el-button
              v-if="scope.row.enabled === 0 && scope.row.installed === 1"
              size="mini"
              type="primary"
              @click="handleDeleteEnabledComponent(scope.$index, scope.row)">启用</el-button>
            <el-button
              v-if="scope.row.enabled === 0 && scope.row.installed === 1"
              size="mini"
              type="danger"
              @click="handleDeleteUninstallComponent(scope.$index, scope.row)">卸载</el-button>
            <el-button
              v-if="scope.row.installed === 0"
              size="mini"
              type="primary"
              @click="handleDeleteInstallComponent(scope.$index, scope.row)">安装</el-button>
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
  import * as API_Component from '@/api/component'
  import { TableLayout } from '@/components'
  export default {
    name: 'componentList',
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
    created() {
      this.GET_ComponentList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ComponentList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ComponentList()
      },

      /** 启用组件 */
      handleDeleteEnabledComponent(index, row) {
        API_Component.enabledComponent(row.code).then(response => {
          this.$message.success('组件已启用！')
          this.GET_ComponentList()
        }).catch(error => console.log(error))
      },
      /** 停用组件 */
      handleEditDisabledComponent(index, row) {
        this.$confirm('确定要停用这个组件吗？', '提示', { type: 'warning' }).then(() => {
          API_Component.disabledComponent(row.code).then(response => {
            this.$message.success('组件已停用！')
            this.GET_ComponentList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },
      /** 安装组件 */
      handleDeleteInstallComponent(index, row) {
        API_Component.installComponent(row.code).then(response => {
          this.$message.success('组件安装成功！')
          this.GET_ComponentList()
        }).catch(error => console.log(error))
      },
      /** 卸载组件 */
      handleDeleteUninstallComponent(index, row) {
        this.$confirm('确定要卸载这个组件吗？', '提示', { type: 'warning' }).then(() => {
          API_Component.uninstallComponent(row.code).then(response => {
            this.$message.success('组件已卸载！')
            this.GET_ComponentList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 获取组件列表 */
      GET_ComponentList() {
        this.loading = true
        API_Component.getComponentList(this.params).then(response => {
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
  .component-children {
    max-height: 200px;
    overflow-y: scroll;
  }
  .component-children-item {
    display: block;
  }
</style>
