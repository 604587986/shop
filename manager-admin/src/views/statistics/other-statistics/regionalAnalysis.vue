<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>订单周期：</span>
          <en-year-month-picker @changed="handleYearMonthChanged"/>
        </div>
        <div class="chart-header-item">
          <span>选择店铺：</span>
          <en-shop-picker @changed="handleShopChanged"/>
        </div>
      </div>
      <el-tabs v-model="cur_tab" type="card" @tab-click="handleTabChanged">
        <el-tab-pane label="下单会员" name="member">
          <regional-analysis-member :params="params" :cur_tab="cur_tab" :changed_flag="changed_flag"/>
        </el-tab-pane>
        <el-tab-pane label="下单量" name="num">

        </el-tab-pane>
        <el-tab-pane label="下单金额" name="price">

        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { YearMonthPicker, ShopPicker } from '@/components'
  import regionalAnalysisMember from './regionalAnalysisMember'
  import echartMapChina from '@/assets/echart-map-china'
  export default {
    name: 'regionalAnalysis',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [ShopPicker.name]: ShopPicker,
      RegionalAnalysisMember: regionalAnalysisMember
    },
    data() {
      return {
        changed_flag: 0,
        cur_tab: 'member',
        params: {
          year: '',
          month: '',
          shop_id: 0,
          type: 1,
          cycle_type: 1
        }
      }
    },
    created() {
      this.$echarts.registerMap('china', echartMapChina)
    },
    methods: {
      /** 年月发生改变 */
      handleYearMonthChanged(object) {
        this.params.year = object.year
        this.params.month = object.month
        this.changed_flag++
      },
      /** 店铺发生改变 */
      handleShopChanged(shop) {
        this.params.shop_id = shop.shop_id
        this.changed_flag++
      },
      /** Tab发生改变 */
      handleTabChanged($tab) {
        this.params.type = Number($tab.index) + 1
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
</style>
