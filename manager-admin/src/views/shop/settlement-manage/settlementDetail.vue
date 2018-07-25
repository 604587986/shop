<template>
  <div class="refund-detail-container">
    <el-card v-if="settlement">
      <div slot="header" class="clearfix">
        <span>结算单详细信息</span>
        <!--<el-button type="primary" size="mini" @click="handleExportBill" style="margin-left: 10px">导出结算单</el-button>-->
      </div>
      <el-row :gutter="0">
        <el-col :span="4">结算单号</el-col>
        <el-col :span="8">{{ settlement.bill_sn || '无' }}</el-col>
        <el-col :span="4">起止日期</el-col>
        <el-col :span="8">{{ settlement.start_time | unixToDate }} - {{ settlement.end_time | unixToDate }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">出账日期</el-col>
        <el-col :span="8">{{ settlement.create_time | unixToDate }}</el-col>
        <el-col :span="4">结算状态</el-col>
        <el-col :span="8">{{ settlement.status_text || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">店铺名称</el-col>
        <el-col :span="20">{{ settlement.shop_name || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">银行开户名</el-col>
        <el-col :span="8">{{ settlement.bank_account_name || '无' }}</el-col>
        <el-col :span="4">公司银行账号</el-col>
        <el-col :span="8">{{ settlement.bank_account_number || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">开户银行支行名称</el-col>
        <el-col :span="8">{{ settlement.bank_name || '无' }}</el-col>
        <el-col :span="4">支行联行号</el-col>
        <el-col :span="8">{{ settlement.bank_code || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">银行地址</el-col>
        <el-col :span="20">{{ settlement.bank_address || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">平台应付金额</el-col>
        <el-col :span="20">
          <em class="plus">￥{{ settlement.bill_price | unitPrice }}</em>
          <em class="equal"> = </em>
          <em class="plus">￥{{ settlement.price | unitPrice }}</em>(在线支付金额)
          <em class="minus"> - ￥{{ settlement.refund_price | unitPrice }}</em>(在线退款金额)
          <em class="minus"> - ￥{{ settlement.commi_price | unitPrice }}</em>(佣金金额)
          <em class="plus"> + ￥{{ settlement.refund_commi_price | unitPrice }}</em>(退还佣金)
        </el-col>
      </el-row>
    </el-card>
    <el-card v-loading="loading_order" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>订单列表</span>
      </div>
      <en-table-layout :tableData="tableDataOrder.data" :toolbar="false">
        <template slot="table-columns">
          <!--订单编号-->
          <el-table-column prop="order_sn" label="订单编号"/>
          <!--下单时间-->
          <el-table-column prop="add_time" :formatter="MixinUnixToDate" label="下单时间"/>
          <!--订单总额-->
          <el-table-column prop="price" :formatter="MixinFormatPrice" label="订单总额"/>
          <!--支付方式-->
          <el-table-column label="支付方式">
            <template slot-scope="scope">{{ scope.row.payment_type === 'COD' ? '货到付款' : '在线支付' }}</template>
          </el-table-column>
          <!--操作-->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.order_status !== 'COMPLETE'"
                size="mini"
                type="primary"
                @click="() => { $router.push({ path: '/order/detail/' + scope.row.order_sn }) }"
              >查看</el-button>
            </template>
          </el-table-column>
        </template>
        <el-pagination
          v-if="tableDataOrder"
          slot="pagination"
          @size-change="handlePageSizeChangeOrder"
          @current-change="handlePageCurrentChangeOrder"
          :current-page="params_order.page_no"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="params_order.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataOrder.data_total">
        </el-pagination>
      </en-table-layout>
    </el-card>
    <el-card v-loading="loading_refund" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>退款单</span>
      </div>
      <en-table-layout :tableData="tableDataRefund.data" :toolbar="false">
        <template slot="table-columns">
          <el-table-column prop="refund_sn" label="退款单号"/>
          <el-table-column prop="order_sn" label="退款订单号"/>
          <el-table-column prop="sn" label="支付方式">
            <template slot-scope="scope">{{ scope.row.payment_type === 'COD' ? '货到付款' : '在线支付' }}</template>
          </el-table-column>
          <el-table-column prop="refund_time" :formatter="MixinUnixToDate" label="操作时间"/>
          <el-table-column prop="price" :formatter="MixinFormatPrice" label="退款金额"/>
        </template>
        <el-pagination
          v-if="tableDataRefund"
          slot="pagination"
          @size-change="handlePageSizeChangeRefund"
          @current-change="handlePageCurrentChangeRefund"
          :current-page="params_refund.page_no"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="params_refund.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataRefund.data_total">
        </el-pagination>
      </en-table-layout>
    </el-card>
  </div>
</template>

<script>
  import * as API_Order from '@/api/order'

  export default {
    name: 'settlementDetail',
    data() {
      return {
        // 结算单详情
        settlement: '',
        /** 订单sn */
        id: this.$route.params.id,
        /** 商品 */
        goods: '',
        // 结算单里的订单参数
        params_order: {
          page_no: 1,
          page_size: 5
        },
        // 结算单订单 loading
        loading_order: false,
        // 结算单里的订单列表
        tableDataOrder: '',
        // 结算单里的退款单参数
        params_refund: {
          page_no: 1,
          page_size: 5
        },
        // 结算单退款单loading
        loading_refund: false,
        // 结算单里的退款单列表
        tableDataRefund: ''
      }
    },
    mounted() {
      this.GET_SettlementDetail()
    },
    beforeRouteUpdate(to, from, next) {
      this.id = to.params.id
      next()
    },
    activated() {
      this.id = this.$route.params.id
    },
    watch: {
      id: 'GET_SettlementDetail'
    },
    methods: {
      /** 导出结算单 */
      handleExportBill() {
        API_Order.exportBill(this.settlement.bill_id).then(response => {
          console.log(response)
        })
      },
      /** 订单列表分页大小发生改变 */
      handlePageSizeChangeOrder(page_size) {
        this.params_order.page_size = page_size
        this.GET_SettlementOrderList()
      },
      /** 订单列表分页数发生改变 */
      handlePageCurrentChangeOrder(page_no) {
        this.params_order.page_no = page_no
        this.GET_SettlementOrderList()
      },
      /** 退款单列表分页大小发生改变 */
      handlePageSizeChangeRefund(page_size) {
        this.params_refund.page_size = page_size
        this.GET_SettlementRefundList()
      },
      /** 退款单列表分页数发生改变 */
      handlePageCurrentChangeRefund(page_no) {
        this.params_refund.page_no = page_no
        this.GET_SettlementRefundList()
      },
      /** 获取售后订单详情 */
      GET_SettlementDetail() {
        API_Order.getSettlementDetail(this.id).then(response => {
          this.settlement = response
          this.GET_SettlementOrderList()
          this.GET_SettlementRefundList()
        })
      },
      /** 获取结算单里的订单 */
      GET_SettlementOrderList() {
        this.loading_order = true
        API_Order.getSettlementOrderList(this.settlement.bill_id, 'PAYMENT', this.params_order).then(response => {
          this.loading_order = false
          this.tableDataOrder = response
        }).catch(() => { this.loading_order = false })
      },
      /** 获取结算单里的退款单 */
      GET_SettlementRefundList() {
        this.loading_refund = true
        API_Order.getSettlementOrderList(this.settlement.bill_id, 'REFUND', this.params_refund).then(response => {
          this.loading_refund = false
          this.tableDataRefund = response
        }).catch(() => { this.loading_refund = false })
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
  .equal, .plus, .minus {
    font-weight: 700;
    font-style: normal;
  }
  // 等于
  .equal {
    color: #409EFF
  }
  // 加
  .plus {
    color: #67C23A
  }
  // 减
  .minus {
    color: #F56C6C
  }
</style>

