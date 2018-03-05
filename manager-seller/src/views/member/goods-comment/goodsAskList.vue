<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="true"
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>
        <el-table-column prop="member_name" label="会员名称"/>
        <el-table-column label="咨询论日期">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column prop="content" label="咨询内容" width="500"/>
        <el-table-column label="审核状态">
          <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleViewComment(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteComment(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>

      <template slot="pagination-toolbar">
        <el-button type="danger" size="mini" @click="deleteComments">删除选中</el-button>
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
  import * as API_Comment from '@/api/comment'
  import { TableLayout } from '@/components'
  export default {
    name: 'goodsAskList',
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
        pageData: null,

        /** 被选数据 */
        selectedData: []
      }
    },
    mounted() {
      this.GET_AskList()
    },
    filters: {
      statusFilter(val) {
        switch (val) {
          case 0: return '审核中'
          case 1: return '审核通过'
          case 2: return '审核未通过'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_AskList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_AskList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 查看评论详情 */
      handleViewComment(index, row) {
        this.GET_CommentDetail(row.id)
      },

      /** 删除评论 */
      handleDeleteComment(index, row) {
        this.$confirm('确定要删除这条评论吗？', '提示', { type: 'warning' }).then(() => {
          this.DELETE_Comment(row.id)
        }).catch(() => {})
      },

      /** 批量删除 */
      deleteComments() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何评论！')
        } else {
          this.$confirm('确定要删除这些评论吗？', '提示', { type: 'warning' }).then(() => {
            this.DELETE_Comment(this.selectedData)
          }).catch(() => {})
        }
      },

      /** 获取评论详情 */
      GET_CommentDetail(id) {
        API_Comment.getAskDetail(id).then(response => {
          console.log(response)
        }).catch(error => console.log(error))
      },

      /** 删除评论 */
      DELETE_Comment(ids) {
        API_Comment.deleteAsk(ids).then(response => {
          this.$message.success('删除成功！')
          this.GET_AskList()
        }).catch(error => console.log(error))
      },

      /** 获取评论列表 */
      GET_AskList() {
        this.loading = true
        API_Comment.getAskList(this.params).then(response => {
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
