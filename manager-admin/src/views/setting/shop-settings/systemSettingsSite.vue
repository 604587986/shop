<template>
  <el-form :model="siteForm" :rules="siteRules" ref="siteForm" label-width="130px" style="width: 500px">
    <el-form-item label="网站名称" prop="name">
      <el-input v-model="siteForm.name"></el-input>
    </el-form-item>
    <el-form-item label="网站标题" prop="title">
      <el-input v-model="siteForm.title"></el-input>
    </el-form-item>
    <el-form-item label="关键字" prop="keyword">
      <el-tag
        class="site-tag"
        v-for="tag in siteForm.tags"
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
        :on-success="handleSiteLogoSuccess"
        :multiple="false">
        <img v-if="siteForm.logo" :src="siteForm.logo" class="site-logo-img">
        <i v-else class="el-icon-plus logo-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="submitForm">保存修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as API_SystemSetting from '@/api/systemSetting'

  export default {
    name: 'systemSettingsSite',
    data() {
      return {
        /** 站点设置 */
        siteForm: {
          tags: [],
          logo: ''
        },
        siteRules: {},
        siteTagInputVisible: false,
        siteTagInputValue: ''
      }
    },
    created() {
      API_SystemSetting.getSiteSetting().then(response => {
        console.log(response)
      })
    },
    methods: {
      /** 关键字标签关闭 */
      handleCloseSiteTag(tag) {
        this.siteForm.tags.splice(this.siteForm.tags.indexOf(tag), 1)
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
        if (this.siteForm.tags.filter(item => item === inputValue).length > 0) {
          this.$message.error('不能出现重复的关键字！')
        } else if (inputValue) {
          this.siteForm.tags.push(inputValue)
        }
        this.siteTagInputVisible = false
        this.siteTagInputValue = ''
      },
      submitForm() {
        this.$refs['siteForm'].validate((valid) => {
          if (valid) {
            API_SystemSetting.editSiteSetting(this.sysForm).then(() => {
              this.$message.success('修改成功！')
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 网站LOGO上传成功 */
      handleSiteLogoSuccess(res, file) {
        this.siteForm.logo = res
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
