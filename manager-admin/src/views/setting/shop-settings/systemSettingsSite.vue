<template>
  <el-form :model="siteForm" :rules="siteRules" ref="siteForm" label-width="130px" v-loading="loading" style="width: 500px">
    <el-form-item label="网站名称" prop="site_name">
      <el-input v-model="siteForm.site_name"></el-input>
    </el-form-item>
    <el-form-item label="网站标题" prop="title">
      <el-input v-model="siteForm.title"></el-input>
    </el-form-item>
    <el-form-item label="关键字" prop="keywords">
      <el-tag
        class="site-tag"
        v-for="tag in siteForm.keywords"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleCloseSiteTag(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="site-new-tag-input"
        v-if="siteTagInputVisible"
        v-model="siteTagInputValue"
        ref="saveSiteTagInput"
        size="small"
        @keyup.enter.native="handleSiteTagInputConfirm"
        @blur="handleSiteTagInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showSiteTagInput">+ 添加</el-button>
    </el-form-item>
    <el-form-item label="网站描述" prop="descript">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="siteForm.descript"
        :maxlength="200"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="网站LOGO" prop="logo">
      <el-upload
        class="site-logo"
        :action="MixinUploadApi"
        :show-file-list="false"
        :on-success="(res) => { siteForm.logo = res.url }"
        :multiple="false">
        <img v-if="siteForm.logo" :src="siteForm.logo" class="site-logo-img">
        <i v-else class="el-icon-plus logo-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="submitForm">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as API_SystemSetting from '@/api/systemSetting'

  export default {
    name: 'systemSettingsSite',
    data() {
      return {
        loading: true,
        /** 站点设置 */
        siteForm: {},
        siteRules: {
          site_name: [this.MixinRequired('网站名称不能为空！')],
          title: [this.MixinRequired('网站标题不能为空！')],
          keywords: [{ type: 'array', required: true, message: '请至少添加一个关键词！', trigger: 'change' }],
          descript: [this.MixinRequired('网站描述不能为空！')],
          logo: [this.MixinRequired('请上传网站LOGO！')]
        },
        siteTagInputVisible: false,
        siteTagInputValue: ''
      }
    },
    created() {
      API_SystemSetting.getSiteSetting().then(response => {
        this.loading = false
        this.siteForm = response
        this.siteForm.keywords = response.keywords.split(',')
      }).catch(() => { this.loading = false })
    },
    methods: {
      /** 关键字标签关闭 */
      handleCloseSiteTag(tag) {
        this.siteForm.keywords.splice(this.siteForm.keywords.indexOf(tag), 1)
      },
      /** 显示关键字输入框 */
      showSiteTagInput() {
        this.siteTagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveSiteTagInput.$refs.input.focus()
        })
      },
      /** 关键字输入确认 */
      handleSiteTagInputConfirm() {
        let inputValue = this.siteTagInputValue
        if (this.siteForm.keywords.includes(inputValue)) {
          this.$message.error('不能出现重复的关键字！')
        } else if (inputValue) {
          this.siteForm.keywords.push(inputValue)
          this.siteTagInputVisible = false
          this.siteTagInputValue = ''
        }
      },
      submitForm() {
        this.$refs['siteForm'].validate((valid) => {
          if (valid) {
            const params = this.MixinClone(this.siteForm)
            params.keywords = params.keywords.join(',')
            API_SystemSetting.editSiteSetting(params).then(() => {
              this.$message.success('修改成功！')
            })
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
    background-color: #fff;
    padding: 10px;
    position: relative;
  }
  .site-tag {
    margin: 0 3px;
  }
  .site-new-tag-input {
    width: 100px;
  }
  /deep/ .site-logo .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .logo-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .site-logo-img {
    width: 120px;
    height: 120px;
    display: block;
  }

  .image-pane .el-input-group {
    width: 200px;
  }
  .point-pane .el-input-group {
    width: 200px;
  }
</style>
