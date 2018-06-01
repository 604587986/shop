<template>
  <el-form :model="sysForm" :rules="sysRules" ref="sysForm" label-width="130px" style="width: 500px">
    <el-form-item label="主域名" prop="primary_domain">
      <el-input v-model="sysForm.primary_domain" clearable></el-input>
    </el-form-item>
    <el-form-item label="基础服务域名" prop="base_api_domain">
      <el-input v-model="sysForm.base_api_domain" clearable></el-input>
    </el-form-item>
    <el-form-item label="后台管理域名" prop="manager_api_domain">
      <el-input v-model="sysForm.manager_api_domain" clearable></el-input>
    </el-form-item>
    <el-form-item label="商家中心域名" prop="seller_api_domain">
      <el-input v-model="sysForm.seller_api_domain" clearable></el-input>
    </el-form-item>
    <el-form-item label="买家端域名" prop="buyer_api_domain">
      <el-input v-model="sysForm.buyer_api_domain" clearable></el-input>
    </el-form-item>
    <!--<el-form-item label="静态资源域名" prop="server_domain">-->
      <!--<el-input v-model="sysForm.server_domain" clearable></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="虚拟目录" prop="virtical_list">-->
      <!--<el-input v-model="sysForm.virtical_list" clearable></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="WAP站域名" prop="wap_damain">
      <el-input v-model="sysForm.wap_damain" clearable></el-input>
    </el-form-item>
    <el-form-item label="加密秘钥" prop="global_auth_key">
      <el-input v-model="sysForm.global_auth_key" clearable></el-input>
    </el-form-item>
    <!--<el-form-item label="后台分页" prop="wap_domain_ip">-->
      <!--<el-input v-model="sysForm.virtical_list" clearable></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="手机短信支持" prop="wap_domain_ip">-->
      <!--<el-radio-group v-model="sysForm.sms_sp">-->
        <!--<el-radio :label="1">是</el-radio>-->
        <!--<el-radio :label="0">否</el-radio>-->
      <!--</el-radio-group>-->
    <!--</el-form-item>-->
    <el-form-item label="测试模式" prop="wap_domain_ip">
      <el-radio-group v-model="sysForm.test_mode">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <!--<el-form-item label="是否开启集群" prop="wap_domain_ip">-->
      <!--<el-radio-group v-model="sysForm.sms_sp">-->
        <!--<el-radio :label="1">是</el-radio>-->
        <!--<el-radio :label="0">否</el-radio>-->
      <!--</el-radio-group>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="索引目录" prop="wap_domain_ip">-->
      <!--<el-input v-model="sysForm.virtical_list"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="">
      <el-button type="primary" @click="submitForm">保存修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as API_SystemSetting from '@/api/systemSetting'

  export default {
    name: 'systemSettingsSystem',
    data() {
      return {
        /** 系统设置 */
        sysForm: {},
        sysRules: {
          primary_domain: [this.MixinRequired('主域名不能为空！')],
          base_api_domain: [this.MixinRequired('基础服务域名不能为空！')],
          manager_api_domain: [this.MixinRequired('后台管理域名不能为空！')],
          seller_api_domain: [this.MixinRequired('卖家中心域名不能为空！')],
          buyer_api_domain: [this.MixinRequired('买家端域名不能为空！')],
          wap_damain: [this.MixinRequired('WAP端域名不能为空！')],
          global_auth_key: [this.MixinRequired('加密秘钥不能为空！')]
        }
      }
    },
    created() {
      API_SystemSetting.getSystemSetting().then(response => {
        this.sysForm = response
      })
    },
    methods: {
      submitForm() {
        this.$refs['sysForm'].validate((valid) => {
          if (valid) {
            API_SystemSetting.editSystemSetting(this.sysForm).then(() => {
              this.$message.success('修改成功！')
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
