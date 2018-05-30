<template>
  <div v-loading="loading">
    <div id="hot-goods-num-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData.data"
    >
      <template slot="table-columns">
        <el-table-column type="index" width="150" label="排名"/>
        <el-table-column prop="goods_name" label="商品名称"/>
        <el-table-column prop="ordernum" label="商品销量"/>
      </template>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'hotGoodsNum',
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
        this.echarts = this.$echarts.init(document.getElementById('hot-goods-num-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_HotGoodsNum()
      },
      params: {
        handler: 'GET_HotGoodsNum',
        deep: true
      }
    },
    methods: {
      /** 获取会员下单量 */
      GET_HotGoodsNum() {
        if (this.curTab !== 'num' || this.loading) return
        this.loading = true
        API_Statistics.getHotGoodsNum(this.params).then(response => {
          this.loading = false
          const { data: _data, localName: _name } = response.series
          const { xAxis } = response
          this.echarts.setOption(echartsOptions({
            titleText: '热卖商品销量TOP' + xAxis.length,
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `商品名称：${member_name}<br/>${params.seriesName}：${params.value}`
            },
            seriesName: '商品销量',
            seriesData: _data,
            xAxisData: xAxis
          }))
          this.echarts.resize()
        }).catch(() => { this.loading = false })
        API_Statistics.getHotGoodsNumPage(this.params).then(response => {
          this.tableData = response
        })
      }
    }
  }
</script>
