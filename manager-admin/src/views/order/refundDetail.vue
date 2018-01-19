<template>
  <div v-loading="loading" class="refund-detail-container">
    <el-row :gutter="0">
      <el-col :span="24">
        {{ refundType }}单
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4">{{ refundType }}单号</el-col><el-col :span="8">{{ refundDetail.sn }}</el-col>
      <el-col :span="4">申请时间</el-col><el-col :span="8">{{ refundDetail.create_time | unixToDate }}</el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4">{{ refundType }}原因</el-col><el-col :span="8">{{ refundDetail.refund_reason }}</el-col>
      <el-col :span="4">申请退款金额</el-col><el-col :span="8">￥{{ refundDetail.refund_price | unitPrice }}</el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4">退款方式</el-col><el-col :span="8">{{ refundDetail.account_type_text }}</el-col>
      <el-col :span="4">售后状态</el-col><el-col :span="8">{{ refundDetail.refund_status_text }}</el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4">客户备注</el-col><el-col :span="20">{{ refundDetail.customer_remark }}</el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4">退款账户</el-col><el-col :span="20">{{ refundDetail.return_account }}</el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4">审核</el-col>
      <el-col :span="20">
        <el-input placeholder="请输入内容" size="small" v-model="refundPrice" style="width: 250px;">
          <template slot="prepend">￥</template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as API_Refund from '@/api/refund'
  import Foundation from '@/framework/Foundation'
  export default {
    name: 'refundDetail',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,
        /** 订单日志loading状态 */
        loading_log: false,
        /** 订单详情数据 */
        refundDetail: {},
        /** 订单sn */
        sn: this.$route.params.sn,
        /** 商品 */
        goods: null,
        /** 申请售后类型 */
        refundType: '',
        /** 审核退款金额 */
        refundPrice: null
      }
    },
    filters: {
      refuseTypeFilter(val) {
        return val === 'return_money' ? '退款' : '退货'
      }
    },
    mounted() {
      this.GET_RefundDetail()
    },
    methods: {
      GET_RefundDetail() {
        this.loading = true
        API_Refund.getRefundDetail(this.sn).then(response => {
          this.loading = false
          this.refundDetail = response.refund
          this.goods = response.goods
          this.refundType = response.refund.refuse_type === 'return_money' ? '退款' : '退货'
          this.refundPrice = response.refund.refund_price
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .refund-detail-container {
    background-color: #fff;
  }

  .el-row {
    border-bottom: 1px solid #ebeef5;
    position: relative;
  }

  .el-col {
    padding: 10px;
    position: relative;
    &:not(:first-child)::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 100%;
      background-color: #ebeef5;
    }
  }

</style>

