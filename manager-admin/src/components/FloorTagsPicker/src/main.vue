<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    width="420px">
    <div slot="title" class="text-picker-title">楼层标题编辑</div>
    <div class="text-picker-body">
      <div class="text-picker-content">
        <el-form :model="textForm" :rules="textRules" ref="textForm" label-width="110px" style="width: 350px">
          <el-form-item label="标题文字" prop="text">
            <el-input
              :minlength="2"
              :maxlength="4"
              placeholder="请输入标题文字，长度2-4"
              v-model="textForm.text">
            </el-input>
          </el-form-item>
          <el-form-item label="标题栏背景色" prop="start_color">
            <el-input placeholder="请选择或输入标题栏背景色" v-model="textForm.start_color">
              <el-color-picker slot="append" v-model="textForm.start_color" size="mini"></el-color-picker>
            </el-input>
          </el-form-item>
          <el-form-item label="背景过渡色" prop="end_color">
            <el-input placeholder="请选择或输入背景过渡色" v-model="textForm.end_color">
              <el-color-picker slot="append" v-model="textForm.end_color" size="mini"></el-color-picker>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="text-picker-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EnFloorTagsPicker',
    data() {
      return {
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-input-group__append {
    padding: 0;
    .el-color-picker {
      display: table-cell;
      padding: 0;
      border: none;
    }
    .el-color-picker__trigger {
      display: inline-table;
    }
  }
</style>
