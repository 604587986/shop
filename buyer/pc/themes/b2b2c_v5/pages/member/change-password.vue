<template>
  <div id="change-password">
    <div v-show="step === 1" class="valid-mobile-container">
      <el-alert type="info" title="" :closable="false">
        <h2>为什么要进行身份验证？</h2>
        <p>1. 为保障您的账户信息安全，在变更账户中的重要信息时需要身份验证，感谢您的理解与支持。 </p>
        <p>2. 验证身份遇到问题？请提供用户名，手机号，历史发票，点击联系我司 在线客服 或者拨打400*****400咨询。</p>
      </el-alert>
      <el-form v-if="user" :model="validImgCodeForm" :rules="validImgCodeRules" ref="validImgCodeForm" label-width="110px">
        <el-form-item label="已验证手机：">
          <h2>{{ user.mobile | secrecyMobile }}</h2>
        </el-form-item>
        <el-form-item label="图片验证码：" prop="img_code" class="img-code">
          <el-input v-model="validImgCodeForm.img_code" placeholder="请输入图片验证码" clearable :maxlength="4">
            <img slot="append" :src="valid_img_url" @click="getValidImgUrl">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form :model="validSmsCodeForm" :rules="validSmsCodeRules" ref="validSmsCodeForm" label-width="110px">
        <el-form-item label="短信验证码：" prop="sms_code" class="sms-code">
          <el-input v-model="validSmsCodeForm.sms_code" placeholder="请输入短信验证码" clearable :maxlength="6">
            <en-count-down-btn :time="20" :start="sendValidMobileSms" @end="handleCountDownEnd" slot="append"/>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click.stop="submitValForm">提交验证</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="step === 2" class="change-password-container">
      <el-alert type="warning" title="" :closable="false">
        <h2>提示</h2>
        <p>1. 密码只能为6-20个英文字母或数字。 </p>
        <p>2. 请务必牢记您的新密码。</p>
      </el-alert>
      <el-form :model="changePasswordForm" :rules="changePasswordRules" ref="changePasswordForm" label-width="140px">
        <el-form-item label="请输入密码：" prop="password">
          <el-input v-model="changePasswordForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="请确认密码：" prop="rep_password">
          <el-input v-model="changePasswordForm.rep_password" placeholder="请确认密码" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片验证码：" prop="imgcode" class="img-code">
          <el-input v-model="changePasswordForm.imgcode" placeholder="请输入图片验证码" clearable :maxlength="4">
            <img slot="append" :src="change_img_url" @click="getChangeImgUrl">
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click.stop="submitChangeForm">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Common from '@/api/common'
  import * as API_Safe from '@/api/safe'
  export default {
    name: 'change-password',
    data() {
      return {
        /** 步骤 */
        step: 1,
        /** 图片验证码 表单 */
        validImgCodeForm: { img_code: '' }, // 图片验证码
        /** 图片验证码 表单规则 */
        validImgCodeRules: {
          img_code: [ { required: true, message: '请输入图片验证码', trigger: 'blur' } ]
        },
        /** 短信验证码 表单 */
        validSmsCodeForm: { sms_code: '' }, // 短信验证码
        /** 短信验证码 表单规则 */
        validSmsCodeRules: {
          sms_code: [ { required: true, message: '请输入短信验证码', trigger: 'blur' } ]
        },
        /** 图片验证码URL */
        valid_img_url: '',
        /** 修改密码图片证码URL */
        change_img_url: '',
        /** 修改密码 表单 */
        changePasswordForm: {
          password: '',
          rep_password: '',
          imgcode: ''
        },
        /** 修改密码 表单规则 */
        changePasswordRules: {
          password: [
            { required: true, message: '请输入新的登录密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          rep_password: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请再次输入新的登录密码'))
                } else if (value !== this.changePasswordForm.password) {
                  callback(new Error('两次输入的密码不相同'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          imgcode: [
            { required: true, message: '请输入图片验证码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.getValidImgUrl()
    },
    watch: {
      user: 'getValidImgUrl'
    },
    computed: {
      ...mapGetters({
        user: 'user'
      })
    },
    methods: {
      /** 获取图片验证码URL */
      getValidImgUrl() {
        if (!this.user) return
        this.valid_img_url = API_Common.getValidateCodeUrl(this.$store.state.uuid, 'UPDATEPASSWORDMOBILE' + this.user.mobile)
      },
      /** 获取修改密码图片验证码URL */
      getChangeImgUrl() {
        this.change_img_url = API_Common.getValidateCodeUrl(this.$store.state.uuid, 'membervalid')
      },
      /** 发送手机验证码 */
      sendValidMobileSms() {
        return new Promise((resolve, reject) => {
          this.$refs['validImgCodeForm'].validate((valid) => {
            if (valid) {
              const { mobile } = this.user
              const { img_code } = this.validImgCodeForm
              API_Safe.sendMobileSms('UPDATEPASSWORDMOBILE', mobile, img_code).then(() => {
                this.$message.success('验证码发送成功，请注意查收！')
                resolve()
              }).catch(() => {
                reject()
              })
            } else {
              this.$message.error('图片验证码不能为空！')
              reject()
            }
          })
        })
      },
      /** 倒计时结束 */
      handleCountDownEnd() {
        this.getValidImgUrl()
      },
      /** 手机验证 */
      submitValForm() {
        this.$refs['validSmsCodeForm'].validate((valid) => {
          if (valid) {
            const { mobile } = this.user
            const { sms_code } = this.validSmsCodeForm
            const { img_code } = this.validImgCodeForm
            API_Safe.validMobileSms('UPDATEPASSWORDMOBILE', mobile, sms_code, img_code).then(() => {
              setTimeout(() => {
                this.step = 2
                this.getChangeImgUrl()
              }, 200)
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 修改密码 */
      submitChangeForm() {
        this.$refs['changePasswordForm'].validate((valid) => {
          if (valid) {
            const { password, rep_password, imgcode } = this.changePasswordForm
            API_Safe.changePassword(password, rep_password, imgcode).then(() => {
              this.$message.success('修改成功！')
              setTimeout(this.logout, 300)
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      ...mapActions({
        logout: 'user/logoutAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .valid-mobile-container, .change-password-container {
    width: 100%;
    /deep/ .el-alert {
      h2 { margin: 20px 0 }
      p { margin-bottom: 10px }
    }
    /deep/ .el-form {
      margin-top: 10px;
      padding-left: 24px
    }
    /deep/ .el-input__inner { width: 190px }
    /deep/ .img-code {
      .el-input { width: auto }
      .el-input-group__append {
        padding: 0;
        cursor: pointer;
        img { height: 38px }
      }
    }
    /deep/ .sms-code {
      .el-input { width: auto }
    }
  }
</style>
