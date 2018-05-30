<template>
  <div v-loading="loading" >
    <div id="hot-goods-price-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData.data"
    >
      <template slot="table-columns">
        <el-table-column type="index" width="150" label="排名"/>
        <el-table-column prop="goods_name" label="商品名称"/>
        <el-table-column prop="price" :formatter="priceFormatter" label="销售金额"/>
      </template>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'
  import echartsOptions from '../echartsOptions'
  import { Foundation } from '@/framework'
  export default {
    name: 'hotGoodsPrice',
    components: {
      [TableLayout.name]: TableLayout
    },
    props: ['params', 'curTab'],
    data() {
      return {
        loading: false,
        /** 列表数据 */
        tableData: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('hot-goods-price-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_HotGoodsPrice()
      },
      params: {
        handler: 'GET_HotGoodsPrice',
        deep: true
      }
    },
    methods: {
      /** 金额格式化 */
      priceFormatter(row) {
        return `￥${Foundation.formatPrice(row.price)}`
      },
      /** 获取会员下单量 */
      GET_HotGoodsPrice() {
        if (this.curTab !== 'price' || this.loading) return
        this.loading = true
        API_Statistics.getHotGoodsPrice(this.params).then(response => {
          this.loading = false
          const { data: _data, localName: _name } = response.series
          const { xAxis } = response
          this.echarts.setOption(echartsOptions({
            titleText: '热卖商品销量TOP',
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `商品名称：${member_name}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
            },
            seriesName: '销售金额',
            seriesData: _data,
            xAxisData: xAxis
          }))
          this.echarts.resize()
        }).catch(() => { this.loading = false })
        API_Statistics.getHotGoodsPricePage(this.params).then(response => {
          this.tableData = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
