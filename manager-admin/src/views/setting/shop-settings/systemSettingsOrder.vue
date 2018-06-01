<template>
  <el-form :model="orderForm" :rules="orderRules" ref="orderForm" label-width="130px" style="width: 500px">
    <el-form-item label="自动取消订单天数" prop="cancel_order_day">
      <el-input-number size="small" v-model="orderForm.cancel_order_day"></el-input-number>
    </el-form-item>
    <el-form-item label="自动确认收货天数" prop="name">
      <el-input-number size="small" v-model="orderForm.rog_order_day"></el-input-number>
    </el-form-item>
    <el-form-item label="自动完成订单天数" prop="name">
      <el-input-number size="small" v-model="orderForm.complete_order_day"></el-input-number>
    </el-form-item>
    <el-form-item label="自动支付天数" prop="name">
      <el-input-number size="small" v-model="orderForm.pay_order_day"></el-input-number>
    </el-form-item>
    <el-form-item label="售后失效天数" prop="name">
      <el-input-number size="small" v-model="orderForm.service_expired_day"></el-input-number>
    </el-form-item>
    <el-form-item label="评价超时天数" prop="name">
      <el-input-number size="small" v-model="orderForm.comment_order_day"></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'systemSettingsOrder',
    data() {
      return {
        /** 订单设置 */
        orderForm: {},
        orderRules: {}
      }
    },
    mounted() {},
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
