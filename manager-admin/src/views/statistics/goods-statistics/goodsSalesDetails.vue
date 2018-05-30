<template>
  <div v-loading="loading" class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>商品分类</span>
          <en-category-picker :clearable="true" @changed="(category) => { params.category = category.category_id || 0 }"/>
        </div>
        <div class="chart-header-item">
          <span>订单周期：</span>
          <en-year-month-picker @changed="yearMonthChanged"/>
        </div>
        <div class="chart-header-item">
          <span>店铺：</span>
          <en-shop-picker @changed="(shop) => { params.seller_id = shop_id }"/>
        </div>
      </div>
      <en-tabel-layout
        :toolbar="false"
        :tableData="tableData.data"
        border
      >
        <template slot="table-columns">
          <el-table-column prop="goods_name" label="商品名称"/>
          <el-table-column prop="ordernum" label="下单量"/>
          <el-table-column prop="num" label="下单商品件数"/>
          <el-table-column prop="price" label="下单金额" :formatter="MixinFormatPrice"/>
        </template>
        <el-pagination
          v-if="tableData"
          slot="pagination"
          @size-change="(size) => { params.page_size = size }"
          @current-change="(page_no) => { params.page_no = page_no }"
          :current-page="params.page_no"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="params.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.data_total">
        </el-pagination>
      </en-tabel-layout>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { CategoryPicker } from '@/components'

  export default {
    name: 'goodsSalesDetails',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        loading: false,
        /** 列表数据 */
        tableData: '',
        /** 参数 */
        params: {
          year: '',
          month: '',
          circle: 'MONTH',
          categroy: 0,
          seller_id: 0,
          page_no: 1,
          page_size: 10
        }
      }
    },
    watch: {
      params: {
        handler: 'GET_GoodsSalesDetail',
        deep: true
      }
    },
    methods: {
      /** 年月份发生变化 */
      yearMonthChanged(object) {
        this.params.year = object.year
        this.params.month = object.month
        this.params.circle = object.type
      },

      /** 获取商品销售明细 */
      GET_GoodsSalesDetail() {
        this.loading = true
        API_Statistics.getGoodsSaleDetail(this.params).then(response => {
          this.loading = false
          this.tableData = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    background-color: #fff;
    padding: 10px;
  }
  .chart-header {
    padding: 0 10px;
  }
  .chart-header-item {
    display: inline-block;
    margin-right: 30px;
  }
  .tab-chart {
    height: 300px;
  }
</style>
