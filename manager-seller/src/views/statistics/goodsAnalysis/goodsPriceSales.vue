<template>
  <div class="bg-shop-summary">
    <div>
      <en-year-month-picker @changed="changeYearMonth"></en-year-month-picker>
      <span>商品分类：</span><en-category-picker :clearable='true' @changed="categoryChanged"/>
      <en-price-range @changed="changePriceRange"></en-price-range>
      <el-button type="primary" @click="handleSearch">开始搜索</el-button>
    </div>
    <div id="trafficStatistics" :style="{height: tableHeight + 'px'}"></div>
  </div>
</template>

<script>
  import * as API_goodsPriceStatistics from '@/api/goodsPriceStatistics'
  import { YearMonthPicker, CategoryPicker, PriceRange } from '@/components'
  export default {
    name: 'goodsPriceSales',
    components: {
      [YearMonthPicker.name]: YearMonthPicker,
      [CategoryPicker.name]: CategoryPicker,
      [PriceRange.name]: PriceRange
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

          /** 商品分类ID */
          category_id: '',

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
        this.sesalChart = this.$echarts.init(document.getElementById('trafficStatistics'))
      })
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = document.body.clientHeight / 2
        /** 图表刷新 */
        setTimeout(this.sesalChart.resize)
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
        this.params = {
          ...data
        }
      },

      /** 改变日期的回调*/
      changeYearMonth(obj) {
        this.params = {
          ...obj
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
        if (this.params.price_range && this.params.price_range.length > 0) {
          this.params.price_range = this.params.price_range.map((elem) => {
            return elem.join('~')
          })
          this.params.price_range = this.params.price_range.toString()
        }
        API_goodsPriceStatistics.getPriceStatisticsList(this.params).then(response => {
          this.loading = false
          /** 商品名称列表 x轴信息 */
          const xData = response.xsize
          const seriesData = response.seriesdata

          this.sesalChart.setOption({
            title: { text: '价格销量分析', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { show: true, orient: 'vertical', data: [{ name: '下单量', textStyle: { borderColor: '#7CB5EC' }}], bottom: '10px' },
            color: ['#7CB5EC'],
            toolbox: {
              show: true,
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
                name: '下单量',
                type: 'line',
                data: seriesData,
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


