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
        <div class="chart-header-item">
          <span>价格区间：</span>
          <en-price-range :default-range="priceRange" @changed="handleRriceRangeChanged"/>
        </div>
      </div>
      <div id="price-sales-chart" style="height: 300px"></div>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import * as API_Shop from '@/api/shop'
  import { CategoryPicker, YearMonthPicker, PriceRange } from '@/components'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'priceSales',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [CategoryPicker.name]: CategoryPicker,
      [PriceRange.name]: PriceRange
    },
    data() {
      return {
        loading: false,
        change_flag: 1,
        shopList: [],
        params: {
          cat_id: 0,
          shop_id: 0,
          year: '',
          month: '',
          type: 1
        },
        priceRange: [[0, 100], [101, 1000], [1001, 10000], [10001, 50000]]
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
      /** 价格区间发生改变 */
      handleRriceRangeChanged(range) {
        this.priceRange = range
        this.GET_PriceSalesData()
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
        this.params.minprice = this.priceRange.map((item, index) => item[0]).join(',')
        this.params.maxprice = this.priceRange.map((item, index) => item[1]).join(',')
        API_Statistics.getPriceSales(this.params).then(response => {
          this.loading = false
          const xAxisData = this.priceRange.map((item, index) => {
            return `${item[0]} - ${item[1]}元`
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
