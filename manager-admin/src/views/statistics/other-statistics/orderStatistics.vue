<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>商品分类</span>
          <en-category-picker clearable @changed="(category) => { params.categroy = category.category_id || 0 }"/>
        </div>
        <div class="chart-header-item">
          <span>查询周期：</span>
          <en-year-month-picker @changed="yearMonthChanged"/>
        </div>
        <div class="chart-header-item">
          <span>店铺：</span>
          <en-shop-picker @changed="(shop) => { params.seller_id = shop_id }"/>
        </div>
      </div>
      <el-tabs v-model="cur_tab" type="card">
        <el-tab-pane label="下单金额" name="price">
          <order-statistics-price :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
        <el-tab-pane label="下单量" name="order">
          <order-statistics-order :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import orderStatisticsPrice from './orderStatisticsPrice'
  import orderStatisticsOrder from './orderStatisticsOrder'

  export default {
    name: 'orderStatistics',
    components: {
      orderStatisticsPrice,
      orderStatisticsOrder
    },
    data() {
      return {
        cur_tab: 'price',
        params: {
          year: '',
          month: '',
          start_time: '',
          end_time: '',
          type: 'MONTH',
          order_status: 99,
          categroy: 0,
          seller_id: 0
        }
      }
    },
    methods: {
      /** 年月份发生变化 */
      yearMonthChanged(object) {
        this.params.year = object.year
        this.params.month = object.month
        this.params.start_time = object.start_time
        this.params.end_time = object.end_time
        this.params.type = object.type
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
