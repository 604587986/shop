<template>
  <div id="register">
    <div class="register">
      <!-- logo -->
      <div class="index-register w">
        <div class="welcome">
          <a href="/">
            <img src="~/assets/images/logo-javashop.png" alt="logo">
          </a>
          <span>欢迎注册</span>
        </div>
        <div class="have-account">
          <span>已有账号？</span>
          <nuxt-link :to="'/login' + MixinForward">请登录></nuxt-link>
        </div>
      </div>
    </div>
    <div class="register-content">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        status-icon
        label-width="100px"
      >
        <el-form-item prop="username">
          <span slot="label">用&ensp;户&ensp;名</span>
          <el-input v-model="registerForm.username" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" prop="password">
          <el-input v-model="registerForm.password" type="password" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input v-model="registerForm.confirm_password" type="password" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :error="requiredMobile" prop="mobile">
          <el-input v-model="registerForm.mobile" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item v-if="showValidCode" label="图片验证码" :error="requiredValCode" prop="vali_code" class="vali-code">
          <el-input v-model="registerForm.vali_code" :maxlength="4">
            <img v-if="valid_code_url" :src="valid_code_url" slot="append" @click="changeValidCodeUrl">
          </el-input>
        </el-form-item>
        <el-form-item prop="sms_code" class="sms-code">
          <span slot="label">手机验证码</span>
          <el-input v-model="registerForm.sms_code" :maxlength="6">
            <en-count-down-btn :start="sendValidMobileSms" slot="append"/>
          </el-input>
        </el-form-item>
        <button type="button" class="register-btn" @click="handleConfirmRegister">立即注册</button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import { Button, Form, FormItem, Input } from 'element-ui'
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  import * as API_Common from '@/api/common'
  import * as API_Passport from '@/api/passport'
  import * as regExp from '@/utils/RegExp'
  export default {
    name: 'register',
    layout: 'full',
    data() {
      return {
        /** 会员注册 表单 */
        registerForm: {
          username: '',
          password: '',
          confirm_password: '',
          mobile: '',
          vali_code: '',
          sms_code: ''
        },
        /** 会员注册 表单规则 */
        registerRules: {
          username: [
            { required: true, message: '请输入会员昵称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符' },
            { validator: (rule, value, callback) => {
              API_Passport.checkUsernameRepeat(value).then(response => {
                  if (response.exist) {
                    callback(new Error('此用户名已被注册！'))
                  } else {
                    callback()
                  }
                }).catch(error => {
                callback(new Error('用户名重复校验出错，请稍后再试！'))
              })
            }, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              if (!regExp.password.test(value)) {
                callback(new Error('密码应为6-20位数字、英文字母！'))
              } else {
                callback()
              }
            } }
          ],
          confirm_password: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                const { password, confirm_password } = this.registerForm
                if (password !== confirm_password) {
                  callback(new Error('两次输入不一致！'))
                } else {
                  callback()
                }
              } }
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              if (!regExp.mobile.test(value)) {
                callback(new Error('手机格式有误！'))
              } else {
                API_Passport.checkMobileRepeat(value).then(response => {
                  if (response.exist) {
                    callback(new Error('手机号已被注册！'))
                  } else {
                    this.showValidCode = true
                    callback()
                  }
                }).catch(error => {
                  callback(new Error('手机号重复校验出错，请稍后再试！'))
                })
              }
            } }
          ],
          vali_code: [{ required: true, message: '请输入图片验证码' }],
          sms_code: [{ required: true, message: '请输入短信验证码' }]
        },
        requiredMobile: '',
        requiredValCode: '',
        /** 是否显示图片验证码 */
        showValidCode: false,
        /** 图片验证码URL */
        valid_code_url: API_Common.getValidateCodeUrl(this.$store.state.uuid, 'REGISTER')
      }
    },
    methods: {
      /** 获取图片验证码 */
      changeValidCodeUrl() {
        this.valid_code_url = API_Common.getValidateCodeUrl(this.$store.state.uuid, 'REGISTER')
      },
      /** 发送手机验证码异步方法 */
      sendValidMobileSms() {
        return new Promise((resolve, reject) => {
          const { mobile, vali_code } = this.registerForm
          if (!mobile) {
            this.$message.error('请输入手机号！')
            this.requiredMobile = '手机号不能为空！'
          } else if (!vali_code) {
            this.$message.error('请输入图片验证码！')
            this.requiredValCode = '图片验证码不能为空！'
          } else {
            API_Passport.sendRegisterSms(mobile, vali_code).then(() => {
              this.$message.success('短信发送成功，请注意查收！')
              resolve()
            }).catch(reject)
          }
        })
      },
      /** 立即注册 */
      handleConfirmRegister() {
        this.$refs['registerForm'].validate(valide => {
          if (valide) {
            this.registerByMobile(this.registerForm).then(() => {
              this.$router.push({ path: '/' })
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      ...mapActions({
        registerByMobile: 'user/registerByMobileAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .register .index-register{
    position: relative;
    width: 1000px;
    margin: 20px auto;
    height: 80px;
    .welcome {
      a {
        float: left;
        width: 245px;
        height: 60px;
      }
      img {
        width: 240px;
        height: 60px;
      }
      span {
        font-size: 23px;
        float: left;
        display: block;
        margin: 25px 5px;
      }
    }
    .have-account {
      font-size: 16px;
      float: right;
      margin-top: 24px;
      color: #999;
      a { color: #f42424 }
    }
  }
  .register-content {
    border-top: 2px solid #f42424;
    padding-top: 50px;
    margin-bottom: 50px;
  }
  .register-content /deep/ .el-form {
    width: 400px;
    margin: 0 auto;
    .el-form-item {
      position: relative;
      margin-bottom: 30px;
      border: 1px solid #ddd;
      &.is-error { border-color: #f56c6c }
      &.is-error .el-input__inner { color: #f56c6c }
      &:hover { border-color: #999 }
    }
    .el-input__inner { border: none }
    .el-form-item__label {
      letter-spacing: 3px;
      &:before { content: '' }
    }
    .vali-code .el-form-item__label, .sms-code .el-form-item__label {
      letter-spacing: 1px
    }
    .sms-code .el-input-group__append {
      width: 70px;
      text-align: center;
      .count-down-btn {
        padding: 0;
      }
    }
    .is-error .el-form-item__label { color: #f56c6c }
    .el-form-item__label, .el-form-item__content { line-height: 50px }
    .el-form-item__error { padding-top: 9px }
    .vali-code {
      .el-input-group__append {
        width: 100px;
        padding: 0;
        background-color: transparent;
        border: none;
        position: relative;
        img {
          width: 100%;
          height: 50px;
          cursor: pointer;
          position: absolute;
          top: -6px;
          left: 0;
        }
      }
    }
    .sms-code .el-input-group__append {
      background-color: transparent;
      border: none;
    }
    .register-btn {
      width: 400px;
      height: 52px;
      background-color: #f42424;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      border-radius: 2px;
      &:hover { background-color: #d72121 }
    }
  }
</style>
