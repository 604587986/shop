<template>
  <div class="bg-settings">
    <el-form :model="shopDataForm" ref="shopDataForm" :rules="rules" label-width="200px" class="demo-ruleForm">
      <!--身份证号-->
      <el-form-item label="身份证号：" prop="legal_id">
        <span>{{ shopDataForm.legal_id }}</span>
      </el-form-item>
      <!--店铺地址-->
      <el-form-item label="店铺地址：" prop="shop_address">
        <en-address-select :default="areas" @change="handleChange"></en-address-select>
      </el-form-item>
      <!--详细地址-->
      <el-form-item label="详细地址：" prop="shop_add">
        <el-input v-model="shopDataForm.shop_add" style="width: 200px;" auto-complete="off"></el-input>
      </el-form-item>
      <!--联系电话-->
      <el-form-item label="联系电话：" prop="link_phone">
        <el-input v-model.number="shopDataForm.link_phone" style="width: 200px;" auto-complete="off"></el-input>
      </el-form-item>
      <!--QQ-->
      <el-form-item label="QQ：" prop="shop_qq">
        <el-input v-model="shopDataForm.shop_qq" style="width: 200px;" placeholder="请设置店铺的客服QQ"></el-input>
        <span> 设置店铺的客服QQ</span>
      </el-form-item>
      <!--店铺简介-->
      <el-form-item label="店铺简介：" prop="shop_desc">
        <UE v-model="shopDataForm.shop_desc" :defaultMsg="shopDataForm.shop_desc" style="width: 80%;"></UE>
      </el-form-item>
      <!--店铺logo-->
      <el-form-item label="店铺logo：" prop="shop_logo">
        <el-upload
          class="upload-demo"
          key="shop_logo"
          :action="BASE_IMG_URL"
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
          :action="BASE_IMG_URL"
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
  import * as API_Shop from '@/api/shop'
  import { UE } from '@/components'
  import { AddressSelect } from '@/plugins/selector/vue'
  import { validatePhone } from '@/utils/validate'
  export default {
    name: 'shopSetting',
    components: {
      [UE.name]: UE,
      [AddressSelect.name]: AddressSelect
    },
    data() {
      var validPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入联系人电话'))
        } else if (!validatePhone(value)) {
          callback(new Error('请输入正确的11位手机号码'))
        } else {
          callback()
        }
      }
      return {
        /** 图片服务器地址 */
        BASE_IMG_URL: process.env.BASE_IMG_URL,

        /** 店铺信息*/
        shopDataForm: {
          /** 店铺ID 目前使用3*/
          shop_id: 3,

          /** 身份证号*/
          legal_id: '',

          /** 店铺地址 */
          shop_address: '',

          /** 店铺所在省id */
          shop_province_id: 1,

          /** 店铺所在市id */
          shop_city_id: 2,

          /** 店铺所在县id */
          shop_region_id: 3,

          /** 店铺所在镇id */
          shop_town_id: 4,

          /** 店铺所在省 */
          shop_province: '和别生',

          /** 店铺所在市 */
          shop_city: 'handnashi',

          /** 店铺所在县 */
          shop_region: 'safdas',

          /** 店铺所在乡/镇 */
          shop_town: 'gushenzhe',

          /** 详细地址*/
          shop_add: '',

          /** 联系电话*/
          link_phone: '',

          /** QQ*/
          shop_qq: '',

          /** 店铺简介*/
          shop_desc: '',

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
        fileList_banner: [],

        /** 校验规则 校验必填 */
        rules: {
          /** 详细地址 */
          shop_add: [
            { required: true, message: '请填写详细地址', trigger: 'changer,blur' }
          ],
          /** 联系人电话 */
          link_phone: [
            { required: true, message: '请填写联系人电话', trigger: 'changer,blur' },
            { validator: validPhone, trigger: 'changer,blur' }
          ]
        }
      }
    },
    mounted() {
      this.GET_ShopGradeData()
    },
    methods: {
      /** 获取店铺信息 */
      GET_ShopGradeData() {
        API_Shop.getShopData().then(response => {
          this.shopDataForm = { ...response.data }
          this.fileList_logo = [{ url: this.shopDataForm.shop_logo }]
          this.fileList_banner = [{ url: this.shopDataForm.shop_banner }]
        })
      },

      /** 保存店铺设置*/
      handleSaveShopData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _params = {
              ...this.shopDataForm
            }
            API_Shop.saveShopSettings(_params).then(response => {
              this.$message.success('保存店铺设置成功')
              this.GET_ShopGradeData()
            })
          }
        })
      },

      /** 操作地区选择器改变时 触发*/
      handleChange(val) {
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
