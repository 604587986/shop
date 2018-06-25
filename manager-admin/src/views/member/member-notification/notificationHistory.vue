<template>
  <div>
    <en-table-layout
      :pagination="true"
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleReleaseNotification">发布</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <!--<el-table-column type="selection" width="100"/>-->
        <el-table-column prop="title" label="标题"/>
        <el-table-column label="通知类型">
          <template slot-scope="scope">{{ scope.row.type | typeFilter }}</template>
        </el-table-column>
        <el-table-column label="发送时间">
          <template slot-scope="scope">{{ scope.row.send_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column prop="content" label="通知内容" width="500"/>
        <!--<el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleRecoverMember(scope.$index, scope.row)">恢复</el-button>
          </template>
        </el-table-column>-->
      </template>

      <!--<template slot="pagination-toolbar">
        <el-button type="primary" size="mini" @click="recoverMembers">恢复选中</el-button>
      </template>-->
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
    <el-dialog
      title="发布商城通知"
      :visible.sync="dialogNotificationVisible"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="notificationForm" :rules="notificationRules" ref="notificationForm" label-width="100px">
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="notificationForm.title" :maxlength="20" placeholder="标题在20字以内"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入通知内容"
            v-model="notificationForm.content"
            :maxlength="2000">
          </el-input>
        </el-form-item>
        <el-form-item label="通知标题">
          <el-radio-group v-model="notificationForm.type">
            <el-radio :label="0">全站</el-radio>
            <el-radio :label="1">指定会员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNotificationVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNotificationForm('notificationForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Notification from '@/api/notification'

  export default {
    name: 'notificationHistory',
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
        selectedData: [],

        /** 发布商城通知 dialog */
        dialogNotificationVisible: false,

        /** 发布商城通知 表单 */
        notificationForm: { type: 0 },

        /** 发布商城通知 表单规则 */
        notificationRules: {
          title: [
            { required: true, message: '请输入通知标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入通知内容', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.GET_NotificationList()
    },
    filters: {
      typeFilter(val) {
        return val === 1 ? '指定会员' : '全站'
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_NotificationList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_NotificationList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 发布通知 */
      handleReleaseNotification() {
        this.notificationForm = { type: 0 }
        this.dialogNotificationVisible = true
      },

      /** 发布通知 表单提交 */
      submitNotificationForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_Notification.releaseNotification(this.notificationForm).then(response => {
              this.dialogNotificationVisible = false
              this.$message.success('发布成功！')
              this.GET_NotificationList()
            }).catch(error => console.log(error))
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取回收站会员列表 */
      GET_NotificationList() {
        this.loading = true
        API_Notification.getNotificationList(this.params).then(response => {
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
