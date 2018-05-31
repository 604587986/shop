<template>
  <div>
    <div v-loading="loading" id="order-statistics-order-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData.data"
    >
      <template slot="table-columns">
        <el-table-column prop="sn" label="订单号"/>
        <el-table-column prop="create_time" :formatter="MixinUnixToDate" label="下单日期"/>
        <el-table-column prop="order_price" :formatter="MixinFormatPrice" label="订单金额"/>
        <el-table-column prop="paymoney" :formatter="MixinFormatPrice" label="实付金额"/>
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

  export default {
    name: 'orderStatisticsOrder',
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
        this.echarts = this.$echarts.init(document.getElementById('order-statistics-order-chart'))
      })
    },
    watch: {
      curTab: 'GET_OrderStatisticsOrder',
      params: {
        handler: 'GET_OrderStatisticsOrder',
        deep: true
      }
    },
    methods: {
      /** 获取会员下单量 */
      GET_OrderStatisticsOrder() {
        if (this.curTab !== 'order' || this.loading) return
        this.loading = true
        const type_str = this.params.type === 1 ? '日' : '月'
        Promise.all([
          API_Statistics.getOrderStatisticsOrder(this.params)
        ]).then(responses => {
          this.loading = false
          // this.tableData = responses[1]
          // this.echarts.setOption(echartsOptions({
          //   titleText: `订单销售额统计（${type_str}）`,
          //   tooltipFormatter: (params) => {
          //     params = params[0]
          //     return `日期（${type_str}）：${params.dataIndex + 1}<br/>${params.seriesName}：￥${Foundation.formatPrice(params.value)}`
          //   },
          //   xAxisData: _date,
          //   seriesName: '下单金额',
          //   seriesData: _data
          // }))
          // this.echarts.resize()
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
