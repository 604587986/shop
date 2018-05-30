<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>商品分类</span>
          <en-category-picker :clearable="true" @changed="(category) => { params.categroy = category.category_id || 0 }"/>
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
      <el-tabs v-model="cur_tab" type="card">
        <el-tab-pane label="销售金额" name="price">
          <hot-goods-price :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
        <el-tab-pane label="销售数量" name="num">
          <hot-goods-num :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import {CategoryPicker, ShopPicker, YearMonthPicker} from '@/components'
  import hotGoodsPrice from './hotGoodsPrice'
  import hotGoodsNum from './hotGoodsNum'

  export default {
    name: 'hotGoods',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [CategoryPicker.name]: CategoryPicker,
      [ShopPicker.name]: ShopPicker,
      HotGoodsPrice: hotGoodsPrice,
      HotGoodsNum: hotGoodsNum
    },
    data() {
      return {
        cur_tab: 'price',
        params: {
          year: '',
          month: '',
          circle: 'MONTH',
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
        this.params.circle = object.type.toLocaleUpperCase()
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
