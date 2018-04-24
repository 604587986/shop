<template>
  <div id="basic-info" class="item-container">
    <h2 class="title">基本信息</h2>
    <div class="content">
      <el-form
        :model="basicInfoForm"
        :rules="basicInfoRules"
        ref="basicInfoForm"
        label-width="120px"
        style="width: 350px"
        size="small"
        class="basic-info-form"
      >
        <el-form-item label="公司名称：" prop="company_name">
          <el-input v-model="basicInfoForm.company_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司地址：" prop="compant_address">
          <el-input v-model="basicInfoForm.compant_address" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司电话：" prop="compant_phone">
          <el-input v-model="basicInfoForm.compant_phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司邮箱：" prop="compant_email">
          <el-input v-model="basicInfoForm.compant_email" clearable></el-input>
        </el-form-item>
        <el-form-item label="员工总数：" prop="employee_num">
          <el-input v-model="basicInfoForm.employee_num" clearable>
            <el-button slot="append">人</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="注册资金：" prop="reg_money">
          <el-input v-model="basicInfoForm.reg_money" clearable>
            <el-button slot="append">万</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="联系人姓名：" prop="link_name">
          <el-input v-model="basicInfoForm.link_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="link_phone">
          <el-input v-model="basicInfoForm.link_phone" :maxlength="11" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="next-btns">
      <el-button size="small" @click="$router.back()">上一步</el-button>
      <el-button size="small" @click="handleNextStep">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Form, FormItem, Input, InputNumber } from 'element-ui'
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(InputNumber)
  import * as regExp from '@/utils/RegExp'
  export default {
    name: "basic-info",
    data() {
      const req_rule = (message) => ({ required: true, message, trigger: 'blur' })
      const len_rule = (min, max) => ({ min, max, message: `'长度在 ${min} 到 ${max} 个字符`, trigger: 'blur' })
      return {
        /** 基础信息 表单 */
        basicInfoForm: {},
        /** 基础信息 表单规则 */
        basicInfoRules: {
          company_name: [ req_rule('请输入公司名称'), len_rule(1, 20) ],
          compant_address: [ req_rule('请输入公司地址'), len_rule(1, 100) ],
          compant_phone: [ req_rule('请输入公司电话'), len_rule(6, 11)],
          compant_email: [
            req_rule('请输入公司邮箱'),
            { validator: (rule, value, callback) => {
              if (!regExp.email.test(value)) {
                callback(new Error('邮箱格式不正确！'))
              } else {
                callback()
              }
              },
              trigger: 'blur'
            }
          ],
          employee_num: [
            req_rule('请输入员工人数'),
            { validator: (rule, value, callback) => {
              if (!regExp.integer.test(value)) {
                callback(new Error('员工人数应为正整数，且不为零！'))
              } else {
                callback()
              }
              },
              trigger: 'blur'
            }
          ],
          reg_money: [
            req_rule('请输入注册金额'),
            { validator: (rule, value, callback) => {
                if (!regExp.integer.test(value)) {
                  callback(new Error('注册资金应为正整数，且不为零！'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          link_name: [
            req_rule('请输入联系人姓名'),
            len_rule(1, 20)
          ],
          link_phone: [
            req_rule('请输入联系人电话'),
            { validator: (rule, value, callback) => {
                if (!regExp.mobile.test(value)) {
                  callback(new Error('联系人电话格式不正确！'))
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
    methods: {
      /** 下一步 */
      handleNextStep() {
        this.$refs['basicInfoForm'].validate((valid) => {
          if (valid) {
            this.$router.push({ name: 'shop-apply-auth-info' })
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .content {
    display: flex;
    justify-content: center;
    .basic-info-form {
      padding-bottom: 35px;
    }
  }
</style>
