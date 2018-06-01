<template>
  <el-form :model="imageForm" :rules="imageRules" ref="imageForm" label-width="155px" style="width: 500px">
    <el-form-item label="商家模板商品图片尺寸" prop="cancel_order_day">
      <el-input placeholder="300" size="small" v-model="imageForm.a">
        <template slot="prepend">宽</template>
        <template slot="append">px</template>
      </el-input>
      <el-input placeholder="300" size="small" v-model="imageForm.a">
        <template slot="prepend">高</template>
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品小图尺寸" prop="cancel_order_day">
      <el-input placeholder="400" size="small" v-model="imageForm.a">
        <template slot="prepend">宽</template>
        <template slot="append">px</template>
      </el-input>
      <el-input placeholder="400" size="small" v-model="imageForm.a">
        <template slot="prepend">高</template>
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商家相册图片尺寸" prop="cancel_order_day">
      <el-input placeholder="800" size="small" v-model="imageForm.a">
        <template slot="prepend">宽</template>
        <template slot="append">px</template>
      </el-input>
      <el-input placeholder="800" size="small" v-model="imageForm.a">
        <template slot="prepend">高</template>
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'systemSettingsImage',
    data() {
      return {
        /** 图片设置 */
        imageForm: {},
        imageRules: {}
      }
    },
    mounted() {},
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
