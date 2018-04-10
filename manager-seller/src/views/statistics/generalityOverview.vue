<template>
  <div class="bg-shop-summary">
    <p>本页面所有有关近30天的展示数据,均为从昨日起最近30天的销售情况</p>
    <ul>
      <li><span>近30天下单金额 </span>:<span>{{ shopSurvey.order_amount }}</span></li>
      <li><span>近30天下单会员数</span>:<span>{{ shopSurvey.order_member_num }}</span></li>
      <li><span>近30天下单量</span>:<span>{{ shopSurvey.order_num }}</span></li>
      <li><span>近30天下单商品数</span>:<span>{{ shopSurvey.order_goods_num }}</span></li>
      <li><span>平均客单价</span>:<span>{{ shopSurvey.average_order_price }}</span></li>
    </ul>
    <ul>
      <li><span>平均价格</span>:<span>{{ shopSurvey.average_price }}</span></li>
      <li><span>商品收藏量</span>:<span>{{ shopSurvey.goods_colletion_num }}</span></li>
      <li><span>商品总数</span>:<span>{{ shopSurvey.goods_summary }}</span></li>
      <li><span>店铺收藏量</span>:<span>{{ shopSurvey.shop_collection_num }}</span></li>
      <li><span>下单高峰期</span>:<span>{{ shopSurvey.order_fastigium }}</span></li>
    </ul>
    <div>
      <div id="salesStatistics" :style="{height: tableHeight + 'px'}"></div>
    </div>
  </div>
</template>

<script>
  import * as API_shopStatistics from '@/api/shopStatistics'
  export default {
    name: 'generalityOverview',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 店铺概况*/
        shopSurvey: {},

        tableHeight: document.body.clientHeight / 3 * 2
      }
    },
    created() {
      API_shopStatistics.getShopSurvey().then(response => {
        this.loading = false
        /** 店铺概况信息 */
        this.shopSurvey = response.shop_survey
        /** 最近30天销售统计 */
        const xData = []
        for (let i = 1; i <= 30; i++) {
          xData.push(this.GetDateStr(i))
        }

        this.sesalChart.setOption({
          title: { text: '最近30天销售统计', x: 'center' },
          tooltip: { trigger: 'axis' },
          legend: { orient: 'vertical', data: [{ name: '下单金额', textStyle: { borderColor: '#7CB5EC' }}], bottom: '10px' },
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
            type: 'category',
            boundaryGap: false,
            data: xData.reverse()
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          series: [
            {
              name: '下单金额',
              type: 'line',
              data: response.sale_statistics,
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
    },
    mounted() {
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.sesalChart = this.$echarts.init(document.getElementById('salesStatistics'))
      })
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = document.body.clientHeight / 3 * 2
        /** 图表刷新 */
        setTimeout(this.sesalChart.resize)
      },

      /** 获取最近30天日期信息 */
      GetDateStr(DayCount) {
        const dd = new Date()
        // 获取DayCount前的日期
        dd.setDate(dd.getDate() - DayCount)
        const y = dd.getFullYear()
        // 获取当前月份的日期
        const m = dd.getMonth() + 1
        var d = dd.getDate()
        return y + '-' + m + '-' + d
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
    ul {
      padding: 0 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    ul>li {
      margin: 0;
      padding: 0;
      width: 20%;
      flex-grow: 1;
      list-style: none;
      span {
        word-break:break-all;
        font-size: 14px;
      }
    }
  }

</style>
