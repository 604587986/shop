<template>
  <el-form :model="shopForm" :rules="shopRules" ref="shopForm" label-width="130px" style="width: 500px">
    <el-form-item label="商家商品是否审核" prop="auth">
      <el-radio-group v-model="shopForm.auth">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="修改商品是否审核" prop="edit_auth">
      <el-radio-group v-model="shopForm.edit_auth">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="自营商品是否审核" prop="self_auth">
      <el-radio-group v-model="shopForm.self_auth">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="PC模板路径" prop="pc_path">
      <el-input v-model="shopForm.pc_path"></el-input>
    </el-form-item>
    <el-form-item label="WAP模板路径" prop="wap_path">
      <el-input v-model="shopForm.wap_path"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'systemSettingsShop',
    data() {
      return {
        /** 店铺设置 */
        shopForm: {
          auth: 0,
          edit_auth: 0,
          self_auth: 0
        },
        shopRules: {}
      }
    },
    mounted() {},
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .image-pane .el-input-group {
    width: 200px;
  }
  .point-pane .el-input-group {
    width: 200px;
  }
</style>
