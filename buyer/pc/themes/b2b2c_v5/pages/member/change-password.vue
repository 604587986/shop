<template>
  <div id="change-password">
    <div v-if="step === 1" class="valid-mobile-container">
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
          <el-button @click="submitValForm">提交验证</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="step === 2">步骤二</div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Common from '@/api/common'
  export default {
    name: 'change-password',
    data() {
      return {
        /** 步骤 */
        step: 1,
        /** 图片验证码 表单 */
        validImgCodeForm: {
          // 图片验证码
          img_code: ''
        },
        /** 图片验证码 表单规则 */
        validImgCodeRules: {
          img_code: [ { required: true, message: '请输入图片验证码', trigger: 'blur' } ]
        },
        /** 短信验证码 表单 */
        validSmsCodeForm: {
          // 短信验证码
          sms_code: ''
        },
        /** 短信验证码 表单规则 */
        validSmsCodeRules: {
          sms_code: [ { required: true, message: '请输入短信验证码', trigger: 'blur' } ]
        },
        /** 图片验证码URL */
        valid_img_url: ''
      }
    },
    created() {
      this.getValidImgUrl()
    },
    computed: {
      ...mapGetters({
        user: 'user/user'
      })
    },
    methods: {
      /** 获取验证码URL */
      getValidImgUrl() {
        this.valid_img_url = API_Common.getValidateCodeUrl('UPDATEPASSWORDMOBILE' + this.user.mobile)
      },
      /** 发送手机验证码 */
      sendValidMobileSms() {
        return new Promise((resolve, reject) => {
          this.$refs['validImgCodeForm'].validate((valid) => {
            if (valid) {
              API_Common.sendMobileSms('UPDATEPASSWORDMOBILE', this.user.mobile, this.validImgCodeRules.img_code).then(() => {
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
        this.$refs['validMobileForm'].validate((valid) => {
          if (valid) {
            console.log(this.validMobileForm)
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
  .valid-mobile-container {
    width: 100%;
    /deep/ .el-alert--info {
      h2 { margin: 20px 0 }
      p { margin-bottom: 10px }
    }
    /deep/ .el-form {
      margin-top: 10px;
      padding-left: 24px
    }
    /deep/ .img-code {
      .el-input { width: auto }
      .el-input__inner { width: 190px }
      .el-input-group__append {
        padding: 0;
        cursor: pointer;
        img { height: 38px }
      }
    }
    /deep/ .sms-code {
      .el-input { width: auto }
      .el-input__inner { width: 190px }
    }
  }
</style>
