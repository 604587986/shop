<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-select v-model="orderStatus" placeholder="请选择订单状态" @change="changeOrderStatus">
            <el-option
              v-for="item in orderStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            advancedWidth="465"
            placeholder="请输入关键字"
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="订单号">
                  <el-input size="medium" v-model="advancedForm.order_sn" clearable></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                  <el-input size="medium" v-model="advancedForm.ship_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="买家名字">
                  <el-input size="medium" v-model="advancedForm.buyer_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="下单日期">
                  <el-date-picker
                    v-model="advancedForm.order_time_range"
                    type="daterange"
                    align="center"
                    :editable="false"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-select v-model="advancedForm.order_status" placeholder="请选择" clearable>
                    <el-option label="新订单" value="NEW"/>
                    <el-option label="已确认" value="CONFIRM"/>
                    <el-option label="已付款" value="PAID_OFF"/>
                    <el-option label="已发货" value="SHIPPED"/>
                    <el-option label="已收货" value="ROG"/>
                    <el-option label="已完成" value="COMPLETE"/>
                    <el-option label="已取消" value="CANCELLED"/>
                    <el-option label="售后中" value="AFTE_SERVICE"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
    </en-tabel-layout>
    <table class="my-table">
      <thead>
      <tr class="bg-order">
        <th class="shoplist-header"><span>商品</span> <span>单价/数量</span></th>
        <th>买家</th>
        <th>下单时间</th>
        <th>订单状态</th>
        <th>订单来源</th>
        <th>实付金额</th>
      </tr>
      </thead>
      <tbody v-for="item in tableData">
      <tr style="width: 100%;height: 10px;"></tr>
      <tr class="bg-order">
        <td class="shoplist-content-out" colspan="5">订单编号：{{item.sn}}</td>
        <td>
          <el-button
            size="mini"
            type="text"
            @click="handleOperateOrder(item)">查看详情
          </el-button>
        </td>
      </tr>
      <tr>
        <!--商品-->
        <td>
          <p v-for="shop in item.skuList" class="shoplist-content">
              <span class="goods-info">
                <img :src="shop.goods_image" alt="" class="goods-image"/>
                <a href="#">{{ shop.goods_name }}</a>
              </span>
            <span>
                <span>{{shop.goods_price | unitPrice('￥')}}</span> × <span>1</span>
              </span>
          </p>
        </td>
        <!--买家-->
        <td> {{ item.ship_name }}</td>
        <!--下单时间-->
        <td>{{ item.order_time | unixToDate }}</td>
        <!--订单状态-->
        <td>{{ item.order_status_text }}</td>
        <!--订单来源-->
        <td>{{ item.client_type }}</td>
        <!--实付金额-->
        <td>
          <div class="order-money">
            <!--订单总金额-->
            <span class="order-amount">{{ item.order_amount | unitPrice('￥')}}</span>
            <!--运费/邮费-->
            <span>运费({{ item.shipping_amount | unitPrice('￥') }})</span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <el-pagination
      slot="pagination"
      v-if="pageData"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      :current-page="pageData.page_no"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.data_total">
    </el-pagination>
  </div>
</template>

<script>
  import * as API_order from '@/api/order'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'orderList',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 高级搜索数据 */
        advancedForm: {},
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },

        /** 订单状态 */
        orderStatus: '',

        /** 订单状态 列表*/
        orderStatusList: [
          { value: 0, label: '全部' },
          { value: 1, label: '待付款' },
          { value: 2, label: '待发货' },
          { value: 3, label: '待收货' }
        ]
      }
    },
    filters: {
      paymentTypeFilter(val) {
        return val === 'online' ? '在线支付' : '货到付款'
      }
    },
    mounted() {
      this.GET_OrderList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_OrderList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_OrderList()
      },

      /** 订单状态改变 */
      changeOrderStatus(data) {
        this.params = {
          ...this.params,
          orderStatus: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_OrderList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_OrderList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        if (this.advancedForm.order_time_range) {
          this.params.start_time = this.advancedForm.order_time_range[0]
          this.params.end_time = this.advancedForm.order_time_range[1]
        }
        delete this.params.keyword
        delete this.params.order_time_range
        this.GET_OrderList()
      },

      /** 查看、操作订单 */
      handleOperateOrder(item) {
        this.$router.push({ path: `/order/detail/${item.sn}` })
      },

      GET_OrderList() {
        this.loading = true
        API_order.getOrderList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /* 工具条*/
  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 20px;
  }

  /*表格信息*/
  .my-table {
    .bg-order {
      background: #FAFAFA;
    }
    width: 100%;
    background: #ffffff;
    border-collapse: collapse;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
    font-bold: 700;
    thead {
      th {
        padding: 20px 0;
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        color: #909399;
      }
      .shoplist-header {
        padding: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
      }
    }
    tbody {
      margin-top: 10px;
      td {
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        vertical-align: middle;
        text-align: center;
      }
      td:first-child {
        text-align: left;
      }
      td:not(:first-child) {
        padding: 20px;
      }
      td.shoplist-content-out {
        padding: 20px;
      }

      /*商品信息*/
      p.shoplist-content:not(:last-child) {
        border-bottom: 1px solid #ebeef5;
        border-collapse: collapse;
      }
      p.shoplist-content {
        margin: 0;
        padding: 20px;
        box-sizing: padding-box;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        .goods-info {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;
          img {
            display: block;
            margin-right: 10px;
          }
          a {
            display: block;
            color: #409EFF;
          }
        }
      }
      div.order-money {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        span {
          display: inline-block;
          padding: 5px;
        }
        span.order-amount {
          color: red;
        }
      }
    }
    /*图片*/
    .goods-image {
      width: 50px;
      height: 50px;
    }
  }

  /*分页信息*/
  .el-pagination {
    text-align: right;
    width: 100%;
    background: #ffffff;
    height: 40px;
  }
</style>

