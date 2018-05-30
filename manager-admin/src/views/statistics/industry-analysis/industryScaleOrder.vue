<template>
  <div>
    <div v-loading="loading" id="industry-scale-order-chart" style="height: 300px"></div>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'

  export default {
    name: 'industryScaleOrder',
    props: ['params', 'curTab'],
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('industry-scale-order-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_IndustryScaleOrder()
      },
      'params.year': 'GET_IndustryScaleOrder',
      'params.month': 'GET_IndustryScaleOrder',
      'params.shop_id': 'GET_IndustryScaleOrder'
    },
    methods: {
      /** 获取会员下单量 */
      GET_IndustryScaleOrder() {
        if (this.curTab !== 'order' || this.loading) return
        this.loading = true
        API_Statistics.getIndustryScaleOrder(this.params).then(response => {
          this.loading = false
          // const data = response.data.sort((x, y) => x.num < y.num)
          // this.tableData = data
          // const _data = data.map(item => item.num)
          // const _name = data.map(item => item.name)
          // this.echarts.setOption(echartsOptions({
          //   titleText: '买家排行TOP10',
          //   tooltipFormatter: function(params) {
          //     params = params[0]
          //     const member_name = _name[params.dataIndex]
          //     return `买家：${member_name}<br/>${params.seriesName}：${params.value}`
          //   },
          //   seriesName: '下单量',
          //   seriesData: _data
          // }))
          // this.echarts.resize()
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
