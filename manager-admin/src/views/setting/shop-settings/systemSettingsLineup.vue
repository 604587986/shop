<template>
  <el-form :model="settingForm" ref="settingForm" label-width="130px" style="width: 500px">
    <el-form-item label="参与排队订单金额">
      <el-input-number size="small" v-model="settingForm.min_money" :min="0"></el-input-number> 元
    </el-form-item>
    <el-form-item label="杠杆比例">
      <el-input-number size="small" v-model="settingForm.lever" :min="0"></el-input-number> 倍
    </el-form-item>
    <el-form-item label="补贴比例">
      <el-input-number size="small" v-model="settingForm.subsidy_ratio" :min="0"></el-input-number> %
    </el-form-item>
    <el-form-item label="状态">
        <el-radio-group v-model="settingForm.state">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="编号" style="display:none">
      <el-input-number size="small" v-model="settingForm.id" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="submitEditOrderSetting">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as API_SystemSetting from '@/api/systemSetting'

  export default {
    name: 'systemSettingsLineup',
    data() {
      return {
        /** 订单设置 */
        settingForm: {
          min_money:0,
          lever:0,
          subsidy_ratio:0,
          state:0,
          id:0
        }
      }
    },
    mounted() {
      /** 获取订单设置数据 */
      API_SystemSetting.getLineupSetting().then(response => {
        Object.keys(this.settingForm).forEach(key => {
          this.settingForm[key] = response[key]
        })
      })
    },
    methods: {
      /** 提交订单设置表单 */
      submitEditOrderSetting() {
        API_SystemSetting.editLineupSetting(this.settingForm.id,this.settingForm).then(() => {
          this.$message.success('修改成功！')
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
