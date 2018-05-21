<template>
  <el-dialog
    title="图片上传"
    :visible.sync="show"
    width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="show = false">取 消</el-button>
    <el-button type="primary" @click="show = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EnImagePicker',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {}
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
