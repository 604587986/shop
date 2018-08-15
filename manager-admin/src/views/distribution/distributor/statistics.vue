<template>
  <div class="bg-shop-summary">
    <div class="btn-tools">
      <div class="conditions">
        <span>日期设置:</span>
        <en-year-month-picker size="mini" @changed="changeYearMonth"></en-year-month-picker>
      </div>
      <div class="conditions">
        <span>当前会员:</span>
      </div>
      <el-button class="btn-opera" size="mini" type="primary" @click="handleSearch">开始搜索</el-button>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="营业额统计" name="first">
        <div id="turnover" :style="{height: tableHeight + 'px'}"></div>
      </el-tab-pane>
      <el-tab-pane label="利润额统计" name="second">
        <div id="profit" :style="{height: tableHeight + 'px'}"></div>
      </el-tab-pane>
      <el-tab-pane label="订单数统计" name="third">
        <div id="ordernum" :style="{height: tableHeight + 'px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'statistic',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 图表参数*/
        params: {
          /** 当前选择的日期类型 */
          cycle_type: 'YEAR',

          /** 年份 */
          year: '2018',

          /** 月份*/
          month: '6'
        },

        tableHeight: document.body.clientHeight / 2
      }
    },
    created() {
      this.GET_PriceStatistics()
    },
    mounted() {
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.priceListChart = this.$echarts.init(document.getElementById('priceList'))
        this.purchaseTimeChart = this.$echarts.init(document.getElementById('purchaseTime'))
      })
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = document.body.clientHeight / 2
        /** 图表刷新 */
        setTimeout(this.priceListChart.resize)
        setTimeout(this.purchaseTimeChart.resize)
      },

      /** 改变日期的回调*/
      changeYearMonth(obj) {
        this.params = {
          cycle_type: obj.type,

          year: obj.year
        }
        if (obj.type === 'MONTH') {
          this.params = {
            cycle_type: obj.type,

            year: obj.year,

            month: parseInt(obj.month)
          }
        }
      },

      /** 价格区间 */
      changePriceRange(obj) {
        this.params = {
          ...this.params,
          ranges: obj
        }
      },

      /** 执行搜索 */
      handleSearch() {
        this.GET_PriceStatistics()
      },

      GET_PriceStatistics() {
        API_buyAnyalysis.getbuyAnyalysisPeriodList(this.params).then(response => {
          this.purchaseTimeChart.setOption({
            title: { text: '购买时段分布', x: 'center', subtext: '当前时间段24小时购买总量分布' },
            tooltip: { trigger: 'axis' },
            legend: { show: true, orient: 'vertical', data: [{ name: '下单量' }], bottom: '10px' },
            color: ['#7CB5EC'],
            toolbox: {
              feature: {
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              name: '时',
              type: 'category',
              boundaryGap: false,
              data: response.xAxis
            },
            yAxis: {
              name: '下单量（次）',
              type: 'value',
              axisLabel: {
                formatter: '{value} 次'
              }
            },
            series: [
              {
                type: 'line',
                data: response.series.data,
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
                }
              }
            ]
          })
        })
        API_buyAnyalysis.getbuyAnyalysisRangesList(this.params).then(response => {
          this.priceListChart.setOption({
            title: { text: '客价单分布', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { show: true, orient: 'vertical', data: [{ name: '下单量' }], bottom: '10px' },
            color: ['#7CB5EC'],
            toolbox: {
              feature: {
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              name: '价格',
              type: 'category',
              boundaryGap: false,
              data: response.xAxis
            },
            yAxis: {
              name: '下单量（次）',
              type: 'value',
              axisLabel: {
                formatter: '{value} 次'
              }
            },
            series: [
              {
                type: 'line',
                data: response.series.data,
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
                }
              }
            ]
          })
        })
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

  div.btn-tools {
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    .conditions {
      margin-right: 30px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      span {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        color: #606266;
      }
    }
    .btn-opera {
      margin-left: 10px;
    }
  }

</style>


