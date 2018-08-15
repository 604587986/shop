<template>
  <div class="order-detail-container">
    <!--分销商结算单-->
    <!--<el-row v-for="(row, index) in orderInfo" :key="index" :gutter="0">-->
      <!--<el-col v-for="col in row" :key="col.key" :span="12">-->
        <!--<div class="d-header">{{ col.title }}</div>-->
        <!--<div class="d-content">-->
          <!--<div v-for="item in col.items" :key="item.key" class="item">-->
            <!--<span class="item-label" v-html="item.label"></span>-->
            <!--<span class="item-value">{{ item.value }}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--分销商订单-->
    <el-row v-if="disOrderList" :gutter="0">
      <el-col :span="24">
        <div class="d-header">分销商订单</div>
        <en-table-layout
          :tableData="disOrderList"
          pagination
          height="200px"
          :loading="disOrderLoading">
          <template slot="table-columns">
            <el-table-column prop="sn" label="账单号"/>
            <el-table-column label="订单金额">
              <template slot-scope="scope">￥{{ scope.row.order_price | unitPrice }}</template>
            </el-table-column>
            <el-table-column prop="message" label="提成金额">
              <template slot-scope="scope">￥{{ scope.row.price | unitPrice }}</template>
            </el-table-column>
          </template>
          <el-pagination
            v-if="disOrderList"
            slot="pagination"
            @size-change="handleDisOrderPageSizeChange"
            @current-change="handleDisOrderPageCurrentChange"
            :current-page="disOrderPageData.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="disOrderPageData.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="disOrderPageData.data_total">
          </el-pagination>
        </en-table-layout>
      </el-col>
    </el-row>
    <!--分销商退货订单-->
    <el-row v-if="disRefundOrderList" :gutter="0">
      <el-col :span="24">
        <div class="d-header">分销商退货订单</div>
        <en-table-layout
          :tableData="disRefundOrderList"
          pagination
          height="200px"
          :loading="disRefundOrderLoading">
          <template slot="table-columns">
            <el-table-column prop="sn" label="账单号" width="100"/>
            <el-table-column prop="op_name" label="订单金额" width="200">
              <template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>
            </el-table-column>
            <el-table-column prop="message" label="退换提成金额" width="400">
              <template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>
            </el-table-column>
          </template>
          <el-pagination
            v-if="disRefundOrderList"
            slot="pagination"
            @size-change="handleDisRefundOrderPageSizeChange"
            @current-change="handleDisRefundOrderPageCurrentChange"
            :current-page="disRefundOrderPageData.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="disRefundOrderPageData.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="disRefundOrderPageData.data_total">
          </el-pagination>
        </en-table-layout>
      </el-col>
    </el-row>
    <!--分销商结构图-->
    <!--<el-row v-loading="loading_log" :gutter="0">-->
      <!--<el-col :span="24">-->
        <!--<div class="d-header">分销商结构图</div>-->
        <!--<el-table :data="orderLog" :header-cell-style="{textAlign: 'center'}">-->
          <!--<el-table-column prop="log_id" label="分销商" width="100"/>-->
          <!--<el-table-column prop="op_name" label="结算金额" width="200">-->
            <!--<template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="op_name" label="提成金额" width="200">-->
            <!--<template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="op_name" label="订单量" width="200"/>-->
          <!--<el-table-column prop="op_name" label="订单金额" width="200">-->
            <!--<template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="op_name" label="退换提成金额" width="200">-->
            <!--<template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="op_name" label="退换订单金额" width="200">-->
            <!--<template slot-scope="scope">￥{{ scope.row.purchase_price | unitPrice }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="op_name" label="退换订单量" width="200"/>-->
        <!--</el-table>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import * as API_distribution from '@/api/distribution'
  import { Foundation } from '~/ui-utils'

  export default {
    name: 'billDetails',
    data() {
      return {
        /** 分销订单 */
        disOrderList: [],

        /** 分销订单分页数据 */
        disOrderPageData: {},

        /** 分销订单loading */
        disOrderLoading: false,

        /** 分销订单参数 */
        disOrderParams: {
          page_no: 1,
          page_size: 10,
          ...this.$route.query
        },

        /** 分销退款订单 */
        disRefundOrderList: [],

        /** 分销退款订单分页数据 */
        disRefundOrderPageData: {},

        /** 分销退款订单loading */
        disRefundOrderLoading: false,

        /** 分销退款订单参数 */
        disRefundOrderParams: {
          page_no: 1,
          page_size: 10,
          ...this.$route.query
        }
      }
    },
    activated() {
      this.disOrderParams = {
        ...this.disOrderParams,
        ...this.$route.query
      }
      this.disRefundOrderParams = {
        ...this.disRefundOrderParams,
        ...this.$route.query
      }
      this.GET_DisOrderList()
      this.GET_DisRefundOrderList()
    },
    beforeRouteUpdate(to, from, next) {
      this.disOrderParams = {
        ...this.disOrderParams,
        ...this.$route.query
      }
      this.disRefundOrderParams = {
        ...this.disRefundOrderParams,
        ...this.$route.query
      }
      this.GET_DisOrderList()
      this.GET_DisRefundOrderList()
      next()
    },
    mounted() {
      this.GET_DisOrderList()
      this.GET_DisRefundOrderList()
    },
    methods: {
      /** 获取分销订单列表 */
      GET_DisOrderList() {
        this.disOrderLoading = true
        API_distribution.getDisOrderList(this.disOrderParams).then(response => {
          this.disOrderLoading = false
          this.disOrderList = response.data
          this.disOrderPageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 分销订单分页大小发生改变 */
      handleDisOrderPageSizeChange(size) {
        this.disOrderParams.page_size = size
        this.GET_DisOrderList()
      },

      /** 分销订单分页页数发生改变 */
      handleDisOrderPageCurrentChange(page) {
        this.disOrderParams.page_no = page
        this.GET_DisOrderList()
      },

      /** 获取分销退款订单列表 */
      GET_DisRefundOrderList() {
        this.disRefundOrderLoading = true
        API_distribution.getDisRefundOrderList(this.disRefundOrderParams).then(response => {
          this.disRefundOrderLoading = false
          this.disRefundOrderList = response.data
          this.disRefundOrderPageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 分销订单退款单分页大小发生改变 */
      handleDisRefundOrderPageSizeChange(size) {
        this.disRefundOrderParams.page_size = size
        this.GET_DisRefundOrderList()
      },

      /** 分销订单退款单分页页数发生改变 */
      handleDisRefundOrderPageCurrentChange(page) {
        this.disRefundOrderParams.page_no = page
        this.GET_DisRefundOrderList()
      },

      /** 获取分销商账单详情 */
      GET_OrderLog() {
      },

      /** 组合基本信息、发票信息、买家信息、商家信息 */
      countShowData() {
        const o = this.orderDetail
        const f = Foundation
        this.orderInfo = [
          [
            {
              title: '基本信息',
              key: 'base',
              items: [
                { label: '订单编号', value: o.sn },
                { label: '订单金额', value: '￥' + f.formatPrice(o.need_pay_money) },
                { label: '支付方式', value: (o.payment_type === 'ONLINE' ? '在线支付' : '货到付款') + '-' + (o.payment_method_name || '未支付') },
                { label: '订单状态', value: o.order_status_text + (o.cancel_reason ? '（' + o.cancel_reason + '）' : '') },
                { label: '下单时间', value: f.unixToDate(o.create_time) }
              ]
            },
            {
              title: '发票信息',
              key: 'receipt',
              items: [
                { label: '发票类型', value: o.receipt_history ? o.receipt_history.receipt_type || '无' : '不需要发票' },
                { label: '发票抬头', value: o.receipt_history ? o.receipt_history.receipt_title || '无' : '无' },
                { label: '发票内容', value: o.receipt_history ? o.receipt_history.receipt_content || '无' : '无' },
                { label: '发票税号', value: o.receipt_history ? o.receipt_history.tax_no || '无' : '无' },
                { label: '发票金额', value: o.receipt_history ? f.formatPrice(o.receipt_history.receipt_amount) || '无' : '无' }
              ]
            }
          ],
          [
            {
              title: '买家信息',
              key: 'buyer',
              items: [
                { label: '收&ensp;货&ensp;人', value: o.ship_name },
                { label: '收货地址', value: o.ship_province + o.ship_city + o.ship_county + o.ship_town + ' ' + o.ship_addr },
                { label: '联系方式', value: o.ship_mobile },
                { label: '买家留言', value: o.remark || '无' }
              ]
            },
            {
              title: '商家信息',
              key: 'seller',
              items: [
                { label: '卖家账号', value: o.seller_name },
                { label: '发货时间', value: o.ship_time ? f.unixToDate(o.ship_time) : '未发货' },
                { label: '物流公司', value: o.logi_name || '未发货' },
                { label: '快递单号', value: o.ship_no || '未发货' }
              ]
            }
          ]
        ]
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    display: none;
  }

  .order-detail-container {
    background-color: #fff;
  }

  .d-header {
    padding: 10px 0 10px 20px;
    font-size: 14px;
    color: #333;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e1e8ed;

    &h2 {
      font-size: 14px;
      font-weight: 400;
    }
  }

  .item {
    width: 100%;
    position: relative;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    padding: 16px 0 16px 20px;
    line-height: 24px;
    white-space: nowrap;

    & .item-label {
      float: left;
      margin-right: 20px;
      font-size: 14px;
      color: #999;
    }
    & .item-value {
      overflow: hidden;
      white-space: normal;
      word-break: break-all;
      font-size: 14px;
      color: #666;
    }
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }
  .goods-name {
    color: #4183c4;
    &:hover { color: #f42424 }
  }
  .sku-spec {
    color: #ff9800;
    margin: 0;
  }
</style>


