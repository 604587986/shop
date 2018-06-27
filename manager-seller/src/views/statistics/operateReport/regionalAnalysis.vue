<template>
  <div class="bg-shop-summary">
    <el-select v-model="hotType" placeholder="请选择" @change="changeHotType">
      <el-option
        v-for="item in orderOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <en-year-month-picker @changed="changeYearMonth"></en-year-month-picker>
    <el-button type="primary" @click="handleSearchHot">开始搜索</el-button>
    <br>
    <br>
    <div class="charts-info">
      <div id="regionalAnalysisMap" :style="{height: tableHeight + 'px'}"></div>
      <div id="regionalAnalysisChart" :style="{height: tableHeight + 'px'}"></div>
    </div>
  </div>
</template>

<script>
  import * as API_regionalAnalysis from '@/api/regionalAnalysis'
  export default {
    name: 'regionalAnalysis',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          /** 当前选择的日期类型 */
          date_type: '',

          /** 年份 */
          year: '',

          /** 月份*/
          month: ''
        },

        /** 选择的数据项*/
        orderOptions: [
          { label: '下单会员数', value: 0 },
          { label: '下单金额', value: 1 },
          { label: '下单量', value: 2 }
        ],

        /** 热卖商品*/
        hotType: 0,

        tableHeight: document.body.clientHeight / 3 * 2
      }
    },
    created() {
      this.GET_RegionalAnalysis()
    },
    mounted() {
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.regionalAnalysisMap = this.$echarts.init(document.getElementById('regionalAnalysisMap'))
        this.regionalAnalysisChart = this.$echarts.init(document.getElementById('regionalAnalysisChart'))
      })
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = document.body.clientHeight / 3 * 2
        /** 图表刷新 */
        setTimeout(this.regionalAnalysisMap.resize)
        setTimeout(this.regionalAnalysisChart.resize)
      },

      /** 改变日期的回调*/
      changeYearMonth(obj) {
        this.params = {
          date_type: obj.type,
          year: obj.year,
          month: obj.month
        }
      },

      /** 改变焦点时触发 */
      changeHotType(target) {
        this.params = {
          ...this.params,
          hotType: target
        }
      },

      /** 搜索触发*/
      handleSearchHot() {
        this.GET_RegionalAnalysis()
      },

      /** 图表数据*/
      GET_RegionalAnalysis() {
        API_regionalAnalysis.getRegionalAnalysisList(this.params).then(response => {
          this.loading = false
          /** x轴信息  此处应当为中国34个行政区划的名称*/
          const xData = response.data.map((item) => { return item.name })

          /** 数据信息 图=》对象数组 表=》number数组 */
          const seriesAreaData = response.data.map((item) => { return item.value })

          /** tooltip提示信息 */
          const seriesName = this.orderOptions[this.hotType].label
          this.regionalAnalysisMap.setOption({
            title: { text: '区域分析统计', x: 'center' },
            tooltip: {
              trigger: 'item',
              show: true,
              formatter: function(params, ticket, callback) {
                const res = params.data.name + '<br>' + params.seriesName + '：' + params.data.value
                return res
              }
            },
            visualMap: {
              min: 0,
              max: 2500,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            series: [
              {
                name: seriesName,
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: response.data
              }
            ]
          })
          this.regionalAnalysisChart.setOption({
            title: { text: '地区排行', x: 'center' },
            tooltip: {
              trigger: 'axis',
              show: true,
              formatter: function(params, ticket, callback) {
                const res = params[0].name + '<br>' + params[0].seriesName + '：' + params[0].value
                return res
              }
            },
            legend: { show: true, orient: 'vertical', data: [{ name: seriesName }], bottom: '10px' },
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
              name: '地区',
              type: 'category',
              boundaryGap: false,
              data: xData
            },
            yAxis: {
              name: '下单会员数（人）',
              type: 'value',
              axisLabel: {
                formatter: '{value} 人'
              }
            },
            series: [
              {
                name: seriesName,
                type: 'line',
                data: seriesAreaData,
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
        this.countTableHeight()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .charts-info {
    div {
      display: inline-block;
      width: 48%;
    }
  }

</style>

