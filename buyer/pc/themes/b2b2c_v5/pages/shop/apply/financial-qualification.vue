<template>
  <div id="financial-qualification" class="item-container">
    <div class="content">
      <el-form
        :model="finlQuafForm"
        :rules="finlQuafRules"
        ref="finlQuafForm"
        label-width="180px"
        size="small"
      >
        <h5 class="item-title">开户行银行许可证</h5>
        <el-form-item label="银行开户名：" prop="bank_account_name">
          <el-input v-model.trim="finlQuafForm.bank_account_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司银行账号：" prop="bank_number">
          <el-input v-model.trim="finlQuafForm.bank_number" :maxlength="18" clearable></el-input>
        </el-form-item>
        <el-form-item label="开户银行支行名称：" prop="bank_name">
          <el-input v-model.trim="finlQuafForm.bank_name" :maxlength="18" clearable></el-input>
        </el-form-item>
        <el-form-item label="开户银行所在地：" prop="bank_province">
          <en-address-select name="license" @changed="handleAddressSelectChanged"/>
        </el-form-item>
        <el-form-item label="开户银行许可证电子版：" prop="bank_img">
          <el-upload
            :action="MixinUploadApi"
            :on-success="res => handleImgUploadSuccess('bank_img', res)"
            :on-remove="handleImgRemove('bank_img')"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <h5 class="item-title">税务登记证</h5>
        <el-form-item label="税务登记证号：" prop="taxes_certificate_num">
          <el-input v-model.trim="finlQuafForm.taxes_certificate_num" clearable></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号：" prop="taxes_distinguish_num">
          <el-input v-model.trim="finlQuafForm.taxes_distinguish_num" clearable></el-input>
        </el-form-item>
        <el-form-item label="税务登记证电子版：" prop="taxes_certificate_img">
          <el-upload
            :action="MixinUploadApi"
            :on-success="res => handleImgUploadSuccess('taxes_certificate_img', res)"
            :on-remove="handleImgRemove('taxes_certificate_img')"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
  import * as regExp from '@/utils/RegExp'
  import { AddressSelect } from '@/components'
  export default {
    name: "financial-qualification",
    components: { [AddressSelect.name]: AddressSelect },
    data() {
      const req_rule = (message, trigger) => ({ required: true, message, trigger: trigger || 'blur' })
      const len_rule = (min, max) => ({ min, max, message: `'长度在 ${min} 到 ${max} 个字符`, trigger: 'change' })
      return {
        /** 基础信息 表单 */
        finlQuafForm: {},
        /** 基础信息 表单规则 */
        finlQuafRules: {
          bank_account_name: [ req_rule('请输入银行开户名') ],
          bank_number: [ req_rule('请输入法定代表人身份证号') ],
          bank_name: [ req_rule('请输入开户银行支行名称')],
          bank_province: [ req_rule('请选择开户银行所在地') ],
          bank_img: [ req_rule('请上传开户银行许可证电子版') ],
          taxes_certificate_num: [ req_rule('请输入税务登记证号') ],
          taxes_distinguish_num: [
            req_rule('请输入纳税人识别号'),
            {
              validator: (rule, value, callback) => {
                if (!regExp.TINumber.test(value)) {
                  callback(new Error('纳税人识别号格式有误'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          taxes_certificate_img: [ req_rule('请上税务登记证电子版') ]
        }
      }
    },
    methods: {
      /** 下一步 */
      handleNextStep() {
        this.$refs['finlQuafForm'].validate((valid) => {
          if (valid) {
            this.$router.push({ name: 'shop-apply-shop-info' })
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },
      /** 地址选择插件值发生改变 */
      handleAddressSelectChanged(object) {
        const { regions } = object
        Object.keys(regions).forEach(key => this.finlQuafForm[`bank_${key}`] = regions[key] || '')
      },
      /** 图片上传成功 */
      handleImgUploadSuccess(img_name, res) {
        this.finlQuafForm[img_name] = res
      },
      /** 图片被移除 */
      handleImgRemove(img_name) {
        this.finlQuafForm[img_name] = ''
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .item-container {
    /deep/ .el-form { width: 100% }
    /deep/ .el-form-item {
      width: 410px;
      margin-left: auto;
      margin-right: auto;
    }
    .item-title {
      font-size: 22px;
      padding-left: 20px;
      padding-bottom: 20px;
    }
    /deep/ .el-date-editor {
      width: 230px;
    }
  }
</style>
