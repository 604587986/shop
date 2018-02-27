<template>
  <div>
    <div v-loading="loading" id="hot-goods-num-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData"
    >
      <template slot="table-columns">
        <el-table-column type="index" width="150" label="排名"/>
        <el-table-column prop="name" label="商品名称"/>
        <el-table-column prop="num" label="商品销量"/>
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
        tableData: null
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
      'params.year': 'GET_HotGoodsNum',
      'params.month': 'GET_HotGoodsNum',
      'params.cat_id': 'GET_HotGoodsNum',
      'params.shop_id': 'GET_HotGoodsNum'
    },
    methods: {
      /** 获取会员下单量 */
      GET_HotGoodsNum() {
        if (this.curTab !== 'num' || this.loading) return
        this.loading = true
        API_Statistics.hotGoodsNum(this.params).then(response => {
          this.loading = false
          const data = response.data.sort((x, y) => x.num < y.num)
          this.tableData = data
          const _data = data.map(item => item.num)
          const _name = data.map(item => item.name)
          this.echarts.setOption(echartsOptions({
            titleText: '热卖商品销量TOP',
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `商品名称：${member_name}<br/>${params.seriesName}：${params.value}`
            },
            seriesName: '商品销量',
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
