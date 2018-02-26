<template>
  <div>
    <div v-loading="loading" id="hot-goods-price-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData"
    >
      <template slot="table-columns">
        <el-table-column type="index" width="150" label="排名"/>
        <el-table-column prop="name" label="商品名称"/>
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
    name: 'orderAmountGoods',
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
        this.echarts = this.$echarts.init(document.getElementById('hot-goods-price-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_HotGoodsPrice()
      },
      'params.year': 'GET_HotGoodsPrice',
      'params.month': 'GET_HotGoodsPrice',
      'params.cat_id': 'GET_HotGoodsPrice',
      'params.shop_id': 'GET_HotGoodsPrice'
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
        API_Statistics.hotGoodsPrice(this.params).then(response => {
          this.loading = false
          const data = response.data.sort((x, y) => x.price < y.price)
          this.tableData = data
          const _data = data.map(item => item.price)
          const _name = data.map(item => item.name)
          this.echarts.setOption(echartsOptions({
            titleText: '热卖商品销量TOP',
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `商品名称：${member_name}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
            },
            seriesName: '销售金额',
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
