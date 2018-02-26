<template>
  <div v-loading="loading">
    <div id="price-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData"
    >
      <template slot="table-columns">
        <el-table-column type="index" width="150" label="排名"/>
        <el-table-column prop="nickname" label="会员昵称"/>
        <el-table-column prop="name" label="会员用户名"/>
        <el-table-column prop="price" :formatter="priceFormatter" label="下单总金额"/>
      </template>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'
  import { Foundation } from '@/framework'
  import echartsOptions from '../echartsOptions'
  export default {
    name: 'orderAmountPrice',
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
        this.echarts = this.$echarts.init(document.getElementById('price-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_MemberAmountPrice()
      },
      'params.end_date': 'GET_MemberAmountPrice',
      'params.shop_id': 'GET_MemberAmountPrice'
    },
    methods: {
      /** 金额格式化 */
      priceFormatter(row) {
        return `￥${Foundation.formatPrice(row.price)}`
      },
      /** 获取会员下单量 */
      GET_MemberAmountPrice() {
        if (this.curTab !== 'price' || this.loading) return
        this.loading = true
        API_Statistics.memberPriceNum(this.params).then(response => {
          this.loading = false
          const data = response.data.sort((x, y) => x.price < y.price)
          this.tableData = data
          const _data = data.map(item => item.price)
          const _name = data.map(item => item.name)
          this.echarts.setOption(echartsOptions({
            titleText: '买家排行TOP10',
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `买家：${member_name}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
            },
            seriesName: '订单总金额',
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
