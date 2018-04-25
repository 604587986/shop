<template>
  <div id="auth-info" class="item-container">
    <div class="content">
      <el-form
        :model="authInfoForm"
        :rules="authInfoRules"
        ref="authInfoForm"
        label-width="180px"
        size="small"
      >
        <h5 class="item-title">营业执照信息</h5>
        <el-form-item label="法定代表人姓名：" prop="legal_name">
          <el-input v-model="authInfoForm.legal_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="法定代表人身份证：" prop="legal_id">
          <el-input v-model="authInfoForm.legal_id" clearable></el-input>
        </el-form-item>
        <el-form-item label="法人身份证电子版：" prop="legal_img">
          <el-upload
            :action="MixinUploadApi"
            :on-success="res => handleImgUploadSuccess('legal_img', res)"
            :on-remove="handleImgRemove('legal_img')"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照编号：" prop="license_num">
          <el-input v-model="authInfoForm.license_num" clearable></el-input>
        </el-form-item>
        <el-form-item label="营业执照所在地：" prop="license_province">

        </el-form-item>
        <el-form-item label="成立日期：" prop="establishdate">
          <el-date-picker
            v-model="authInfoForm.establishdate"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="选择成立日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="营业执照有效期：" prop="licencestart" class="licence-range">
          <el-date-picker
            v-model="authInfoForm.licencestart"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <div style="width: 400px;margin: 0 auto;padding-bottom: 15px">
          <span style="margin-left: 180px;">至</span>
        </div>
        <el-form-item label="" prop="licenceend" class="licence-range">
          <el-date-picker
            v-model="authInfoForm.licenceend"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="法定经营范围：" prop="scope">
          <el-input v-model="authInfoForm.scope" clearable></el-input>
        </el-form-item>
        <el-form-item label="营业执照电子版：" prop="licence_img">
          <el-upload
            :action="MixinUploadApi"
            :on-success="res => handleImgUploadSuccess('licence_img', res)"
            :on-remove="handleImgRemove('licence_img')"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <h5 class="item-title">组织机构代码证</h5>
        <el-form-item label="组织机构代码：" prop="organization_code">
          <el-input v-model="authInfoForm.organization_code" clearable></el-input>
        </el-form-item>
        <el-form-item label="组织机构代码证电子版：" prop="code_img">
          <el-upload
            :action="MixinUploadApi"
            :on-success="res => handleImgUploadSuccess('code_img', res)"
            :on-remove="handleImgRemove('code_img')"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <h5 class="item-title">一般纳税人证明</h5>
        <el-form-item label="一般纳税人证明：" prop="taxes_img">
          <el-upload
            :action="MixinUploadApi"
            :on-success="res => handleImgUploadSuccess('taxes_img', res)"
            :on-remove="handleImgRemove('taxes_img')"
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
  export default {
    name: "auth-info",
    data() {
      const req_rule = (message) => ({ required: true, message, trigger: 'blur' })
      const len_rule = (min, max) => ({ min, max, message: `'长度在 ${min} 到 ${max} 个字符`, trigger: 'blur' })
      return {
        /** 基础信息 表单 */
        authInfoForm: {},
        /** 基础信息 表单规则 */
        authInfoRules: {
          legal_name: [ req_rule('请输入法定代表人姓名'), len_rule(1, 20) ],
          legal_id: [
            req_rule('请输入法定代表人身份证号'),
            {
              validator: (rule, value, callback) => {
                if (!regExp.cardID.test(value)) {
                  callback(new Error('身份证号格式不正确'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          legal_img: [ req_rule('请上传法人身份证电子版')],
          license_num: [ req_rule('请输入营业执照编号') ],
          license_province: [ req_rule('请选择营业执照所在地') ],
          establishdate: [ req_rule('请选择成立日期') ],
          licencestart: [
            req_rule('请选择开始日期'),
            {
              validator: (rule, value, callback) => {
                if (value >= this.authInfoForm.licenceend) {
                  callback(new Error('结束时间不能早于开始时间'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          licenceend: [
            req_rule('请选择结束日期'),
            {
              validator: (rule, value, callback) => {
                if (value <= this.authInfoForm.licencestart) {
                  callback(new Error('结束时间不能早于开始时间'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          scope: [ req_rule('请输入法定经营范围') ],
          licence_img: [ req_rule('请上传营业执照电子版') ],
          organization_code: [ req_rule('请输入组织机构代码') ],
          code_img: [ req_rule('请上传组织机构代码证电子版') ],
          taxes_img: [ req_rule('请上传一般纳税人证明') ],
        }
      }
    },
    methods: {
      /** 下一步 */
      handleNextStep() {
        this.$refs['authInfoForm'].validate((valid) => {
          if (valid) {
            this.$router.push({ name: 'shop-apply-financial-qualification' })
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },
      /** 图片上传成功 */
      handleImgUploadSuccess(img_name, res) {
        this.authInfoForm[img_name] = res
      },
      /** 图片被移除 */
      handleImgRemove(img_name) {
        this.authInfoForm[img_name] = ''
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
