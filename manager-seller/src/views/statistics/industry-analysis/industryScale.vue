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
          <el-select
            v-model="params.shop_id"
            placeholder="请选择"
            @change="shopChange"
            style="width: 150px"
          >
            <el-option label="全平台" :value="0"/>
            <el-option
              v-for="item in shopList"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"/>
          </el-select>
        </div>
      </div>
      <el-tabs v-model="cur_tab" type="card">
        <el-tab-pane label="下单量" name="order">
          <industry-scale-order :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
        <el-tab-pane label="下单商品数量" name="goods">
          <industry-scale-goods :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
        <el-tab-pane label="下单金额" name="price">
          <industry-scale-price :params="params" :cur-tab="cur_tab"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  import { YearMonthPicker } from '@/components'
  import industryScaleOrder from './industryScaleOrder'
  import industryScaleGoods from './industryScaleGoods'
  import industryScalePrice from './industryScalePrice'
  import { Foundation } from '@/framework'
  export default {
    name: 'industryScale',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      IndustryScaleOrder: industryScaleOrder,
      IndustryScaleGoods: industryScaleGoods,
      IndustryScalePrice: industryScalePrice
    },
    data() {
      return {
        cur_tab: 'order',
        shopList: [],
        change_flag: 1,
        params: {
          year: '',
          month: '',
          type: 1,
          shop_id: 0
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
        this.params.year = object.year
        this.params.month = object.month
        this.params.type = object.type === 'month' ? 1 : 2
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
