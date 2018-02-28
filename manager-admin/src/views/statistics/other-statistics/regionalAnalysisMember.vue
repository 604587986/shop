<template>
  <div>
    <div id="regional-analysis-member-chart" style="height: 600px"></div>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'

  export default {
    name: 'regionalAnalysis',
    props: ['params', 'cur_tab', 'changed_flag'],
    components: {
      [TableLayout.name]: TableLayout
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        table_params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null
      }
    },
    watch: {
      'changed_flag': 'GET_RegionalAnalysisMember',
      'cur_tab': 'GET_RegionalAnalysisMember'
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('regional-analysis-member-chart'))
        this.GET_RegionalAnalysisMember()
      })
    },
    methods: {
      /** 获取下单会员数据 */
      GET_RegionalAnalysisMember() {
        if (this.cur_tab !== 'member' || this.loading) return
        this.loading = true
        API_Statistics.getRegionAnalysis(this.params).then(response => {
          this.loading = false
          const _data = response.message
          this.echarts.setOption({
            title: {
              text: '下单会员',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['iphone3', 'iphone4', 'iphone5']
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
                dataView: { readOnly: false }
              }
            },
            series: [
              {
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
                data: _data
              }
            ]
          })
          this.echarts.resize()
          console.log(response)
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
