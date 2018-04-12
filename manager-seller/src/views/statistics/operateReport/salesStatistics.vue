<template>
  <div class="bg-shop-summary">
    <en-year-month-picker @changed="changeYearMonth"></en-year-month-picker>
    <el-button type="primary" @click="handleSearchSales">开始搜索</el-button>
    <span style="display: inline-block;margin-left: 10px;">订单金额：{{order_total}}</span>
    <span>订单量：{{total_quantity_order}}</span>
    <br>
    <br>
    <el-tabs type="border-card" @tab-click="changeHotType">
      <el-tab-pane label="下单金额">
        <div id="orderAmount" :style="{height: tableHeight + 'px'}"></div>
      </el-tab-pane>
      <el-tab-pane label="下单量">
        <div id="orderNum" :style="{height: tableHeight + 'px'}"></div>
      </el-tab-pane>
    </el-tabs>
    <en-tabel-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="order_sn" label="订单编号" />
        <el-table-column prop="buyer" label="买家" />
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.order_time }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            {{ scope.row.order_status }}
          </template>
        </el-table-column>
        <el-table-column label="订单总额">
          <template slot-scope="scope">
            {{ scope.row.order_amount }}
          </template>
        </el-table-column>
      </template>
      <el-pagination
        slot="pagination"
        v-if="pageData"
        key="orderGoodsNum"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_salesStatistics from '@/api/salesStatistics'
  import { YearMonthPicker, TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'salesStatistics',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [YearMonthPicker.name]: YearMonthPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 热卖商品*/
        hotType: 0,

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 订单总金额*/
        order_total: '',

        /** 下单量*/
        total_quantity_order: '',

        tableHeight: document.body.clientHeight / 2
      }
    },
    created() {
      this.GET_OrderTotaltChart()
    },
    mounted() {
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.orderAmountChart = this.$echarts.init(document.getElementById('orderAmount'))
        this.orderGoodsNumChart = this.$echarts.init(document.getElementById('orderNum'))
      })
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = document.body.clientHeight / 2
        /** 图表刷新 */
        setTimeout(this.orderAmountChart.resize)
        setTimeout(this.orderGoodsNumChart.resize)
      },

      /** 改变日期的回调*/
      changeYearMonth(obj) {
        this.params = {
          ...obj
        }
      },

      /** 改变热卖焦点时触发 */
      changeHotType(target) {
        this.hotType = parseInt(target.paneName)
        if (parseInt(target.paneName) === 0) {
          this.GET_OrderTotaltChart()
        } else {
          this.GET_OrderGoodsNumData()
        }
      },

      /** 搜索触发*/
      handleSearchSales() {
        if (this.hotType === 0) {
          this.GET_OrderTotaltChart()
        } else {
          this.GET_OrderGoodsNumData()
        }
      },

      /** 图表数据*/
      GET_OrderTotaltChart() {
        API_salesStatistics.getSalesStatisticsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          /** 列表信息 */
          this.tableData = response.data
          /** 订单总金额*/
          this.order_total = response.order_total
          /** 下单量*/
          this.total_quantity_order = response.total_quantity_order
          /** x轴信息 */
          const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

          /** 数据信息 当月下单金额 */
          const seriesCurrentData = response.order_amount.current_month
          /** 数据信息 上月下单金额 */
          const seriesLastData = response.order_amount.last_month

          this.orderAmountChart.setOption({
            title: { text: '下单金额统计', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { data: [
              { name: '本月' },
              { name: '上月' }
            ], bottom: '10px' },
            color: ['#7CB5EC', '#526471'],
            toolbox: {
              show: true,
              feature: {
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xData
            },
            yAxis: {
              name: '下单金额（元）',
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            },
            series: [
              {
                name: '本月',
                type: 'line',
                data: seriesCurrentData,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                },
                barGap: '0'
              },
              {
                name: '上月',
                type: 'line',
                data: seriesLastData,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                },
                barGap: '0'
              }
            ]
          })
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
        this.countTableHeight()
      },

      /** 图表数据*/
      GET_OrderGoodsNumData() {
        API_salesStatistics.getSalesStatisticsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          /** 列表信息 */
          this.tableData = response.data
          /** x轴信息 */
          const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

          /** 数据信息 当月数据 */
          const seriesCurrentData = response.order_amount.current_month
          /** 数据信息 上月数据 */
          const seriesLastData = response.order_amount.last_month

          this.orderGoodsNumChart.setOption({
            title: { text: '下单量统计', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { data: [
              { name: '本月' },
              { name: '上月' }
            ], bottom: '10px' },
            color: ['#7CB5EC', '#526471'],
            toolbox: {
              show: true,
              feature: {
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xData
            },
            yAxis: {
              name: '下单量',
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            },
            series: [
              {
                type: 'line',
                data: seriesCurrentData,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                },
                barGap: '0'
              },
              {
                type: 'line',
                data: seriesLastData,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                },
                barGap: '0'
              }
            ]
          })
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
        this.countTableHeight()
      },

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        if (this.hotType === 0) {
          this.GET_OrderTotaltChart()
        } else {
          this.GET_OrderGoodsNumData()
        }
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        if (this.hotType === 0) {
          this.GET_OrderTotaltChart()
        } else {
          this.GET_OrderGoodsNumData()
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .bg-shop-summary {
    margin: 15px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #9a9a9a;
    p {
      margin: 15px 0;
      text-align: left;
    }
  }
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

</style>

