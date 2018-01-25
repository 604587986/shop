<template>
  <div>
    <en-tabel-layout
      :toolbar="true"
      :pagination="true"
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddMember">添加</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            placeholder="请输入会员名或手机号"
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                  <el-input size="medium" v-model="advancedForm.goods_sn"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="email" label="电子邮箱"/>
        <el-table-column prop="register_time" label="注册时间">
          <template slot-scope="scope">{{ scope.row.register_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="上次登录时间">
          <template slot-scope="scope">{{ scope.row.last_login_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column prop="login_count_tm" label="本月登录次数"/>
        <el-table-column prop="sex" label="性别" :formatter="formatterSex"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOperateMember(scope.$index, scope.row)">操作</el-button>
          </template>
        </el-table-column>
      </template>

      <template slot="pagination-toolbar">
        <el-button type="danger" size="mini" @click="deleteMembers">删除选中</el-button>
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
    <!--添加会员 dialog-->
    <el-dialog title="添加会员" :visible.sync="dialogAddMemberVisible" width="650px">
      <el-form :model="addMemberForm" :rules="addMemberRules" ref="addMemberForm" label-width="100px" inline>
        <!--用户名-->
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="addMemberForm.uname" :maxlength="20"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addMemberForm.password"
            :type="pwdType"
            :maxlength="20"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!--昵称-->
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addMemberForm.nickname" :maxlength="20"></el-input>
        </el-form-item>
        <!--性别-->
        <el-form-item label="性别" class="form-item-sex">
          <el-radio v-model="addMemberForm.sex" :label="1">男</el-radio>
          <el-radio v-model="addMemberForm.sex" :label="0">女</el-radio>
        </el-form-item>
        <!--生日-->
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="addMemberForm.birthday"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="选择生日"
            :picker-options="{disabledDate(time) { return time.getTime() > Date.now() }}">
          </el-date-picker>
        </el-form-item>
        <!--邮箱-->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addMemberForm.email"></el-input>
        </el-form-item>
        <!--手机号码-->
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model.number="addMemberForm.mobile" :maxlength="11"></el-input>
        </el-form-item>
        <!--固定电话-->
        <el-form-item label="固定电话">
          <el-input v-model.number="addMemberForm.tel" :maxlength="20"></el-input>
        </el-form-item>
        <!--地区-->
        <el-form-item label="地区" class="form-item-region">
          <en-address-select :changed="addressSelectChanged"/>
        </el-form-item>
        <!--详细地址-->
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addMemberForm.address" :maxlength="50"></el-input>
        </el-form-item>
        <!--邮编-->
        <el-form-item label="邮编">
          <el-input v-model.number="addMemberForm.zip" :maxlength="6"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddMemberVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddMemberForm('addMemberForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Member from '@/api/member'
  import { TableLayout, TableSearch } from '@/components'
  import { AddressSelect } from '@/plugins/selector/vue'
  import { RegExp } from '@/framework'
  export default {
    name: 'memberList',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [AddressSelect.name]: AddressSelect
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
        selectedData: [],

        /** 高级搜索数据 */
        advancedForm: {},

        /** 添加会员 dialog */
        dialogAddMemberVisible: false,

        /** 添加会员 表单数据 */
        addMemberForm: {},

        /** 添加会员 表单规则 */
        addMemberRules: {
          uname: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (!RegExp.password.test(value)) {
                  callback(new Error('密码格式有误！'))
                }
              },
              trigger: 'blur'
            }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (!RegExp.email.test(value)) {
                  callback(new Error('电子邮箱格式有误！'))
                }
              },
              trigger: 'blur'
            }
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (!RegExp.mobile.test(value)) {
                  callback(new Error('手机格式格式有误！'))
                }
              },
              trigger: 'blur'
            }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { max: 50, message: '最长50个字符', trigger: 'blur' }
          ]
        },
        pwdType: 'password'
      }
    },
    mounted() {
      this.GET_MemberList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_MemberList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_MemberList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 操作会员 */
      handleOperateMember(index, row) {
        this.$router.push({ path: `/member/member-manage/edit/${row.id}` })
      },

      /** 性别格式化 */
      formatterSex(row, column, cellValue) {
        return row.sex === 1 ? '男' : '女'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_MemberList()
      },

      /** 添加会员 */
      handleAddMember() {
        this.addMemberForm = { sex: 1 }
        this.dialogAddMemberVisible = true
      },

      /** 删除选中会员 */
      deleteMembers() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何会员！')
        } else {
          this.$confirm('确定要删除这些会员吗？', '提示', { type: 'warning' }).then(() => {
            API_Member.deleteMembers(this.selectedData).then(response => {
              this.$message.success('会员删除成功！')
              this.GET_MemberList()
            }).catch(error => console.log(error))
          }).catch(() => {})
        }
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.keyword
        this.GET_MemberList()
      },

      /** 提交添加会员表单 */
      submitAddMemberForm(formName) {
        if (!this.addMemberForm.province_id) {
          this.$message.error('您还没有选择地区！')
          return false
        }

        API_Member.addMember(this.addMemberForm).then(response => {
          this.dialogAddMemberVisible = false
          this.$message.success('添加成功！')
          this.GET_MemberList()
        }).catch(error => console.log(error))

        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     API_Member.addMember(this.addMemberForm).then(response => {
        //       this.$message.success('添加成功！')
        //       this.dialogAddMemberVisible = false
        //       this.GET_MemberList()
        //     }).catch(error => console.log(error))
        //   } else {
        //     this.$message.error('表单填写有误，请检查！')
        //     return false
        //   }
        // })
      },

      /** 地区选择插件返回值 */
      addressSelectChanged(object) {
        this.addMemberForm = {
          ...this.addMemberForm,
          ...object.regions
        }
      },

      /** 显示 */
      showPwd() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      },

      /** 获取会员列表 */
      GET_MemberList() {
        this.loading = true
        API_Member.getMemberList(this.params).then(response => {
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
  .show-pwd {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
  }

  .el-date-editor.el-input {
    width: 180px;
  }

  /deep/ .form-item-sex .el-form-item__content{
    width: 180px;
  }

  /deep/ .form-item-region .el-form-item__content {
    min-width: 180px;
  }

</style>
