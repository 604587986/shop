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
          :action="MixinUploadApi"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="(res) => { profileForm.face = res.url }"
        >
          <img v-if="profileForm.face" :src="profileForm.face" class="avatar">
          <img v-else src="../../assets/images/icon-noface.jpg" title="求真相" class="avatar">
          <div class="eidt-mask">
            <i class="el-icon-edit-outline"></i>
            <p>修改头像</p>
          </div>
        </el-upload>
        <p>头像修改在保存后生效</p>
      </div>
      <el-form :model="profileForm" :rules="profileRules" ref="profileForm" label-width="100px" style="width:350px">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="profileForm.nickname" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" required>
          <el-radio v-model="profileForm.sex" :label="1">男</el-radio>
          <el-radio v-model="profileForm.sex" :label="0">女</el-radio>
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
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <en-region-picker :api="MixinRegionApi" :default="defaultRegions" @changed="(object) => { profileForm.region = object.last_id }"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="profileForm.address" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="profileForm.email" size="small" clearable></el-input>
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
  import Vue from 'vue'
  import { DatePicker, Upload } from 'element-ui'
  Vue.use(DatePicker)
  Vue.use(Upload)
  import { mapGetters, mapActions } from 'vuex'
  import EnRegionPicker from "@/components/RegionPicker"
  import { RegExp } from '~/ui-utils'
  export default {
    name: 'my-profile',
    components: { EnRegionPicker },
    data() {
      return {
        /** 地区 */
        regions: {},
        /** 个人资料 表单 */
        profileForm: JSON.parse(JSON.stringify(this.$store.state.user.user)) || {},
        /** 个人资料 表单规则 */
        profileRules: {
          uname: [
            this.MixinRequired('请输入真实姓名！'),
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          nickname: [
            this.MixinRequired('请输入昵称！'),
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          birthday: [this.MixinRequired('请选择生日！')],
          region: [this.MixinRequired('请选择地区！')],
          address: [
            this.MixinRequired('请输入详细地址！'),
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          email: [
            this.MixinRequired('请输入邮箱地址！'),
            { validator: (rule, value, callback) => {
                if (!RegExp.email.test(value)) {
                  callback(new Error('邮箱格式不正确！'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
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
        if(!user || !user.province_id) return null
        return [
          user.province_id,
          user.city_id,
          user.county_id,
          user.town_id
        ]
      },
      ...mapGetters({
        user: 'user'
      })
    },
    methods: {
      /** 保存资料提交表单 */
      submitProfile() {
        this.$refs['profileForm'].validate((valid) => {
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.profileForm))
            params.birthday /= 1000
            this.saveUserInfo(params).then(() => {
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
