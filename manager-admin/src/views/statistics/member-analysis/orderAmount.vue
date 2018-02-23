<template>
  <div :loading="loading" class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>订单周期：</span>
          <en-year-month-picker @change="yearMonthChange"/>
        </div>
        <div class="chart-header-item">
          <span>店铺：</span>
          <el-select
            v-model="params.shop_id"
            placeholder="请选择"
            @change="shopChange"
            style="width: 150px"
          >
            <el-option label="全平台" :value="0"/>
            <el-option
              v-for="item in shopList"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"/>
          </el-select>
        </div>
      </div>
      <el-tabs v-model="tab_type" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="订单量" name="order">
          <div id="order-chart" class="tab-chart"></div>
        </el-tab-pane>
        <el-tab-pane label="订单商品量" name="goods">
          <div id="goods-chart" class="tab-chart"></div>
        </el-tab-pane>
        <el-tab-pane label="订单金额" name="price">
          <div id="price-chart" class="tab-chart"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import * as API_Shop from '@/api/shop'
  import { YearMonthPicker } from '@/components'
  export default {
    name: 'orderAmount',
    components: {
      [YearMonthPicker.name]: YearMonthPicker
    },
    data() {
      return {
        loading: false,
        tab_type: 'order',
        shopList: [],
        search_type: 1,
        params: {
          start_date: '',
          end_date: '',
          shop_id: 0
        }
      }
    },
    created() {
      this.GET_ShopList()
    },
    mounted() {
      this.$nextTick(() => {
        this.orderChart = this.$echarts.init(document.getElementById('order-chart'))
        this.goodsChart = this.$echarts.init(document.getElementById('goods-chart'))
        this.priceChart = this.$echarts.init(document.getElementById('price-chart'))
      })
    },
    methods: {
      /** 年月份发生变化 */
      yearMonthChange(object) {
        this.params.start_date = object.start_time
        this.params.end_date = object.end_time
        this.GET_OrderNum()
      },
      /** 店铺发生改变 */
      shopChange() {
        this.GET_OrderNum()
      },
      /** tab切换 */
      handleClickTab() {
        console.log(this.tab_type)
      },

      GET_ShopList() {
        API_Shop.getShopList().then(response => {
          this.shopList = response.data
        }).catch(error => console.log(error))
      },
      /** 获取会员下单量 */
      GET_OrderNum() {
        this.loading = true
        API_Statistics.memberOrderNum(this.params).then(response => {
          const _data = response.data.map(item => item.num)
          const _name = response.data.map(item => item.name)
          this.orderChart.setOption({
            color: ['#3398DB'],
            title: {
              x: 'center',
              text: '买家排行TOP10'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              formatter: function(params) {
                params = params[0]
                const member_name = _name[params.dataIndex]
                return `买家：${member_name}<br/>${params.seriesName}：${params.value}`
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                axisTick: { alignWithLabel: true }
              }
            ],
            yAxis: [
              { type: 'value' }
            ],
            series: [
              {
                name: '订单量',
                type: 'bar',
                barWidth: '60%',
                data: _data
              }
            ]
          })
          this.loading = false
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
  .tab-chart {
    height: 300px;
  }
</style>
