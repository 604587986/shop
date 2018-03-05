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
      <div id="refund-statistics-chart" style="height: 300px"></div>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { YearMonthPicker, ShopPicker } from '@/components'
  import { Foundation } from '@/framework'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'refundStatistics',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [ShopPicker.name]: ShopPicker
    },
    data() {
      return {
        loading: false,
        params: {
          year: '',
          month: '',
          type: 1,
          shop_id: 0
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('refund-statistics-chart'))
        this.GET_RefundStatistics()
      })
    },
    methods: {
      /** 年月发生改变 */
      handleYearMonthChanged(object) {
        this.params.year = object.year
        this.params.month = object.month
        this.params.type = object.type === 'month' ? 1 : 2
        this.GET_RefundStatistics()
      },
      /** 店铺发生改变 */
      handleShopChanged(shop) {
        this.params.shop_id = shop.shop_id
        this.GET_RefundStatistics()
      },
      /** 获取退款金额统计 */
      GET_RefundStatistics() {
        if (this.loading) return
        this.loading = true
        const date_type = this.params.type === 1 ? '日' : '月'
        API_Statistics.getRefundStatisticsData(this.params).then(response => {
          this.loading = false
          const _data = response.message
          const _date = response.message.map((item, index) => index + 1)
          this.echarts.setOption(echartsOptions({
            titleText: `退款金额统计（${date_type}）`,
            tooltipFormatter: (params) => {
              params = params[0]
              return `日期（${date_type}）：${params.dataIndex + 1}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
            },
            xAxisData: _date,
            seriesName: '退款金额',
            seriesData: _data
          }))
          this.echarts.resize()
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
