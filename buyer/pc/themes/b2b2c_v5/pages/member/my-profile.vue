<template>
  <div id="my-profile">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">个人资料</li>
      </ul>
    </div>
    <div class="profile-container">
      <div class="avatar-box">
        <el-upload
          :action="upload_api"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvararUploadSuccess"
        >
          <img v-if="profileForm.avatar" :src="profileForm.avatar" class="avatar">
          <img v-else src="https://misc.360buyimg.com/mtd/pc/common/img/no_login.jpg" title="求真相" class="avatar">
          <div class="eidt-mask">
            <i class="el-icon-edit-outline"></i>
            <p>修改头像</p>
          </div>
        </el-upload>
        <p>头像修改在保存后生效</p>
      </div>
      <el-form :model="profileForm" :rules="profileRules" ref="profileForm" label-width="100px" style="width:350px">
        <el-form-item label="账户名称" prop="username">
          <el-input v-model="profileForm.username" size="small" clearable></el-input>
        </el-form-item>
        <!--<el-form-item label="真实姓名" prop="truename">-->
          <!--<el-input v-model="profileForm.truename" size="small" clearable></el-input>-->
        <!--</el-form-item>-->
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
      <span class="clr"></span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as API_Common from '@/api/common'
  import axios from 'axios'
  import { AddressSelect } from '@/components'
  export default {
    name: 'my-profile',
    components: {
      [AddressSelect.name]: AddressSelect
    },
    data() {
      return {
        /** 修改头像，上传API */
        upload_api: API_Common.uploadApi,
        /** 地区 */
        regions: {},
        /** 个人资料 表单 */
        profileForm: JSON.parse(JSON.stringify(this.$store.state.user.user)) || {},
        /** 个人资料 表单规则 */
        profileRules: {
          username: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
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
        const { regions } = object
        Object.keys(regions).forEach(key => this.profileForm[key] = regions[key] || '')
      },
      /** 头像上传成功 */
      handleAvararUploadSuccess(res) {
        this.profileForm.avatar = res
      },
      /** 保存资料提交表单 */
      submitProfile() {
        this.$refs['profileForm'].validate((valid) => {
          if (valid) {
            this.saveUserInfo(this.profileForm).then(() => {
              this.$message.success('修改成功！')
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      ...mapActions({
        saveUserInfo: 'user/saveUserInfoAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .profile-container {
    padding-top: 15px;
    .avatar-box {
      float: left;
      position: relative;
      margin-left: 20px;
      margin-right: 50px;
      p { text-align: center }
      .eidt-mask {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        background-color: rgba(0,0,0,.3);
        opacity: 0;
        transition: opacity .2s ease-in;
        color: #f5f7fa;
        i { font-size: 24px }
        p { font-size: 14px }
      }
      &:hover { .eidt-mask { opacity: 1 } }
      .avatar-uploader {
        /deep/ .el-upload {
          border: 1px dashed #d9d9d9;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 100%;
          :hover { border-color: #409EFF }
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 135px;
        height: 135px;
        line-height: 135px;
        text-align: center;
      }
      .avatar {
        width: 135px;
        height: 135px;
        display: block;
      }
    }
    /deep/ .el-form { float: left }
    /deep/ .el-date-editor.el-input { width: 100% }
    /deep/ .app-address { margin-top: 7px }
  }
</style>
