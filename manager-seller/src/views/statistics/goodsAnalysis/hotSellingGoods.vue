<template>
  <div class="bg-shop-summary">
    <en-year-month-picker @changed="changeYearMonth"></en-year-month-picker>
    <el-button type="primary" @click="handleSearchHot">开始搜索</el-button>
    <br>
    <br>
    <el-tabs type="border-card" @tab-click="changeHotType">
      <el-tab-pane label="下单金额">
        <div id="orderAmount" :style="{height: tableHeight + 'px'}"></div>
        <en-table-layout
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <template slot="table-columns">
            <el-table-column prop="goods_name" label="商品名称" />
            <el-table-column label="下单总金额" >
              <template slot-scope="scope">{{ scope.row.order_amount | unitPrice('￥') }}</template>
            </el-table-column>
          </template>
          <el-pagination
            slot="pagination"
            v-if="pageData"
            key="orderAmount"
            @size-change="handlePageSizeChange"
            @current-change="handlePageCurrentChange"
            :current-page="pageData.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageData.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.data_total">
          </el-pagination>
        </en-table-layout>
      </el-tab-pane>
      <el-tab-pane label="下单商品数">
        <div id="orderGoodsNum" :style="{height: tableHeight + 'px'}"></div>
        <en-table-layout
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <template slot="table-columns">
            <el-table-column prop="goods_name" label="商品名称" />
            <el-table-column prop="order_goods_num" label="下单商品数量" />
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
        </en-table-layout>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_HotGoods from '@/api/hotGoods'
  import { CategoryPicker } from '@/components'
  export default {
    name: 'hotSellingGoods',
    components: {
      [CategoryPicker.name]: CategoryPicker
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

        tableHeight: document.body.clientHeight / 2
      }
    },
    created() {
      this.GET_OrderAmountData()
    },
    mounted() {
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.orderAmountChart = this.$echarts.init(document.getElementById('orderAmount'))
        this.orderGoodsNumChart = this.$echarts.init(document.getElementById('orderGoodsNum'))
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
          this.GET_OrderAmountData()
        } else {
          this.GET_OrderGoodsNumData()
        }
      },

      /** 搜索触发*/
      handleSearchHot() {
        if (this.hotType === 0) {
          this.GET_OrderAmountData()
        } else {
          this.GET_OrderGoodsNumData()
        }
      },

      /** 图表数据*/
      GET_OrderAmountData() {
        API_HotGoods.getHotGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          /** 列表信息 */
          this.tableData = response.data.sort((a, b) => { return b.order_amount - a.order_amount })
          /** x轴信息 */
          const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

          /** 数据信息 */
          const seriesData = this.tableData.map((item) => { return item.order_amount })

          this.orderAmountChart.setOption({
            title: { text: '热卖商品Top30', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { orient: 'vertical', data: [{ name: '总金额', textStyle: { borderColor: '#7CB5EC' }}], bottom: '10px' },
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
                name: '总金额',
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
        this.countTableHeight()
      },

      /** 图表数据*/
      GET_OrderGoodsNumData() {
        API_HotGoods.getHotGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          /** 列表信息 */
          this.tableData = response.data.sort((a, b) => { return b.order_goods_num - a.order_goods_num })
          /** x轴信息 */
          const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
          /** 数据信息 */
          const seriesData = this.tableData.map((item) => { return item.order_goods_num })

          this.orderGoodsNumChart.setOption({
            title: { text: '热卖商品Top30', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { orient: 'vertical', data: [{ name: '下单商品数', textStyle: { borderColor: '#7CB5EC' }}], bottom: '10px' },
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
              data: xData
            },
            yAxis: {
              name: '下单商品数量（个）',
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            },
            series: [
              {
                name: '下单商品数',
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
        this.countTableHeight()
      },

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        if (this.hotType === 0) {
          this.GET_OrderAmountData()
        } else {
          this.GET_OrderGoodsNumData()
        }
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        if (this.hotType === 0) {
          this.GET_OrderAmountData()
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

