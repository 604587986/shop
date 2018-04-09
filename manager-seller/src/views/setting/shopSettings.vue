<template>
  <div class="bg-settings">
    <el-form :model="shopDataForm" ref="shopDataForm" label-width="200px" class="demo-ruleForm">
      <!--身份证号-->
      <el-form-item label="身份证号：" prop="card_id">
        <span>{{ shopDataForm.card_id }}</span>
      </el-form-item>
      <!--店铺地址-->
      <el-form-item label="店铺地址：" prop="shop_address">
        <el-cascader
          :options="areas"
          v-model="selectedArea"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <!--详细地址-->
      <el-form-item label="详细地址：" prop="details_address">
        <el-input v-model="shopDataForm.details_address" style="width: 200px;" auto-complete="off"></el-input>
      </el-form-item>
      <!--联系电话-->
      <el-form-item label="联系电话：" prop="shop_phone">
        <el-input v-model="shopDataForm.shop_phone" style="width: 200px;" auto-complete="off"></el-input>
      </el-form-item>
      <!--QQ-->
      <el-form-item label="QQ：" prop="shop_qq">
        <el-input v-model="shopDataForm.shop_qq" style="width: 200px;" placeholder="请设置店铺的客服QQ"></el-input>
        <span> 设置店铺的客服QQ</span>
      </el-form-item>
      <!--店铺简介-->
      <el-form-item label="店铺简介：" prop="shop_intro">
        <UE v-model="shopDataForm.shop_intro" :defaultMsg="shopDataForm.shop_intro" style="width: 80%;"></UE>
      </el-form-item>
      <!--店铺logo-->
      <el-form-item label="店铺logo：" prop="shop_logo">
        <el-upload
          class="upload-demo"
          key="shop_logo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :before-upload="handlePreviewLogo"
          :file-list="fileList_logo"
          ref="fileList_logo"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          <div slot="tip" class="el-upload__tip">此处为您的店铺logo，将显示在店铺Logo栏里。 （请上传200x60规格的图片！）</div>
        </el-upload>
      </el-form-item>
      <!--店铺banner-->
      <el-form-item label="店铺横幅：" prop="shop_banner">
        <el-upload
          class="upload-demo"
          key="shop_banner"
          :before-upload="handlePreviewBanner"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList_banner"
          ref="fileList_banner"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          <div slot="tip" class="el-upload__tip">此处为您的店铺条幅，将显示在移动端。（请上传638x158规格的图片！） </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleSaveShopData('shopDataForm')">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as API_ShopSettings from '@/api/shopSettings'
  import { UE } from '@/components'
  export default {
    name: 'shopSetting',
    components: {
      [UE.name]: UE
    },
    data() {
      return {
        /** 店铺信息*/
        shopDataForm: {
          /** 店铺ID*/
          shop_id: '',

          /** 身份证号*/
          card_id: '',

          /** 店铺地址 */
          shop_address: '',

          /** 详细地址*/
          details_address: '',

          /** 联系电话*/
          shop_phone: '',

          /** QQ*/
          shop_qq: '',

          /** 店铺简介*/
          shop_intro: '',

          /** 店铺logo*/
          shop_logo: '',

          /** 店铺横幅*/
          shop_banner: ''
        },

        /** 地区信息*/
        areas: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }]
          }]
        }],

        /** 已选中的地区信息*/
        selectedArea: [],

        /** 店铺logo图片存*/
        fileList_logo: [],

        /** 店铺banner图片存*/
        fileList_banner: []
      }
    },
    mounted() {
      this.GET_ShopGradeData()
    },
    methods: {
      /** 获取店铺信息 */
      GET_ShopGradeData() {
        API_ShopSettings.getShopData().then(response => {
          this.shopDataForm = { ...response.data }
          this.fileList_logo = [{ url: this.shopDataForm.shop_logo }]
          this.fileList_banner = [{ url: this.shopDataForm.shop_banner }]
          console.log(this.shopDataForm.shop_address)
        }).catch(error => {
          console.log(error)
        })
      },

      /** 保存店铺设置*/
      handleSaveShopData() {
        API_ShopSettings.saveShopSettings(this.shopDataForm.shop_id, this.shopDataForm).then(response => {
          this.$message.success('保存店铺设置成功')
          this.GET_ShopGradeData()
        }).catch(error => {
          this.$message.success('保存店铺设置失败')
          console.log(error)
        })
      },

      /** 操作级联地区选择器改变时 触发*/
      handleChange(val) {
        console.log(val, 585)
        this.selectedArea = val
      },

      /** 上传logo之前*/
      handlePreviewLogo() {
        // this.fileList_logo = []
        // this.$refs.fileList_logo.clearFiles()
      },

      /** 上传banner之前*/
      handlePreviewBanner() {
        // this.fileList_banner = []
        // this.$refs.fileList_banner.clearFiles()
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .bg-settings {
    background: #fff;
    border: 1px solid #FAFAFA;
    margin: 15px;
    padding: 10px;
  }
</style>
