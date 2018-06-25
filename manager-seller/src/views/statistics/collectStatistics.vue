<template>
  <div class="bg-shop-summary">
    <p>本页面有关收藏统计TOP50,由高到底</p>
    <div id="collectionStatistics" :style="{height: tableHeight + 'px'}"></div>
    <en-table-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="goods_name" label="商品名称" />
        <el-table-column label="商品价格" >
          <template slot-scope="scope">{{ scope.row.goods_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column prop="collection_num" label="收藏量"></el-table-column>
      </template>
      <el-pagination
        slot="pagination"
        v-if="pageData"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-table-layout>
  </div>
</template>

<script>
  import * as API_collectionStatistics from '@/api/collectionStatistics'
  import { CategoryPicker } from '@/components'
  export default {
    name: 'collectStatistics',
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

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        tableHeight: document.body.clientHeight / 2
      }
    },
    created() {
      this.GET_CollectionData()
    },
    mounted() {
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.sesalChart = this.$echarts.init(document.getElementById('collectionStatistics'))
      })
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = document.body.clientHeight / 2
        /** 图表刷新 */
        setTimeout(this.sesalChart.resize)
      },

      /** 收藏数据*/
      GET_CollectionData() {
        API_collectionStatistics.getCollectionStatistics(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          /** 收藏列表 */
          this.tableData = response.data.sort((a, b) => { return b.collection_num - a.collection_num })
          /** 商品名称列表 x轴信息 */
          const goodsNameList = this.tableData.map((item) => { return item.goods_name })
          /** 商品收藏数据列表 */
          const goodsDataList = this.tableData.map((item) => { return item.collection_num })

          this.sesalChart.setOption({
            title: { text: '收藏商品排行Top50', x: 'center' },
            tooltip: { trigger: 'axis' },
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
              data: goodsNameList
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} 次'
              }
            },
            series: [
              {
                name: '收藏商品',
                type: 'line',
                data: goodsDataList,
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

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_CollectionData()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_CollectionData()
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
