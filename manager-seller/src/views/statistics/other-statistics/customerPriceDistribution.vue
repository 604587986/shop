<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>订单周期：</span>
          <en-year-month-picker @changed="yearMonthChanged"/>
        </div>
        <div class="chart-header-item">
          <span>店铺：</span>
          <en-shop-picker/>
        </div>
      </div>
      <el-tabs v-model="cur_tab" type="card">
        <el-tab-pane label="客单价分布" name="price">
          <customer-price-distribution-price :params="params" :cur-tab="cur_tab" :change_flag="change_flag"/>
        </el-tab-pane>
        <el-tab-pane label="购买时段分布" name="period">
          <customer-price-distribution-period :params="params" :cur-tab="cur_tab" :change_flag="change_flag"/>
        </el-tab-pane>
        <el-tab-pane label="购买频次分析表" name="frequency">
          <customer-price-distribution-frequency :params="params" :cur-tab="cur_tab" :change_flag="change_flag"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  import { YearMonthPicker, ShopPicker, PriceRange } from '@/components'
  import CustomerPriceDistributionPrice from './customerPriceDistributionPrice'
  import CustomerPriceDistributionPeriod from './customerPriceDistributionPeriod'
  import CustomerPriceDistributionFrequency from './customerPriceDistributionFrequency'
  import { Foundation } from '@/framework'
  export default {
    name: 'customerPriceDistribution',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [ShopPicker.name]: ShopPicker,
      [PriceRange.name]: PriceRange,
      CustomerPriceDistributionPrice,
      CustomerPriceDistributionPeriod,
      CustomerPriceDistributionFrequency
    },
    data() {
      return {
        cur_tab: 'price',
        shopList: [],
        change_flag: 1,
        params: {
          start_date: '',
          end_date: '',
          shop_id: 0,
          sections: 0
        }
      }
    },
    created() {
      this.GET_ShopList()
    },
    watch: {
      cur_tab() {
        this.change_flag++
      }
    },
    methods: {
      /** 年月份发生变化 */
      yearMonthChanged(object) {
        this.params.start_date = object.start_time
        this.params.end_date = object.end_time
        this.change_flag++
      },
      /** 店铺发生改变 */
      shopChange() {
        this.change_flag++
      },
      /** 获取店铺列表 */
      GET_ShopList() {
        API_Shop.getShopList().then(response => {
          this.shopList = response.data
        }).catch(error => console.log(error))
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
