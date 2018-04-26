<template>
  <div id="shop-info" class="item-container">
    <div class="content">
      <el-form
        :model="shopInfoForm"
        :rules="shopInfoRules"
        ref="shopInfoForm"
        label-width="180px"
        size="small"
      >
        <h5 class="item-title">店铺信息</h5>
        <el-form-item label="店铺名称：" prop="shop_name">
          <el-input v-model.trim="shopInfoForm.shop_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="店铺地址：" prop="shop_province">
          <en-address-select @changed="handleAddressSelectChanged"/>
        </el-form-item>
        <el-form-item label="经营类目：" prop="checkedCategorys">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChanged">全选</el-checkbox>
          <el-checkbox-group v-model="shopInfoForm.checkedCategorys" @change="handleCheckedCategorysChange">
            <el-checkbox v-for="cate in categorys" :label="cate" :key="cate.category_id">{{cate.label}}</el-checkbox>
          </el-checkbox-group>
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
    name: "shop-info",
    data() {
      const req_rule = (message, trigger) => ({ required: true, message, trigger: trigger || 'blur' })
      const len_rule = (min, max) => ({ min, max, message: `'长度在 ${min} 到 ${max} 个字符`, trigger: 'change' })
      return {
        /** 分类 */
        categorys: [
          { category_id: 491, label: '数码家电' },
          { category_id: 492, label: '食品饮料' },
          { category_id: 493, label: '进口食品' },
          { category_id: 494, label: '美容化妆' },
          { category_id: 495, label: '母婴玩具' },
          { category_id: 496, label: '厨房用品' },
          { category_id: 497, label: '钟表箱包' },
          { category_id: 498, label: '营养保健' },
          { category_id: 499, label: '服装鞋靴' }
        ],
        isIndeterminate: false,
        checkAll: false,
        /** 基础信息 表单 */
        shopInfoForm: {
          checkedCategorys: []
        },
        /** 基础信息 表单规则 */
        shopInfoRules: {
          shop_name: [ req_rule('请输入店铺名称'), len_rule(1, 10) ],
          shop_province: [ req_rule('请选择店铺地址') ],
          checkedCategorys: [
            { type: 'array', required: true, message: '请至少选择一个经营类目', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      /** 下一步 */
      handleNextStep() {
        this.$refs['shopInfoForm'].validate((valid) => {
          if (valid) {
            this.$router.push({ name: 'shop-apply-success' })
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },
      /** 地址选择插件值发生改变 */
      handleAddressSelectChanged(object) {
        const { regions } = object
        Object.keys(regions).forEach(key => this.shopInfoForm[`shop_${key}`] = regions[key] || '')
      },
      /** 经营类目全选框发生改变 */
      handleCheckAllChanged(checked) {
        console.log(checked)
        this.shopInfoForm.checkedCategorys = checked ? this.categorys : []
        this.isIndeterminate = false
      },
      /** 选中的经营类目发生改变 */
      handleCheckedCategorysChange(vaule) {
        const checkedCount = vaule.length
        const categorysCount = this.categorys.length
        this.checkAll = checkedCount === categorysCount
        this.isIndeterminate = checkedCount > 0 && checkedCount < categorysCount
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
    /deep/ .el-checkbox-group .el-checkbox:nth-child(2n + 1) {
      margin-left: 0;
    }
  }
</style>
