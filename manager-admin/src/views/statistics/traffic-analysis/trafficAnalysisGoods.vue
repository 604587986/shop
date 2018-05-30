<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>订单周期：</span>
          <en-year-month-picker @changed="handleYearMonthChanged"/>
        </div>
        <div class="chart-header-item">
          <span>店铺：</span>
          <en-shop-picker @changed="handleShopChanged"/>
        </div>
      </div>
      <div id="traffic-analysis-goods-chart" style="height: 300px"></div>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { ShopPicker } from '@/components'
  import echartsOptions from '../echartsOptions'

  export default {
    name: 'trafficAnalysisGoods',
    components: {
      [ShopPicker.name]: ShopPicker
    },
    data() {
      return {
        loading: false,
        changed_flag: 0,
        params: {
          start_date: '',
          end_date: '',
          shop_id: 0,
          type: 1
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('traffic-analysis-goods-chart'))
      })
    },
    watch: {
      'changed_flag': 'GET_TrafficAnalysisGoodsData'
    },
    methods: {
      /** 年月发生改变 */
      handleYearMonthChanged(object) {
        this.params.start_date = object.start_time
        this.params.end_date = object.end_time
        this.params.type = object.type === 'month' ? 0 : 1
        this.changed_flag++
      },
      /** 店铺发生改变 */
      handleShopChanged(shop) {
        this.params.shop_id = shop.shop_id
        this.changed_flag++
      },
      GET_TrafficAnalysisGoodsData() {
        if (this.loading) return
        this.loading = true
        API_Statistics.getTrafficAnalysisGoodsData(this.params).then(response => {
          this.loading = false
          let data = response.data.slice(0, 10)
          data = data.sort((x, y) => x.num < y.num)
          const _data = data.map(item => item.num)
          const _name = data.map(item => item.name)
          this.echarts.setOption(echartsOptions({
            titleText: '访问量统计',
            tooltipFormatter: (params) => {
              params = params[0]
              const name = _name[params.dataIndex]
              return `商品名称：${name}<br/>${params.seriesName}：${params.value}`
            },
            seriesName: '访问量',
            seriesData: _data
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

