<template>
  <div class="bg-shop-summary">
    <div>
      <en-year-month-picker @changed="changeYearMonth"></en-year-month-picker>
      <en-price-range @changed="changePriceRange"></en-price-range>
      <el-button type="primary" @click="handleSearch">开始搜索</el-button>
    </div>
    <div id="priceList" :style="{height: tableHeight + 'px'}"></div>
    <div id="purchaseTime" :style="{height: tableHeight + 'px'}"></div>
  </div>
</template>

<script>
  import * as API_buyAnyalysis from '@/api/buyAnyalysis'
  import { CategoryPicker } from '@/components'
  export default {
    name: 'buyAnalysis',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 图表参数*/
        params: {
          /** 当前选择的日期类型 */
          date_type: '',

          /** 年份 */
          year: '',

          /** 月份*/
          month: '',

          /** 价格区间 默认区间*/
          price_range: [[0, 500], [500, 1000], [1000, 1500], [1500, 2000]]
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
          date_type: obj.type,

          year: obj.year,

          month: obj.month,

          price_range: [[0, 500], [500, 1000], [1000, 1500], [1500, 2000]]
        }
      },

      /** 价格区间 */
      changePriceRange(obj) {
        this.params = {
          ...this.params,
          price_range: obj
        }
      },

      /** 执行搜索 */
      handleSearch() {
        this.GET_PriceStatistics()
      },

      GET_PriceStatistics() {
        /** 处理参数 */
        let _params = {
          ...this.params
        }
        if (this.params.price_range && this.params.price_range.length > 0) {
          _params.price_range = this.params.price_range.map((elem) => {
            return elem.join('~')
          })
          _params.price_range = _params.price_range.toString()
        }
        API_buyAnyalysis.getbuyAnyalysisList(_params).then(response => {
          this.loading = false
          /** x轴信息 */
          const xData = response.xsize
          const xTimeData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          /** 数据列表 */
          const series_price = response.series_price
          const series_purchase = response.series_purchase

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
              data: xData
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
                data: series_price,
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
          this.purchaseTimeChart.setOption({
            title: { text: '购买时段分布', x: 'center' },
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
              data: xTimeData
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
                data: series_purchase,
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
        }).catch(error => {
          this.loading = false
          console.log(error)
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

</style>


