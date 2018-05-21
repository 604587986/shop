<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    width="805px">
    <div slot="title" class="image-picker-title">图片上传</div>
    <div class="image-picker-body">
      <el-upload
        class="upload-box"
        drag
        :limit="limit"
        :multiple="multiple"
        :show-file-list="false"
        :on-change="(_file, _fileList) => { fileList = _fileList }"
        :action="MixinUploadApi"
        :on-exceed="() => { $message.error('文件数量超过限制！') }"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          v-for="(file, index) in fileList"
          tabindex="0"
          class="el-upload-list__item is-success"
        >
          <img :src="file.status === 'success' ? file.response.url : file.url" class="el-upload-list__item-thumbnail"/>
          <label class="el-upload-list__item-status-label" :class="[file.status === 'error' && 'error']">
            <i v-if="file.status === 'success'" class="el-icon-check"></i>
            <i v-if="file.status === 'error'" class="el-icon-circle-close-outline"></i>
          </label>
          <el-progress
            v-if="file.status === 'uploading'"
            type="circle"
            :percentage="parseInt(file.percentage, 10)">
          </el-progress>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-edit-outline" @click="handleEditItem(index)"></i>
            </span>
            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete" @click="fileList.splice(index, 1)"></i>
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div slot="footer" class="image-picker-footer">
      <div class="upload-status-num">
        最多可上传个数：<span>{{ limit }}</span>
        已上传个数：<span>{{ uploadSuccessNum }}</span>
        正在上传个数：<span>{{ uploadingNum }}</span>
      </div>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EnImagePicker',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 10
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: this.show,
        fileList: []
      }
    },
    watch: {
      show(newVal) {
        this.dialogVisible = newVal
      },
      dialogVisible(newVal) {
        newVal === false && this.$emit('close')
      }
    },
    computed: {
      /** 计算已上传个数 */
      uploadSuccessNum() {
        return this.fileList.filter(item => item.status === 'success').length
      },
      /** 计算正在上传个数 */
      uploadingNum() {
        return this.fileList.filter(item => item.status === 'uploading').length
      }
    },
    methods: {
      handleEditItem(index) {
        console.log(index)
      },
      handleConfirm() {
        let list = this.fileList.filter(item => item.status === 'success')
        this.$emit('confirm', JSON.parse(JSON.stringify(list)))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  $border-style: 1px solid #ccc;
  .image-picker-title {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: $border-style;
  }
  /deep/ {
    .el-dialog__body {
      padding: 0 20px;
    }
    .upload-box {
      display: flex;
      flex-direction: column-reverse;
    }
    .el-upload-list{
      display: block;
      max-height: 200px;
      min-height: 180px;
      overflow-y: scroll;
      border: 1px dashed #d9d9d9;
      padding: 10px 0 10px 10px;
      &:hover { border: 1px dashed #409EFF }
    }
    .el-upload-list__item-status-label.error {
      background: #f56c6c;
    }
    .el-icon-circle-close-outline { color: #fff }
    .el-progress {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
    .el-upload {
      width: auto;
      height: auto;
      line-height: normal;
      border: none;
      margin-bottom: 10px;
      align-self: center;
    }
    .el-upload-list__item {
      width: 142px;
      height: 142px;
    }
  }
  .image-picker-body {
    min-height: 350px;
  }
  .upload-status-num {
    font-size: 14px;
    span {
      color: red;
      margin-right: 10px;
    }
  }
  .image-picker-footer {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    border-top: $border-style;
  }
</style>
