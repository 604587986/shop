<template>
  <div id="my-profile">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">个人资料</li>
      </ul>
    </div>
    <div class="profile-container">
      <el-form :model="profileForm" :rules="profileRules" ref="profileForm" label-width="100px" style="width:350px">
        <el-form-item label="账户名称">
          <span>{{ profileForm.username }}</span>
        </el-form-item>
        <el-form-item label="真实姓名" prop="truename">
          <el-input v-model="profileForm.truename" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="profileForm.nickname" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" required>
          <el-radio v-model="profileForm.sex" :label="1">男</el-radio>
          <el-radio v-model="profileForm.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="profileForm.birthday"
            type="date"
            placeholder="请选择生日"
            :editable="false"
            :picker-options="{disabledDate(time) { return time.getTime() > Date.now() }}"
            size="small"
            clearable
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区" required>
          <en-address-select :default="defaultRegions" @changed="handleAddressSelectChanged"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="profileForm.address" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="profileForm.zip" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="submitProfile">保存资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { AddressSelect } from '@/components'
  export default {
    name: 'my-profile',
    components: {
      [AddressSelect.name]: AddressSelect
    },
    data() {
      return {
        /** 修改头像模态框显示状态 */
        crop_show: false,
        /** 地区 */
        regions: {},
        /** 个人资料 表单 */
        profileForm: JSON.parse(JSON.stringify(this.$store.state.user.user)) || {},
        /** 个人资料 表单规则 */
        profileRules: {
          truename: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      window.axios = axios
    },
    watch: {
      user(newVal, oldVal) {
        this.profileForm = JSON.parse(JSON.stringify(newVal))
      }
    },
    computed: {
      /** 默认地址 */
      defaultRegions() {
        const { user } = this.$store.state.user
        if(!user) return null
        return [
          user.province_id,
          user.city_id,
          user.region_id || -1,
          user.town_id || -1
        ]
      },
      ...mapGetters({
        user: 'user/user'
      })
    },
    methods: {
      /** 地区选择器值发生改变 */
      handleAddressSelectChanged(object) {
        console.log(object)
      },
      handleCropSuccess() {},
      handleCropUploadSuccess() {},
      /** 保存资料提交表单 */
      submitProfile() {
        this.$refs['profileForm'].validate((valid) => {
          if (valid) {
            console.log(this.profileForm)
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .profile-container {
    padding-top: 15px;
    /deep/ .el-date-editor.el-input { width: 100% }
    /deep/ .app-address { margin-top: 7px }
  }
</style>
