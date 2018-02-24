<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>商品分类</span>
          <en-category-picker :clearable="true" @changed="categoryChanged"/>
        </div>
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
      <div id="price-sales-chart" style="height: 300px"></div>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import * as API_Shop from '@/api/shop'
  import { CategoryPicker, YearMonthPicker } from '@/components'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'priceSales',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        loading: false,
        change_flag: 1,
        shopList: [],
        min_prices: [0, 101, 1001, 10001],
        max_prices: [100, 1000, 10000, 50000],
        params: {
          cat_id: 0,
          shop_id: 0,
          year: '',
          month: '',
          type: 1
        }
      }
    },
    mounted() {
      this.GET_ShopList()
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('price-sales-chart'))
      })
    },
    watch: {
      change_flag() {
        this.GET_PriceSalesData()
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
      /** 商品分类发生改变 */
      categoryChanged(data) {
        this.params.cat_id = data.category_id || 0
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
      },

      /** 获取价格销量数据 */
      GET_PriceSalesData() {
        this.loading = true
        this.params.minprice = this.min_prices.join(',')
        this.params.maxprice = this.max_prices.join(',')
        API_Statistics.getPriceSales(this.params).then(response => {
          this.loading = false
          const xAxisData = this.min_prices.map((item, index) => {
            return `${item}${this.max_prices[index] !== undefined ? '-' + this.max_prices[index] : ''}元`
          })
          this.echarts.setOption(echartsOptions({
            titleText: '价格销量分布',
            tooltipFormatter: function(params) {
              params = params[0]
              return `${params.seriesName}：${params.value}`
            },
            xAxisData,
            seriesName: '此价格区间销量',
            seriesData: response.data
          }))
          console.log(response)
        }).catch(error => {
          this.loading = false
          console.log(error)
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
</style>
