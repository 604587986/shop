<template>
  <div>
    <en-table-layout
      toolbar
      pagination
      row-key="id"
      :stripe="false"
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleMallAnnoun">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="page_title" label="页面标题"/>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.sort" controls-position="right" :min="1" :max="99999999"/>
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditMallAnnoun(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteMallAnnoun(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import * as API_MallAnnoun from '@/api/mallAnnouncement'

  export default {
    name: 'mallAnnouncement',
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
      this.GET_MallAnnounList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_MallAnnounList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_MallAnnounList()
      },

      /** 添加商城公告 */
      handleMallAnnoun() {},

      /** 编辑商城公告 */
      handleEditMallAnnoun(index, row) {},

      /** 删除商城公告 */
      handleDeleteMallAnnoun(index, row) {},

      /** 获取商城公告列表 */
      GET_MallAnnounList() {
        this.loading = true
        API_MallAnnoun.getMallAnnounList(this.params).then(response => {
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
  .el-input-number {
    max-width: 120px;
  }
</style>
