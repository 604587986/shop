<template>
  <div v-loading="loading" class="refund-detail-container">
    <el-card v-if="settlement">
      <div slot="header" class="clearfix">
        <span>{{ settlement.refuse_type_text }}单</span>
      </div>
      <el-row :gutter="0">
        <el-col :span="4">{{ settlement.refuse_type_text }}单号</el-col>
        <el-col :span="8">{{ settlement.sn }}</el-col>
        <el-col :span="4">申请时间</el-col>
        <el-col :span="8">{{ settlement.create_time | unixToDate }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">{{ settlement.refuse_type_text }}原因</el-col>
        <el-col :span="8">{{ settlement.refund_reason }}</el-col>
        <el-col :span="4">申请退款金额</el-col>
        <el-col :span="8">{{ settlement.refund_price | unitPrice('￥') }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">退款方式</el-col>
        <el-col :span="8">{{ settlement.account_type_text }}</el-col>
        <el-col :span="4">售后状态</el-col>
        <el-col :span="8">{{ settlement.refund_status_text }}</el-col>
      </el-row>
      <template v-if="settlement.account_type === 'BANKTRANSFER'">
        <el-row :gutter="0">
          <el-col :span="4">银行名称</el-col>
          <el-col :span="20">{{ settlement.bank_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">银行开户行</el-col>
          <el-col :span="20">{{ settlement.bank_deposit_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">银行开户名</el-col>
          <el-col :span="20">{{ settlement.bank_account_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">银行账号</el-col>
          <el-col :span="20">{{ settlement.bank_account_number }}</el-col>
        </el-row>
      </template>
      <el-row v-else :gutter="0">
        <el-col :span="4">退款账户</el-col>
        <el-col :span="20">{{ settlement.return_account }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">客户备注</el-col>
        <el-col :span="20">{{ settlement.customer_remark || '&nbsp;' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">审核操作</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" size="small" v-model="refundPrice" style="width: 150px;">
            <template slot="prepend">￥</template>
          </el-input>
          <el-button v-if="settlement.after_sale_operate_allowable.allow_admin_refund" @click="handleRefundMoney" class="refund-btn">退款</el-button>
          <p v-if="settlement.payment_type === 'COD'" class="refund-tip">货到付款订单只能由商家退款</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import * as API_Order from '@/api/order'

  export default {
    name: 'settlementDetail',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,
        // 结算单详情
        settlement: '',
        /** 订单sn */
        id: this.$route.params.id,
        /** 商品 */
        goods: ''
      }
    },
    mounted() {
      this.GET_SettlementDetail()
    },
    beforeRouteUpdate(to, from, next) {
      this.sn = to.params.sn
      next()
    },
    activated() {
      this.sn = this.$route.params.sn
    },
    watch: {
      sn: 'GET_SettlementDetail'
    },
    methods: {
      /** 获取售后订单详情 */
      GET_SettlementDetail() {
        this.loading = true
        API_Order.getSettlementDetail(this.id).then(response => {
          this.loading = false
          console.log(response)
          // this.refund = response.refund
          // this.goods = response.goods
          // this.refundPrice = JSON.parse(JSON.stringify(response.settlement.refund_price))
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
  .refund-btn {
    position: relative;
    top: -1px;
    margin-left: 5px;
  }
  .refund-tip {
    color: red;
    font-size: 12px;
    margin: 5px 0 0 0;
    padding: 0;
  }
</style>

