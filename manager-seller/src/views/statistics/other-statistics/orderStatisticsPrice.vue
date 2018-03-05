<template>
  <div>
    <div v-loading="loading" id="order-statistics-price-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData"
    >
      <template slot="table-columns">
        <el-table-column prop="sn" label="订单号"/>
        <el-table-column label="下单日期">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">{{ scope.row.order_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column label="实付金额">
          <template slot-scope="scope">{{ scope.row.paymoney | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column prop="member_name" label="会员名称"/>
        <el-table-column label="订单状态">
          <template slot-scope="scope">{{ scope.row.order_status | unixOrderStatus }}</template>
        </el-table-column>
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
    name: 'orderStatisticsPrice',
    components: {
      [TableLayout.name]: TableLayout
    },
    props: ['params', 'curTab', 'changeFlag'],
    data() {
      return {
        loading: false,
        /** 列表数据 */
        tableData: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('order-statistics-price-chart'))
      })
    },
    watch: {
      'changeFlag': ['GET_OrderStatisticsPrice', 'GET_OrderStatisticsPriceTable']
    },
    methods: {
      /** 获取会员下单量 */
      GET_OrderStatisticsPrice() {
        if (this.curTab !== 'price' || this.loading) return
        this.loading = true
        const type_str = this.params.type === 1 ? '日' : '月'
        API_Statistics.getOrderStatisticsPrice(this.params).then(response => {
          this.loading = false
          const data = response.message
          const _data = data
          const _date = data.map((item, index) => {
            return index + 1
          })
          this.echarts.setOption(echartsOptions({
            titleText: `订单销售额统计（${type_str}）`,
            tooltipFormatter: (params) => {
              params = params[0]
              return `日期（${type_str}）：${params.dataIndex + 1}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
            },
            xAxisData: _date,
            seriesName: '下单金额',
            seriesData: _data
          }))
          this.echarts.resize()
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      /** 获取表格数据 */
      GET_OrderStatisticsPriceTable() {
        API_Statistics.getOrderStatisticsPrideTable(this.params).then(response => {
          this.tableData = response.data.sort((x, y) => x.paymoney < y.paymoney)
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
