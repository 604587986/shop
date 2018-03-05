<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
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
        <div v-loading="loading" id="goods-collect-top-chart" style="height: 300px"></div>
        <en-tabel-layout
          :toolbar="false"
          :pagination="false"
          :tableData="tableData"
        >
          <template slot="table-columns">
            <el-table-column type="index" width="150" label="排名"/>
            <el-table-column prop="name" label="商品名称"/>
            <el-table-column prop="price" :formatter="priceFormatter" label="商品价格"/>
            <el-table-column prop="shop_name" label="店铺名称"/>
            <el-table-column prop="num" label="收藏数量"/>
          </template>
        </en-tabel-layout>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  import * as API_Statistics from '@/api/statistics'
  import echartsOptions from '../echartsOptions'
  import { TableLayout } from '@/components'
  import { Foundation } from '@/framework'
  export default {
    name: 'goodsCollect',
    components: {
      [TableLayout.name]: TableLayout
    },
    data() {
      return {
        shopList: [],
        loading: false,
        tableData: [],
        params: {
          shop_id: 0
        }
      }
    },
    created() {
      this.GET_ShopList()
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts = this.$echarts.init(document.getElementById('goods-collect-top-chart'))
        this.GET_GoodsCollectTop()
      })
    },
    methods: {
      /** 金额格式化 */
      priceFormatter(row) {
        return `￥${Foundation.formatPrice(row.price)}`
      },
      /** 店铺发生改变 */
      shopChange() {
        this.GET_GoodsCollectTop()
      },
      /** 获取店铺列表 */
      GET_ShopList() {
        API_Shop.getShopList().then(response => {
          this.shopList = response.data
        }).catch(error => console.log(error))
      },
      /** 获取商品收藏排行 */
      GET_GoodsCollectTop() {
        this.loading = true
        API_Statistics.getGoodsCollectTop(this.params).then(response => {
          this.loading = false
          const data = response.data.sort((x, y) => x.num < y.num)
          this.tableData = response.data
          const _data = data.map(item => item.num)
          const _name = data.map(item => item.name)
          this.echarts.setOption(echartsOptions({
            titleText: '商品收藏TOP',
            tooltipFormatter: function(params) {
              params = params[0]
              const member_name = _name[params.dataIndex]
              return `商品名称：${member_name}<br/>${params.seriesName}：￥${params.value}`
            },
            seriesName: '收藏量',
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
