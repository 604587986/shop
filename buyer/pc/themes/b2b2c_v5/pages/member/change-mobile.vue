<template>
  <div id="change-mobile">
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
    <div v-show="step === 2" class="change-mobile-container">
      <el-alert type="info" title="" :closable="false">
        <h2>为什么要验证手机？</h2>
        <p>1. 验证手机可加强账户安全，您可以使用已验证手机快速找回密码或支付密码。 </p>
        <p>2. 已验证手机可用于接收账户余额变动提醒。</p>
      </el-alert>
      <el-form :model="changeMobileForm" :rules="changeMobileRules" ref="changeMobileForm" label-width="160px">
        <el-form-item label="请输入手机号：" prop="mobile">
          <el-input v-model="changeMobileForm.mobile" placeholder="请输入手机号" :maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="changeCodeForm" :rules="changeCodeRules" ref="changeCodeForm" label-width="160px">
        <el-form-item label="请输入短信验证码：" prop="mobile_code">
          <el-input v-model="changeCodeForm.mobide_code" placeholder="请输入短信验证码" auto-complete="off">
            <en-count-down-btn :time="20" :start="sendChangeMobileSms" @end="handleCountDownEnd" slot="append"/>
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
  import * as regExp from '@/utils/RegExp'
  export default {
    name: 'change-mobile',
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
        /** 更换手机 表单 */
        changeMobileForm: { mobile: '' }, // 手机号
        /** 更换手机 表单规则 */
        changeMobileRules: {
          mobile: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请输入手机号'))
                } else if (!regExp.mobile.test(value)) {
                  callback(new Error('手机号码格式不正确'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        },
        changeCodeForm: { mobile_code: '' }, // 手机验证码
        changeCodeRules: {
          mobile_code: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getValidImgUrl()
    },
    watch: {
      user: 'getValidImgUrl'
    },
    computed: {
      ...mapGetters({
        user: 'user/user'
      })
    },
    methods: {
      /** 获取图片验证码URL */
      getValidImgUrl() {
        if (!this.user) return
        this.valid_img_url = API_Common.getValidateCodeUrl('BINDINGMOBILE' + this.user.mobile)
      },
      /** 发送手机验证码 */
      sendValidMobileSms() {
        return new Promise((resolve, reject) => {
          this.$refs['validImgCodeForm'].validate((valid) => {
            if (valid) {
              const { mobile } = this.user
              const { img_code } = this.validImgCodeForm
              API_Safe.sendMobileSms('BINDINGMOBILE', mobile, img_code).then(() => {
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
              }, 200)
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 修改手机号 发送验证码 */
      sendChangeMobileSms() {
        return new Promise((resolve, reject) => {
          this.$refs['changeMobileForm'].validate((valid) => {
            if (valid) {
              API_Safe.sendMobileSms().then(() => {
                this.$message.success('验证码发送成功，请注意查收！')
                resolve()
              }).catch(error => reject(error))
            } else {
              this.$message.error('请输入有效的手机号码！')
              reject()
            }
          })
        })
      },
      /** 确认修改 */
      submitChangeForm() {
        this.$refs['changeCodeForm'].validate((valid) => {
          if (valid) {
            API_Safe.validMobileSms().then(() => {
              API_Safe.bindMobile().then(() => {
                // ...
              })
            })
          } else {
            this.$message.error('请输入手机验证码！')
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .valid-mobile-container, .change-mobile-container {
    width: 100%;
    /deep/ .el-alert {
      h2 { margin: 20px 0 }
      p { margin-bottom: 10px }
    }
    /deep/ .el-form {
      margin-top: 10px;
      padding-left: 24px
    }
    /deep/ .el-input { width: auto }
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
      .el-input__inner { width: 190px }
    }
  }
</style>
