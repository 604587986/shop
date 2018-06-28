<template>
  <div>
    <en-table-layout
      :toolbar="false"
      :tableData="tableData.data"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="member_name" label="会员名称"/>
        <el-table-column prop="create_time" :formatter="MixinUnixToDate" label="咨询日期"/>
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
    </en-table-layout>
    <el-dialog
      title="提示"
      :visible.sync="dialogReviewVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogReviewVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Member from '@/api/member'

  export default {
    name: 'goodsAskList',
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
        tableData: '',
        /** 查看的详情 */
        reviewAsk: {},
        /** 查看详情 dialog */
        dialogReviewVisible: false
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
        console.log(row)
        this.reviewAsk = row
        this.dialogReviewVisible = true
      },

      /** 删除评论 */
      handleDeleteComment(index, row) {
        this.$confirm('确定要删除这条评论吗？', '提示', { type: 'warning' }).then(() => {
          API_Member.deleteMemberAsk(row.ask_id).then(() => {
            this.$message.success('删除成功！')
            this.GET_AskList()
          })
        }).catch(() => {})
      },

      /** 获取评论列表 */
      GET_AskList() {
        this.loading = true
        API_Member.getMemberAsks(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
