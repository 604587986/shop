<template>
  <div>
    <div v-loading="loading" id="industry-scale-price-chart" style="height: 300px"></div>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { Foundation } from '@/framework'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'industryScalePrice',
    props: ['params', 'curTab'],
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('industry-scale-price-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_IndustryScalePrice()
      },
      'params.year': 'GET_IndustryScalePrice',
      'params.month': 'GET_IndustryScalePrice',
      'params.shop_id': 'GET_IndustryScalePrice'
    },
    methods: {
      /** 金额格式化 */
      priceFormatter(row) {
        return `￥${Foundation.formatPrice(row.price)}`
      },
      /** 获取会员下单量 */
      GET_IndustryScalePrice() {
        if (this.curTab !== 'price' || this.loading) return
        this.loading = true
        API_Statistics.getIndustryScalePrice(this.params).then(response => {
          this.loading = false
          // const data = response.data.sort((x, y) => x.price < y.price)
          // this.tableData = data
          // const _data = data.map(item => item.price)
          // const _name = data.map(item => item.name)
          // this.echarts.setOption(echartsOptions({
          //   titleText: '买家排行TOP10',
          //   tooltipFormatter: function(params) {
          //     params = params[0]
          //     const member_name = _name[params.dataIndex]
          //     return `买家：${member_name}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
          //   },
          //   seriesName: '订单总金额',
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
