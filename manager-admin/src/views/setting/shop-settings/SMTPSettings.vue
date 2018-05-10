<template>
  <div>
    <en-tabel-layout
      :table-data="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddSmtp">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="host" label="HOST"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="send_count" label="今日发信数"/>
        <el-table-column prop="max_count" label="最大发信数"/>
        <el-table-column prop="mail_from" label="Form"/>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSmtp(scope.$index, scope.row)">修改</el-button>
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
    </en-tabel-layout>
    <el-dialog
      :title="smtpForm.id ? '编辑SMTP' : '添加SMTP'"
      :visible.sync="dialogSmtpVisible"
      width="500px">
      <el-form :model="smtpForm" :rules="smtpRules" ref="smtpForm" size="small" label-width="120px">
        <el-form-item label="HOST" prop="host">
          <el-input v-model="smtpForm.host"/>
        </el-form-item>
        <el-form-item label="PORT" prop="port">
          <el-input v-model="smtpForm.port"/>
        </el-form-item>
        <el-form-item label="启用SSL" prop="open_ssl">
          <el-radio-group v-model="smtpForm.open_ssl">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="smtpForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="smtpForm.password"/>
        </el-form-item>
        <el-form-item label="每日最大发信数" prop="max_count">
          <el-input v-model="smtpForm.max_count"/>
        </el-form-item>
        <el-form-item label="From" prop="from">
          <el-input v-model="smtpForm.from"/>
        </el-form-item>
        <el-form-item label="测试" :error="test_email_error">
          <el-input v-model="test_email">
            <el-button slot="append" @click="handleSendTestEmail">
              <svg-icon icon-class="send" style="margin-right: 2px" />测试一下
            </el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSmtpVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSmtpForm('smtpForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Smtp from '@/api/smtp'
  import { TableLayout } from '@/components'
  import regExp from '@/framework/RegExp'
  export default {
    name: 'SMTPSettings',
    components: {
      [TableLayout.name]: TableLayout
    },
    data() {
      const required = (message, trigger) => ({ required: true, message, trigger: trigger || 'blur' })
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
        /** smtp 表单 */
        smtpForm: {
          open_ssl: 1
        },
        /** smtp 表单规则*/
        smtpRules: {
          host: [required('请输入HOST')],
          port: [
            required('请输入PORT'),
            { validator: (rule, value, callback) => {
              /^[1-9]\d*$/.test(value) ? callback() : callback(new Error('PORT应为正整数！'))
            } }
          ],
          username: [required('请输入用户名')],
          password: [required('请输入密码')],
          max_count: [
            required('请输入每日最大发信数'),
            { validator: (rule, value, callback) => {
              /^[1-9]\d*$/.test(value) ? callback() : callback(new Error('发信数应为正整数！'))
            } }
          ],
          from: [required('请输入From字段')]
        },
        /** smtp表单 dialog */
        dialogSmtpVisible: false,
        /** 测试邮箱 */
        test_email: '',
        /** 测试邮件错误信息 */
        test_email_error: ''
      }
    },
    mounted() {
      this.GET_SmtpList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SmtpList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SmtpList()
      },

      /** 添加smtp */
      handleAddSmtp() {
        this.dialogSmtpVisible = true
      },

      /** 修改smtp */
      handleEditSmtp(index, row) {
        this.smtpForm = row
        this.dialogSmtpVisible = true
      },

      /** 提交是smtp表单 */
      submitSmtpForm(formName) {
        this.$refs[formName].validate(valid => {
          const { id } = this.smtpForm
          if (valid) {
            if (id) {
              API_Smtp.editSmtp(id, this.smtpForm).then(response => {
                this.dialogSmtpVisible = false
                this.$refs[formName].resetFields()
                this.$message.success('修改成功！')
                this.tableData.filter(item => item.id === id)[0] = response
              })
            } else {
              API_Smtp.addSmtp(this.smtpForm).then(response => {
                this.dialogSmtpVisible = false
                this.$refs[formName].resetFields()
                this.$message.success('保存成功！')
                this.GET_SmtpList()
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 发送测试邮件 */
      handleSendTestEmail() {
        const { test_email, smtpForm } = this
        this.$refs['smtpForm'].validate(valid => {
          if (valid) {
            if (!regExp.email.test(test_email)) {
              this.test_email_error = '邮箱地址格式不正确！'
              return false
            }
            this.test_email_error = ''
            const params = { ...smtpForm, email: test_email }
            API_Smtp.sendTestEmail(params).then(response => {
              this.$message.success('测试邮件发送成功，请查收！')
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取smtp列表 */
      GET_SmtpList() {
        this.loading = true
        API_Smtp.getSmtpList(this.params).then(response => {
          this.loading = false
          this.tableData = response
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
