<template>
  <div id="find-password" class="container">
    <div class="find-container w">
      <h1>找回密码<span>请您重新填写下面的表单来获得密码</span></h1>
      <div class="find-title">
        <ul>
          <li :class="[find_mobile && 'active']" style="border: none" @click="find_mobile = true">手机找回</li>
          <li :class="[!find_mobile && 'active']" @click="find_mobile = false">邮箱找回</li>
        </ul>
      </div>
      <div class="find-content">
        <div v-show="find_mobile" class="find-item mobile">
          <el-form :model="valiMobileForm" :rules="valiMobileRules" ref="valiMobileForm" label-width="120px" style="width: 370px">
            <el-form-item label="手机号码：" prop="mobile">
              <el-input v-model="valiMobileForm.mobile" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="图片验证码：" prop="vali_code" class="vali-img">
              <el-input v-model="valiMobileForm.vali_code" :maxlength="4">
                <img src="http://data.andste.cc/developers/web/temp/images/validcode-img.png" slot="append">
              </el-input>
            </el-form-item>
          </el-form>
          <el-form :model="valiSmsForm" :rules="valiSmsRules" ref="valiSmsForm" label-width="120px" style="width: 370px">
            <el-form-item label="短信验证码：" prop="sms_code">
              <el-input v-model="valiSmsForm.sms_code" :maxlength="6">
                <en-count-down-btn :time="60" :start="sendValidMobileSms" @end="handleCountDownEnd" slot="append"/>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button class="next-btn" type="danger" @click="handleNextStep">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="!find_mobile" class="find-item email"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Form, FormItem, Input } from 'element-ui'
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  import * as regExp from '@/utils/RegExp'
  export default {
    name: 'find-password',
    layout: 'full',
    data() {
      return {
        step: 1,
        find_mobile: true, // true：手机找回 false：邮箱找回,
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
  .container {
    background: #f5f5f5;
    overflow: hidden;
    padding: 30px 0;
    .find-container {
      margin: 0 auto 10px;
      width: 794px;
      padding: 30px;
      background: #fff;
      h1 {
        font-size: 30px;
        font-weight: 600;
        color: #333;
        line-height: 1.5;
        font-family: arial,"Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei","微軟正黑體","儷黑 Pro",sans-serif;
        span {
          color: #757575;
          font-size: 12px;
          line-height: 1.5;
          margin-left: 10px;
          font-weight: normal;
        }
      }
    }
    .find-title {
      margin: 30px 0 0;
      overflow: hidden;
      width: 794px;
      ul {
        font-size: 16px;
        line-height: 1.25;
        list-style-type: none;
        margin: 0;
        width: 800px;
        overflow: hidden;
        li {
          color: #757575;
          cursor: pointer;
          float: left;
          font-size: 16px;
          line-height: 1.25;
          list-style-type: none;
          border-left: 1px solid #e0e0e0;
          width: 397px;
          text-align: center;
          &.active {
            color: #f42424;
            font-weight: 600;
          }
        }
      }
    }
    .find-content {
      display: flex;
      justify-content: center;
      border-top: 1px solid #e0e0e0;
      margin-top: 20px;
      padding: 25px 0;
      position: relative;
      width: 794px;
    }
    .find-item.mobile {
      /deep/ .vali-img .el-input-group__append { padding: 0 }
      img { height: 38px }
      .next-btn { width: 250px }
    }
  }
</style>
