<template>
  <div id="register">
    <div class="register">
      <!-- logo -->
      <div class="index-register w">
        <div class="welcome">
          <a target="_blank" href="/">
            <img src="~assets/images/logo-javashop.png" alt="logo">
          </a>
          <span>欢迎注册</span>
        </div>
        <div class="have-account">
          <span>已有账号？</span>
          <a href="/login">请登录></a>
        </div>
      </div>
    </div>
    <div class="register-steps clearfix">
      <ul>
        <li :class="[step === 1 && 'active']">
          <i>1</i>
          <span>验证手机号</span>
        </li>
        <li :class="[step === 2 && 'active']">
          <i>2</i>
          <span>填写账号信息</span>
        </li>
        <li :class="[step === 3 && 'active']">
          <i>3</i>
          <span>注册成功</span>
        </li>
      </ul>
    </div>
    <div class="register-content">
      <div v-show="step === 1" class="item vali-mobile">
        <el-form :model="valiMobileForm" :rules="valiMobileRules" ref="valiMobileForm" label-width="120px">
          <el-form-item label="手机号码：" prop="mobile">
            <el-input v-model="valiMobileForm.mobile" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="图片验证码：" prop="vali_code" class="vali-img">
            <el-input v-model="valiMobileForm.vali_code" :maxlength="4">
              <img src="http://data.andste.cc/developers/web/temp/images/validcode-img.png" slot="append" class="vali-img">
            </el-input>
          </el-form-item>
        </el-form>
        <el-form :model="valiSmsForm" :rules="valiSmsRules" ref="valiSmsForm" label-width="120px">
          <el-form-item label="短信验证码：" prop="sms_code">
            <el-input v-model="valiSmsForm.sms_code" :maxlength="6">
              <en-count-down-btn :time="20" :start="sendValidMobileSms" @end="handleCountDownEnd" slot="append"/>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button class="next-btn" type="danger" @click="handleNextStep">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="step === 2" class="item input-account">
        <el-form :model="inputAccountForm" :rules="inputAccountRules" ref="inputAccountForm" label-width="120px">
          <el-form-item label="账户：" prop="username">
            <span>Andste</span>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input v-model="inputAccountForm.password" type="password" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="rep_password">
            <el-input v-model="inputAccountForm.rep_password" type="password" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="会员昵称：" prop="nickname">
            <el-input v-model="inputAccountForm.nickname" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button class="submit-btn" type="danger" @click="handleSubmitAccount">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="step === 3" class="register-success">
        <h3>恭喜您注册成功，登录账户为：<span style="color: #f42424;">Andste</span></h3>
        <h4>绑定手机：<span style="color: #f42424;">18519052335</span>（此手机可用于登录、修改或找回密码）</h4>
        <div class="bind-box">
          <div class="bind-app">
            <div class="bind-logo">
              <img src="../assets/images/icon-weibo.jpg" title="微博绑定" alt="微博绑定" style="width:55px;">
            </div>
            <div class="bind-other">
              <p class="bind-title">快速绑定微博账号 </p>
              <a class="bind-btn" href="#">立即绑定</a>
            </div>
          </div>
          <div class="bind-app">
            <div class="bind-logo">
              <img src="../assets/images/icon-qq.jpg" title="QQ绑定" alt="QQ绑定">
            </div>
            <div class="bind-other">
              <p class="bind-title">快速绑定QQ账号 </p>
              <a class="bind-btn" href="#">立即绑定</a>
            </div>

          </div>
          <div class="bind-app">
            <div class="bind-logo">
              <img src="../assets/images/icon-weixin.jpg" title="微信绑定" alt="微信绑定">
            </div>
            <div class="bind-other">
              <p class="bind-title">快速绑定微信账号 </p>
              <a class="bind-btn" href="#">立即绑定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button, Form, FormItem, Input } from 'element-ui'
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  import * as regExp from '@/utils/RegExp'
  export default {
    name: 'register',
    layout: 'full',
    data() {
      return {
        /** 注册步骤 */
        step: 1,
        /** 校验手机 表单 */
        valiMobileForm: {},
        /** 校验手机 表单规则 */
        valiMobileRules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (!regExp.mobile.test(value)) {
                  callback(new Error('手机格式有误！'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          vali_code: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
        },
        /** 短信验证码 表单 */
        valiSmsForm: {
          sms_code: ''
        },
        /** 短信验证码 表单规则 */
        valiSmsRules: {
          sms_code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
        },
        /** 填写账号信息 表单 */
        inputAccountForm: {},
        /** 填写账号信息 表单规则 */
        inputAccountRules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (!regExp.password.test(value)) {
                  callback(new Error('密码应为6-20位数字、英文字母！'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          rep_password: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                const { password, rep_password} = this.inputAccountForm
                if (password !== rep_password) {
                  callback(new Error('两次输入不一致！'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          nickname: [
            { required: true, message: '请输入会员昵称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 1o 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /** 发送手机验证码异步方法 */
      sendValidMobileSms() {
        return new Promise((resolve, reject) => {
          this.$refs['valiMobileForm'].validate((valid) => {
            if (valid) {
              setTimeout(() => {
                resolve()
              }, 3000)
            } else {
              this.$message.error('表单填写有误，请检查！')
              return false
            }
          })
        })
      },
      handleCountDownEnd() {
        console.log('倒计时结束>...')
      },
      /** 下一步 */
      handleNextStep() {
        this.$refs['valiMobileForm'].validate((valid) => {
          if (valid) {
            this.$refs['valiSmsForm'].validate((valid) => {
              if (valid) {
                setTimeout(() => {
                  this.step = 2
                }, 2000)
              } else {
                this.$message.error('请填写短信验证码！')
                return false
              }
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 提交表单 */
      handleSubmitAccount() {
        this.$refs['inputAccountForm'].validate((valid) => {
          if (valid) {
            setTimeout(() => {
              this.step = 3
            }, 2000)
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
  @import "../assets/styles/register";
</style>
