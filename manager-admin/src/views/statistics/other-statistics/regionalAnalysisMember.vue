<template>
  <div>
    <div id="regional-analysis-member-chart" style="height: 600px"></div>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import echartsOptionsMap from '../echartsOptionsMap'

  export default {
    name: 'regionalAnalysis',
    props: ['params', 'cur_tab', 'changed_flag'],
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
        const params = {
          ...this.params,
          type: 1
        }
        API_Statistics.getRegionAnalysis(params).then(response => {
          this.loading = false
          const _data = response.message
          this.echarts.setOption(echartsOptionsMap({
            titleText: '下单会员分布',
            seriesName: '下单会员数量',
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
