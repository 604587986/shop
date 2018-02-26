<template>
  <div v-loading="loading">
    <div id="goods-chart" style="height: 300px"></div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData"
    >
      <template slot="table-columns">
        <el-table-column type="index" width="150" label="排名"/>
        <el-table-column prop="nickname" label="会员昵称"/>
        <el-table-column prop="name" label="会员用户名"/>
        <el-table-column prop="num" label="下单商品数量"/>
      </template>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'
  import echartsOptions from '../echartsOptions'
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
        this.echarts = this.$echarts.init(document.getElementById('goods-chart'))
      })
    },
    watch: {
      curTab() {
        this.GET_MemberAmountGoods()
      },
      'params.end_date': 'GET_MemberAmountGoods',
      'params.shop_id': 'GET_MemberAmountGoods'
    },
    methods: {
      /** 获取会员下单量 */
      GET_MemberAmountGoods() {
        if (this.curTab !== 'goods' || this.loading) return
        this.loading = true
        API_Statistics.memberGoodsNum(this.params).then(response => {
          this.loading = false
          const data = response.data.sort((x, y) => x.num < y.num)
          this.tableData = data
          const _data = data.map(item => item.num)
          const _name = data.map(item => item.name)
          this.echarts.setOption(echartsOptions({
            titleText: '买家排行TOP10',
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `买家：${member_name}<br/>${params.seriesName}：${params.value}`
            },
            seriesName: '购买量',
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
