<template>
  <div>
    <div v-loading="loading" id="order-statistics-order-chart" style="height: 300px"></div>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'orderStatisticsOrder',
    props: ['params', 'curTab', 'changeFlag'],
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('order-statistics-order-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_OrderStatisticsOrder()
      },
      'changeFlag': 'GET_OrderStatisticsOrder'
    },
    methods: {
      /** 获取会员下单量 */
      GET_OrderStatisticsOrder() {
        if (this.curTab !== 'order' || this.loading) return
        this.loading = true
        const type_str = this.params.type === 1 ? '日' : '月'
        API_Statistics.getOrderStatisticsOrder(this.params).then(response => {
          this.loading = false
          const data = response.message
          const _data = data
          const _date = data.map((item, index) => {
            return index + 1
          })
          this.echarts.setOption(echartsOptions({
            titleText: `订单销售量统计（${type_str}）`,
            tooltipFormatter: (params) => {
              params = params[0]
              return `日期（${type_str}）：${params.dataIndex + 1}<br/>${params.seriesName}：${params.value}`
            },
            xAxisData: _date,
            seriesName: '下单量',
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

</style>
