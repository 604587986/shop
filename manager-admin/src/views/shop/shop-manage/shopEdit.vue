<template>
  <div v-loading="loading">
    <el-form :model="shopForm" :rules="shopRules" ref="shopForm" inline label-width="130px">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="company_address">
            <el-input v-model="shopForm.company_address" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司电话" prop="company_phone">
            <el-input v-model="shopForm.company_phone" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="员工总数" prop="employee_num">
            <el-input-number v-model="shopForm.employee_num" :min="1" :max="99999999"/>
          </el-form-item>
          <el-form-item label="注册资金" prop="reg_money">
            <el-input v-model="shopForm.reg_money" :max="9999999">
              <template slot="append">万</template>
            </el-input>
          </el-form-item>
          <el-form-item label="联系姓名" prop="link_name">
            <el-input v-model="shopForm.link_name" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="link_phone">
            <el-input v-model="shopForm.link_phone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="company_email">
            <el-input v-model="shopForm.company_email" :maxlength="50"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="营业执照信息">
          <el-form-item label="法人姓名" prop="legal_name">
            <el-input v-model="shopForm.legal_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证号" prop="legal_id">
            <el-input v-model="shopForm.legal_id" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照号" prop="license_num">
            <el-input v-model="shopForm.license_num" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="法定经营范围" prop="scope">
            <el-input v-model="shopForm.scope" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照所在地" prop="license_region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegionLicense" @changed="(object) => { shopForm.license_region = object.last_id }"/>
          </el-form-item>
          <el-form-item label="营业执照详细地址 " prop="license_add">
            <el-input v-model="shopForm.license_add" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="成立日期" prop="establish_date">
            <el-input v-model="shopForm.establish_date" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照有效期" prop="licence_start">
            <el-input v-model="shopForm.licence_start" :maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="法人身份证" prop="legal_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinRegionApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.legal_img = res.url }">
              <img v-if="shopForm.legal_img" :src="shopForm.legal_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <br>
          <el-form-item label="营业执照" prop="licence_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.licence_img = res.url }">
              <img v-if="shopForm.licence_img" :src="shopForm.licence_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="组织机构信息">
          <el-form-item label="组织机构代码" prop="organization_code">
            <el-input v-model="shopForm.organization_code" :maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="组织机构代码证件" prop="code_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinRegionApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.code_img = res.url }">
              <img v-if="shopForm.code_img" :src="shopForm.code_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="一般纳税人证明">
          <el-form-item label="一般纳税人证明" prop="taxes_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinRegionApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.taxes_img = res.url }">
              <img v-if="shopForm.taxes_img" :src="shopForm.taxes_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="开户行银行许可证">
          <el-form-item label="银行开户名" prop="bank_account_name">
            <el-input v-model="shopForm.bank_account_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司银行账号" prop="bank_number">
            <el-input v-model="shopForm.bank_number" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开户银行支行名称" prop="bank_name">
            <el-input v-model="shopForm.bank_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开户行所在地" prop="bank_region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegionBank" @changed="(object) => { shopForm.bank_region = object.last_id }"/>
          </el-form-item>
          <br>
          <el-form-item label="开户行许可证" prop="bank_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinRegionApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.bank_img = res.url }">
              <img v-if="shopForm.bank_img" :src="shopForm.bank_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="税务登记证">
          <el-form-item label="税务登记证号" prop="taxes_certificate_num">
            <el-input v-model="shopForm.taxes_certificate_num" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="taxes_distinguish_num">
            <el-input v-model="shopForm.taxes_distinguish_num" :maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="税务登记证" prop="taxes_certificate_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinRegionApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.taxes_certificate_img = res.url }">
              <img v-if="shopForm.taxes_certificate_img" :src="shopForm.taxes_certificate_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="店铺信息">
          <el-form-item label="店铺名称" prop="shop_name">
            <el-input v-model="shopForm.shop_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="店铺所在地" prop="shop_region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegionShop" @changed="(object) => { shopForm.shop_region = object.last_id }" />
          </el-form-item>
          <el-form-item label="用金比例" prop="shop_commission">
            <el-input v-model="shopForm.shop_commission" :maxlength="50">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="经营类目">
          <el-form-item label="经营类目" prop="goods_management_category" class="form-item-cat">
            <el-checkbox :indeterminate="isIndeterminateCat" v-model="checkAllCat" @change="handleCheckAllCatChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCats" @change="handleCheckedCatsChange">
              <el-checkbox v-for="cat in cats" :label="cat.id" :key="cat.id">{{ cat.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <div class="save-btn-box">
        <el-button type="primary">保存修改</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  // Andste_TODO 2018/6/5: 经营类目暂未适配
  const categroy = [
    { label: '数码家电', id: 1 },
    { label: '食品饮料', id: 2 },
    { label: '进口食品', id: 3 },
    { label: '美容化妆', id: 4 },
    { label: '母婴玩具', id: 5 },
    { label: '厨房用品', id: 6 },
    { label: '钟表箱包', id: 7 },
    { label: '营养保健', id: 8 },
    { label: '服装鞋靴', id: 9 }
  ]
  export default {
    name: 'shopEdit',
    data() {
      return {
        shop_id: this.$route.params.shop_id,
        loading: false,
        shopForm: {},
        shopRules: {
          company_name: [this.MixinRequired('公司名称不能为空！')],
          company_address: [this.MixinRequired('公司地址不能为空！')],
          company_phone: [this.MixinRequired('公司电话不能为空！')],
          employee_num: [this.MixinRequired('公司员工数不能为空！')],
          reg_money: [this.MixinRequired('公注册资金不能为空！')],
          link_name: [this.MixinRequired('联系姓名不能为空！')],
          link_phone: [this.MixinRequired('联系电话不能为空！')],
          company_email: [this.MixinRequired('公司电子邮箱不能为空！')],
          legal_name: [this.MixinRequired('法人姓名不能为空！')],
          legal_id: [this.MixinRequired('法人身份证不能为空！')],
          license_num: [this.MixinRequired('营业执照不能为空！')],
          scope: [this.MixinRequired('法定经营范围不能为空！')],
          license_region: [this.MixinRequired('请选择营业执照所在地！')],
          license_add: [this.MixinRequired('营业执照详细地址不能为空！')],
          establish_date: [this.MixinRequired('请选择公司成立日期！')],
          licence_start: [this.MixinRequired('请选择营业执照有效期开始时间！')],
          licence_end: [this.MixinRequired('请选择营业执照有效期结束时间！')],
          legal_img: [this.MixinRequired('请上传法人身份证！')],
          licence_img: [this.MixinRequired('请上传营业执照！')],
          organization_code: [this.MixinRequired('组织机构代码不能为空！')],
          code_img: [this.MixinRequired('请上传组织机构拯证件！')],
          taxes_img: [this.MixinRequired('请上传一般纳税人证明！')],
          bank_account_name: [this.MixinRequired('银行开户名不能为空！')],
          bank_number: [this.MixinRequired('公司银行账号不能为空！')],
          bank_name: [this.MixinRequired('开户银行支行名称不能为空！')],
          bank_region: [this.MixinRequired('请选择开户行所在地！')],
          bank_img: [this.MixinRequired('请上传开户行许可证！')],
          taxes_certificate_num: [this.MixinRequired('税务登记证号不能为空！')],
          taxes_distinguish_num: [this.MixinRequired('纳税人识别号不能为空！')],
          taxes_certificate_img: [this.MixinRequired('请选择税务登记证！')],
          shop_name: [this.MixinRequired('店铺名称不能为空！')],
          shop_region: [this.MixinRequired('请选择店铺所在地！')],
          shop_commission: [this.MixinRequired('店铺佣金比例不能为空！')],
          goods_management_category: [this.MixinRequired('请选择店铺经营类目！')]
        },
        isIndeterminateCat: true,
        checkAllCat: false,
        checkedCats: [1, 2],
        cats: categroy,
        defaultRegionLicense: null,
        defaultRegionBank: null,
        defaultRegionShop: null
      }
    },
    mounted() {
      this.GET_ShopDetail()
    },
    methods: {
      /** 经营类目全选 */
      handleCheckAllCatChange(val) {
        this.checkedCats = val ? categroy.map(item => item.id) : []
        this.isIndeterminateCat = false
      },

      /** 经营类目选择 */
      handleCheckedCatsChange(value) {
        let checkedCount = value.length
        this.checkAllCat = checkedCount === this.cats.length
        this.isIndeterminateCat = checkedCount > 0 && checkedCount < this.cats.length
      },
      /** 获取店铺详情 */
      GET_ShopDetail() {
        this.loading = true
        API_Shop.getShopDetail(this.shop_id).then(response => {
          this.loading = false
          this.shopForm = response
          const {
            license_province_id, license_city_id, license_county_id, license_town_id,
            bank_province_id, bank_city_id, bank_county_id, bank_town_id,
            shop_province_id, shop_city_id, shop_county_id, shop_town_id
          } = response
          this.defaultRegionLicense = [license_province_id, license_city_id, license_county_id, license_town_id]
          this.defaultRegionBank = [bank_province_id, bank_city_id, bank_county_id, bank_town_id]
          this.defaultRegionShop = [shop_province_id, shop_city_id, shop_county_id, shop_town_id]
          console.log(response)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-form-item--small .el-form-item__content {
    width: 180px;
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff
    }
  }

  /deep/ .avatar-uploader {
    width: 180px;
    height: 180px;
    img { width: 100%; height: 100% }
  }
  /deep/ .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .save-btn-box {
    text-align: center;
    background-color: #fff;
    padding: 10px 0;
    border: 1px solid #dcdfe6;
    border-top: 0;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  /deep/ .form-item-cat .el-form-item__content { width: auto }
</style>
