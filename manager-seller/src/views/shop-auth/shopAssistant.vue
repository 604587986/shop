<template>
  <div>
    <en-table-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddShopAssistant">添加</el-button>
          <div style="margin-left: 20px; display: inline-block;font-size: 12px">
            店员状态：
            <el-select
              v-model="params.disabled"
              placeholder="请选择店员状态"
              size="mini"
              @change="GET_ShopAssistantList"
              style="width: 150px">
              <el-option label="正常" :value="0"/>
              <el-option label="已禁用" :value="-1"/>
            </el-select>
          </div>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="uname" label="店员名称"/>
        <el-table-column prop="role" label="所属角色"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column label="店员状态">
          <template slot-scope="{ row }">{{ row.user_state === 0 ? '正常' : '被禁用' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.founder !== 1"
              size="mini"
              type="primary"
              @click="handleEditShopAssistant(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="params.disabled === 0 && scope.row.founder !== 1"
              size="mini"
              type="danger"
              @click="handleDeleteShopAssistant(scope.$index, scope.row)">禁用</el-button>
            <el-button
              v-if="params.disabled === -1"
              size="mini"
              type="success"
              @click="handleRecoveryShopAssistant(scope.$index, scope.row)">恢复</el-button>
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
      :title="shopAssistantForm.clerk_id ? '编辑店员' : '添加店员'"
      :visible.sync="dialogVisible"
      width="500px"
      @open="handleDialogOpen"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="shopAssistantForm" :rules="shopAssistantRules" ref="shopAssistantForm" label-width="120px">
        <el-form-item label="店员名称" prop="uname">
          <el-input v-model="shopAssistantForm.uname" :maxlength="20" clearable placeholder="请输入店员名称"></el-input>
        </el-form-item>
        <el-form-item label="店员密码" prop="password">
          <el-input type="password" v-model="shopAssistantForm.password" :maxlength="20" clearable :placeholder="shopAssistantForm.clerk_id ? '不修改请留空' : '6-20位数字、英文字母'"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select
            v-model="shopAssistantForm.role_id"
            placeholder="请选择角色'"
            :disabled="shopAssistantForm.founder === 1"
            clearable
          >
            <el-option :label="shopAssistantForm.founder === 1 ? '店主' : '超级店员'" :value="0">
            </el-option>
            <el-option
              v-for="item in rolesOptions"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="shopAssistantForm.mobile" :maxlength="11" clearable placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="shopAssistantForm.email" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitShopAssistantForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Auth from '@/api/auth'
  import md5 from 'js-md5'
  import { RegExp } from '~/ui-utils'

  export default {
    name: 'shopAssistant',
    data() {
      return {
        // 列表loading状态
        loading: false,
        // 列表参数
        params: {
          page_no: 1,
          page_size: 10,
          disabled: 0
        },
        // 列表数据
        tableData: '',
        // 店员表单
        shopAssistantForm: {},
        // 店员表单 规则
        shopAssistantRules: {
          uname: [this.MixinRequired('请输入店员名称！')],
          password: [
            { required: true, message: '请输入店员密码！', trigger: 'bulr' },
            {
              validator: (rule, value, callback) => {
                if (this.shopAssistantForm.clerk_id && !RegExp.password.test(value)) {
                  callback(new Error('密码格式错误！'))
                } else {
                  callback()
                }
              }
            }
          ],
          role_id: [{ required: true, message: '请选择所属角色！', trigger: 'change' }],
          mobile: [
            this.MixinRequired('请输入手机号码！'),
            {
              validator: (rule, value, callback) => {
                if (!RegExp.mobile.test(value)) {
                  callback(new Error('手机号码格式有误！'))
                } else {
                  callback()
                }
              }
            }
          ],
          email: [
            this.MixinRequired('请输入邮箱地址！'),
            {
              validator: (rule, value, callback) => {
                if (!RegExp.email.test(value)) {
                  callback(new Error('邮箱地址格式有误！'))
                } else {
                  callback()
                }
              }
            }
          ]
        },
        // 店员表单 dialog
        dialogVisible: false,
        // 角色列表
        rolesOptions: []
      }
    },
    watch: {
      'shopAssistantForm.clerk_id': function(newValue) {
        this.shopAssistantRules.password[0].required = !newValue
      }
    },
    mounted() {
      this.GET_ShopAssistantList()
      // 获取角色
      API_Auth.getRoleList({ page_size: 10000 }).then(response => {
        this.rolesOptions = response.data
      })
    },
    activated() {
      // 获取角色
      API_Auth.getRoleList({ page_size: 10000 }).then(response => {
        this.rolesOptions = response.data
      })
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ShopAssistantList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ShopAssistantList()
      },

      /** 添加店员 */
      handleAddShopAssistant() {
        this.shopAssistantForm = {}
        this.dialogVisible = true
      },

      /** 编辑店员 */
      handleEditShopAssistant(index, row) {
        this.shopAssistantForm = this.MixinClone(row)
        this.dialogVisible = true
      },

      /** 删除店员 */
      handleDeleteShopAssistant(index, row) {
        this.$confirm('确定要禁用这个店员吗？', '提示', { type: 'warning' }).then(() => {
          API_Auth.deleteShopAssistant(row.clerk_id).then(() => {
            this.$message.success('禁用成功！')
            this.GET_ShopAssistantList()
          })
        }).catch(() => {})
      },
      /** 恢复被禁用店员 */
      handleRecoveryShopAssistant(index, row) {
        this.$confirm('确定要恢复这个店员吗？', '提示', { type: 'warning' }).then(() => {
          API_Auth.recoveryShopAssistant(row.clerk_id).then(() => {
            this.$message.success('恢复成功！')
            this.GET_ShopAssistantList()
          })
        }).catch(() => {})
      },
      /** dialog打开后重置form表单校验结果 */
      handleDialogOpen() {
        setTimeout(() => { this.$refs['shopAssistantForm'].clearValidate() })
      },

      /** 提交店员表单 */
      submitShopAssistantForm() {
        this.$refs['shopAssistantForm'].validate((valid) => {
          if (valid) {
            const { clerk_id } = this.shopAssistantForm
            const params = this.MixinClone(this.shopAssistantForm)
            if (params.password) params.password = md5(params.password)
            if (clerk_id) {
              API_Auth.editShopAssistant(clerk_id, params).then(() => {
                this.dialogVisible = false
                this.$message.success('修改成功！')
                this.GET_ShopAssistantList()
              })
            } else {
              API_Auth.addShopAssistant(params).then(() => {
                this.dialogVisible = false
                this.$message.success('添加成功！')
                this.GET_ShopAssistantList()
              })
            }
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },

      /** 获取店员列表 */
      GET_ShopAssistantList() {
        this.loading = true
        API_Auth.getShopAssistantList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .face-image {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
</style>
