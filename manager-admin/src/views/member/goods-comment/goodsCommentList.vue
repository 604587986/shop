<template>
  <div>
    <en-table-layout
      :toolbar="false"
      :tableData="tableData.data"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="member_name" label="会员名称"/>
        <el-table-column prop="create_time" :formatter="MixinUnixToDate" label="评论日期"/>
        <el-table-column label="评价">
          <template slot-scope="scope">{{ scope.row.grade | gradeFilter }}</template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" width="500"/>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleViewComments(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteComments(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>

      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="tableData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.data_total">
      </el-pagination>
    </en-table-layout>
    <el-dialog
      title="查看评论详情"
      :visible.sync="dialogReviewVisible"
      width="50%"
    >
      <el-form :model="reviewComments">
        <el-form-item label="评论内容：">
          <br>
          <span style="color: #409EFF">{{ reviewComments.content }}</span>
          <div v-if="reviewComments.images && reviewComments.images.length">
            <a v-for="(image, index) in reviewComments.images" :href="image" :key="index" target="_blank">
              <img :src="image" style="max-width: 150px;height: 80px;display: inline-block;margin-right: 10px">
            </a>

          </div>
        </el-form-item>
        <template v-if="reviewComments.reply_status === 1">
          <el-form-item label="商家回复：">
            <br>
            <span style="color: #FF5722">{{ reviewComments.reply.content || '暂无回复' }}</span>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogReviewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Member from '@/api/member'

  export default {
    name: 'goodsCommentList',
    data() {
      return {
        // 列表loading状态
        loading: false,
        // 列表参数
        params: {
          page_no: 1,
          page_size: 10
        },
        // 列表数据
        tableData: '',
        // 查看评论 dialog
        dialogReviewVisible: false,
        // 查看评论
        reviewComments: {}
      }
    },
    mounted() {
      this.GET_CommentList()
    },
    filters: {
      gradeFilter(val) {
        switch (val) {
          case 'bad':
            return '差评'
          case 'neutral':
            return '中评'
          default:
            return '好评'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_CommentList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_CommentList()
      },

      /** 查看评论详情 */
      handleViewComments(index, row) {
        this.reviewComments = row
        this.dialogReviewVisible = true
      },

      /** 删除评论 */
      handleDeleteComments(index, row) {
        this.$confirm('确定要删除这条评论吗？', '提示', { type: 'warning' }).then(() => {
          API_Member.deleteMemberComments(row.comment_id).then(() => {
            this.$message.success('删除成功！')
            this.GET_CommentList()
          })
        }).catch(() => {})
      },

      /** 获取评论列表 */
      GET_CommentList() {
        this.loading = true
        API_Member.getMemberComments(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
