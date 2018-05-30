<template>
  <div v-loading="loading" id="customer-price-distribution-price-chart" style="height: 300px"></div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import echartsOptions from '../echartsOptions'

  export default {
    name: 'customerPriceDistributionPrice',
    props: ['params', 'curTab', 'change_flag'],
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('customer-price-distribution-price-chart'))
      })
    },
    watch: {
      'change_flag': 'GET_CustomerPriceDistributionPrice'
    },
    methods: {
      GET_CustomerPriceDistributionPrice() {
        if (this.curTab !== 'price' || this.loading) return
        this.loading = true
        API_Statistics.getOrderPriceDistribution(this.params).then(response => {
          this.loading = false
          const data = response.data
          const _data = data.map(item => item.num)
          const _price = data.map(item => item.elt_data)
          this.echarts.setOption(echartsOptions({
            titleText: '客单价分布图',
            tooltipFormatter: function(params) {
              params = params[0]
              const price_range = _price[params.dataIndex]
              return `价格区间：${price_range}<br/>${params.seriesName}：${params.value}`
            },
            xAxisData: _price,
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
