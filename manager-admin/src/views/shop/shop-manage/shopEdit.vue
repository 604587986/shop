<template>
  <div>
    <el-form :model="shopForm" :rules="shopRules" ref="shopForm" inline label-width="130px">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="compant_address">
            <el-input v-model="shopForm.compant_address" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司电话" prop="compant_phone">
            <el-input v-model="shopForm.compant_phone" :maxlength="20"></el-input>
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
          <el-form-item label="电子邮箱" prop="compant_email">
            <el-input v-model="shopForm.compant_email" :maxlength="50"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="营业执照信息">
          <el-form-item label="法定代表人姓名" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照号" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="法定经营范围" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照所在地" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照详细地址 " prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="成立日期" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照有效期" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="法人身份证">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLegalImgSuccess">
              <img v-if="shopForm.legal_img" :src="shopForm.legal_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <br>
          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLicenceImgSuccess">
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
          <el-form-item label="组织机构代码证件">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLicenceImgSuccess">
              <img v-if="shopForm.code_img" :src="shopForm.code_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="一般纳税人证明">
          <el-form-item label="一般纳税人证明">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLicenceImgSuccess">
              <img v-if="shopForm.taxes_img" :src="shopForm.taxes_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="开户行银行许可证">
          <el-form-item label="银行开户名" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司银行账号" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开户银行支行名称" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开户行所在地" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="开户行许可证">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLicenceImgSuccess">
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
          <el-form-item label="税务登记证">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLicenceImgSuccess">
              <img v-if="shopForm.taxes_certificate_img" :src="shopForm.taxes_certificate_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="店铺信息">
          <el-form-item label="店铺名称" prop="shop_name">
            <el-input v-model="shopForm.shop_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址">
            <el-input v-model="shopForm.shop_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="用金比例">
            <el-input v-model="shopForm.shop_name" :maxlength="50">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="经营类目">
          <el-form-item label="经营类目" class="form-item-cat">
            <el-checkbox :indeterminate="isIndeterminateCat" v-model="checkAllCat" @change="handleCheckAllCatChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCats" @change="handleCheckedCatsChange">
              <el-checkbox v-for="cat in cats" :label="cat.label" :key="cat.id">{{ cat.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'shopEdit',
    data() {
      return {
        shopForm: {},
        shopRules: {},
        isIndeterminateCat: true,
        checkAllCat: false,
        checkedCats: [],
        cats: [
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
      }
    },
    mounted() {},
    methods: {
      /** 法定代表人身份证上传成功 */
      handleLegalImgSuccess() {},

      /** 营业执照上传成功 */
      handleLicenceImgSuccess() {},

      /** 经营类目全选 */
      handleCheckAllCatChange() {},

      /** 经营类目选择 */
      handleCheckedCatsChange() {}
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-form-item--medium .el-form-item__content {
    width: 180px;
  }

  /deep/ .el-input-number--medium {
    width: 180px;
  }

  /deep/ .form-item-cat.el-form-item--medium .el-form-item__content {
    width: auto;
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

  /deep/ .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
