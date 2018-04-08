<template>
  <div id="change-mobile">

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Common from '@/api/common'
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
        // 返回一个异步，当执行成功时，开始倒计时。
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
