<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    width="805px">
    <div slot="title" class="image-picker-title">图片上传</div>
    <div class="image-picker-body">
      <div v-show="curEdit" class="upload-box edit">
        <div class="el-upload-dragger">
          <div class="opt-body">
            <div class="inner-opt">
              <div v-for="(opt, index) in operation" class="item-opt">
                <div v-if="opt.type === 'select'" class="input-with-select el-input el-input--small el-input-group el-input-group--prepend">
                  <div class="el-input-group__prepend">{{ opt.label }}</div>
                  <el-select v-model="opt.value" slot="append" placeholder="请选择">
                    <el-option v-for="op in opt.options" :label="op.text" :value="op.value" :key="op.text"></el-option>
                  </el-select>
                </div>
                <el-input v-else placeholder="请输入内容" v-model="opt.value" class="input-with-select">
                  <template slot="prepend">{{ opt.label }}</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="opt-footer"></div>
        </div>
      </div>
      <el-upload
        v-show="!curEdit"
        ref="elUpload"
        class="upload-box"
        drag
        :limit="limit"
        :multiple="multiple"
        :show-file-list="false"
        :on-change="(_file, _fileList) => { fileList = _fileList }"
        :on-success="onSuccess"
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
            <span v-if="file.status === 'success'" class="el-upload-list__item-preview">
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
      /** 显示dialog */
      show: {
        type: Boolean,
        default: false
      },
      /** 最大可上传个数 */
      limit: {
        type: Number,
        default: 10
      },
      /** 是否可多选 */
      multiple: {
        type: Boolean,
        default: false
      },
      /** 自定义参数 */
      operation: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        dialogVisible: this.show,
        fileList: [],
        dataMap: new Map(),
        curEdit: 1
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
        this.curEdit = this.dataMap.get(this.fileList[index].uid)
        console.log(this.fileList[index].uid)
      },
      onSuccess(response, file, fileList) {
        const obj = {
          response,
          uid: file.uid,
          operation: JSON.parse(JSON.stringify(this.operation))
        }
        this.dataMap.set(file.uid, obj)
        console.log(this.dataMap)
        console.log(response, file, fileList)
      },
      handleConfirm() {
        let list = this.fileList.filter(item => item.status === 'success')
        this.$emit('confirm', list.map(item => {
          return {
            uid: item.raw.uid,
            blob: item.url,
            url: item.response.url
          }
        }))
        this.$refs['elUpload'].clearFiles()
        this.fileList = []
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
  .image-picker-body {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  /deep/ {
    .el-dialog__body {
      padding: 0 20px;
    }
    .upload-box {
      display: flex;
      align-self: center;
      margin-bottom: 10px;
      &:hover .inner-opt { border-color: #409EFF }
      &.edit .el-upload-dragger {
        cursor: auto;
        text-align: left;
      }
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
      align-self: center;
    }
    .el-upload-dragger {
      width: 600px;
    }
    .el-upload-list__item {
      width: 142px;
      height: 142px;
    }
    .opt-body {
      height: 130px;
      margin: 10px 10px 0 10px;
    }
    .inner-opt {
      width: 100%;
      height: 100%;
      border-bottom: 1px dashed #d9d9d9;
      overflow-y: auto;
    }
    .item-opt {
      display: inline-block;
      position: relative;
      width: 284px;
      font-size: 12px;
      margin-bottom: 10px;
      &:nth-child(2n) { margin-left: 10px }
      .el-input-group--prepend .el-select .el-input.is-focus .el-input__inner {
        border-color: #409EFF
      }
    }
    .opt-footer {
      height: 40px;
      text-align: center;
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
