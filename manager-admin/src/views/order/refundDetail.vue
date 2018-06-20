<template>
  <div v-loading="loading" class="refund-detail-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ refund.refuse_type_text }}单</span>
      </div>
      <el-row :gutter="0">
        <el-col :span="4">{{ refund.refuse_type_text }}单号</el-col><el-col :span="8">{{ refund.sn }}</el-col>
        <el-col :span="4">申请时间</el-col><el-col :span="8">{{ refund.create_time | unixToDate }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">{{ refund.refuse_type_text }}原因</el-col><el-col :span="8">{{ refund.refund_reason }}</el-col>
        <el-col :span="4">申请退款金额</el-col><el-col :span="8">{{ refund.refund_price | unitPrice('￥') }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">退款方式</el-col><el-col :span="8">{{ refund.account_type_text }}</el-col>
        <el-col :span="4">售后状态</el-col><el-col :span="8">{{ refund.refund_status_text }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">客户备注</el-col><el-col :span="20">{{ refund.customer_remark || '&nbsp;' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">退款账户</el-col><el-col :span="20">{{ refund.return_account }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">审核</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" size="small" v-model="refundPrice" style="width: 150px;">
            <template slot="prepend">￥</template>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import * as API_Refund from '@/api/refund'
  // Andste_TODO 2018/6/16: 缺少审核操作和商品详情
  export default {
    name: 'refundDetail',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,
        // 退款（货）单详情
        refund: '',
        /** 订单sn */
        sn: this.$route.params.sn,
        /** 商品 */
        goods: '',
        /** 审核退款金额 */
        refundPrice: 0
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
          this.refund = response.refund
          this.goods = response.goods
          this.refundPrice = JSON.parse(JSON.stringify(response.refund.refund_price))
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .refund-detail-container {
    padding: 10px;
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
  /deep/ .el-card__body {
    margin: 10px;
    padding: 0;
    border: 1px solid #ebeef5;
    border-bottom: 0;
  }
</style>

