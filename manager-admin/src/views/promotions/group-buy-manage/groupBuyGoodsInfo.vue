<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="团购活动">
        <span>{{ form.name }}</span>
      </el-form-item>
      <el-form-item label="活动时间">
        <span>{{ form.start_time | unixToDate }} - {{ form.end_time | unixToDate }}</span>
      </el-form-item>
      <el-form-item label="团购名称">
        <el-input v-model="form.group_buy_name" clearable placeholder="请输入团购名称"/>
      </el-form-item>
      <el-form-item label="团购标题">
        <el-input v-model="form.group_buy_title" clearable placeholder="请输入团购标题"/>
      </el-form-item>
      <el-form-item label="商品名称">
        <span>{{ form.goods_name }}</span>
      </el-form-item>
      <el-form-item label="商品价格">
        <span>{{ form.original_price | unitPrice("￥") }}</span>
      </el-form-item>
      <el-form-item label="商品库存">
        <span>{{ form.goods_num }}</span>
      </el-form-item>
      <el-form-item label="团购价格">
        <el-input v-model="form.goods_price" placeholder="请输入团购价格"/>
      </el-form-item>
      <el-form-item label="团购数量">
        <el-input-number v-model="form.goods_num" :min="1" :max="form.goods_num"/>
      </el-form-item>
      <el-form-item label="商品图片">
        <img :src="form.goods_image" :alt="form.goods_name" class="goods-image">
      </el-form-item>
      <el-form-item label="虚拟数量">
        <el-input-number v-model="form.visual_num" :min="1" :max="form.goods_num"/>
      </el-form-item>
      <el-form-item label="限购数量">
        <el-input-number v-model="form.limit_num" :min="1" :max="form.goods_num"/>
      </el-form-item>
      <el-form-item label="团购分类">
        <el-select v-model="form.cat_id" placeholder="请选择">
          <el-option label="不限" :value="0"/>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="团购介绍">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'groupBuyGoodsInfo',
    data() {
      return {
        form: this.$route.params,
        rules: {},
        options: []
      }
    },
    mounted() {
      this.GET_CategroyList()
    },
    methods: {
      /** 提交表单 */
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.group_buy_remark = this.$refs['ue'].getUEContent()
            // API_GroupBuy.editGroupBuyGoods(this.form).then(response => {
            //   this.$message.success('保存成功！')
            // }).catch(error => console.log(error))
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取团购分类列表 */
      GET_CategroyList() {
        // API_GroupBuy.getGroupBuyCategoryList().then(response => {
        //   this.options = response.data.map(item => {
        //     item.label = item.name
        //     item.value = item.id
        //     return item
        //   })
        // }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    background-color: #fff;
    padding: 10px;
    .goods-image {
      width: 100px;
      height: 100px;
    }
  }
</style>
