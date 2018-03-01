<template>
  <div v-loading="loading" id="customer-price-distribution-period-chart" style="height: 300px"></div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'customerPriceDistributionPeriod',
    components: {
      [TableLayout.name]: TableLayout
    },
    props: ['params', 'curTab', 'change_flag'],
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('customer-price-distribution-period-chart'))
      })
    },
    watch: {
      'change_flag': 'GET_CustomerPriceDistributionPeriod'
    },
    methods: {
      GET_CustomerPriceDistributionPeriod() {
        if (this.curTab !== 'period' || this.loading) return
        this.loading = true
        API_Statistics.getBuyTimeDistribution(this.params).then(response => {
          this.loading = false
          const data = response.data.sort((x, y) => x.num < y.num)
          const _data = data.map(item => item.num)
          const _hour = data.map(item => item.hour_num)
          this.echarts.setOption(echartsOptions({
            titleText: '购买时段分布图',
            tooltipFormatter: function(params) {
              params = params[0]
              const hour = _hour[params.dataIndex]
              return `时段：${hour}<br/>${params.seriesName}：${params.value}`
            },
            xAxisData: _hour,
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
