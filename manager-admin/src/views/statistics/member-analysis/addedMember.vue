<template>
  <div v-loading="loading" class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>查询周期：</span>
          <en-year-month-picker @changed="handleYearMonthChanged"/>
        </div>
      </div>
      <div id="added-member-chart" style="height: 300px"></div>
      <en-tabel-layout
        :toolbar="false"
        :pagination="false"
        :tableData="tableData"
      >
        <template slot="table-columns">
          <el-table-column prop="membertime" label="日期/月份">
            <template slot-scope="scope">{{ scope.row.membertime + (params.type === 1 ? '日' : '月') }}</template>
          </el-table-column>
          <el-table-column prop="membernum" label="本月/本年（个）"/>
          <el-table-column label="上月/上年（个）">
            <template slot-scope="scope">{{ lastTableData[scope.$index] ? lastTableData[scope.$index]['membernum'] : 0 }}</template>
          </el-table-column>
        </template>
      </en-tabel-layout>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import echartsOptions from '../echartsOptions'

  export default {
    name: 'addedMember',
    data() {
      return {
        loading: false,
        tableData: null,
        lastTableData: null,
        params: {
          start_date: '',
          lastStart_date: '',
          end_date: '',
          lastEnd_date: '',
          type: 1
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('added-member-chart'))
      })
    },
    methods: {
      /** 年月份发生变化 */
      handleYearMonthChanged(object) {
        this.params.type = object.type === 'month' ? 1 : 2
        this.params.start_date = object.start_time
        this.params.lastStart_date = object.last_start_time
        this.params.end_date = object.end_time
        this.params.lastEnd_date = object.last_end_time
        this.GET_AddedMemberData()
      },
      GET_AddedMemberData() {
        this.loading = true
        API_Statistics.addMemberStatistics(this.params).then(response => {
          this.loading = false
          const data = response.data.list
          const lastData = response.data.lastList
          this.tableData = data
          this.lastTableData = lastData

          const _data = data.map(item => item.membernum)
          const _time = data.map(item => item.membertime)

          this.echarts.setOption(echartsOptions({
            titleText: '新增会员数量',
            tooltipFormatter: (params) => {
              params = params[0]
              const time = _time[params.dataIndex]
              return `日期：${time}${this.params.type === 1 ? '日' : '月'}<br/>${params.seriesName}：${params.value}`
            },
            xAxisData: _time,
            seriesName: '新增会员数',
            seriesData: _data
          }))
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    background-color: #fff;
    padding: 10px;
  }
  .chart-header {
    padding: 0 10px;
  }
  .chart-header-item {
    display: inline-block;
    margin-right: 30px;
  }
</style>
