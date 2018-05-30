<template>
  <div class="container">
    <el-card>
      <div slot="header" class="chart-header">
        <div class="chart-header-item">
          <span>商品分类</span>
          <en-category-picker :clearable="true" @changed="handleCategoryChanged"/>
        </div>
        <div class="chart-header-item">
          <span>店铺：</span>
          <en-shop-picker @changed="handleShopChanged"/>
        </div>
      </div>
      <en-tabel-layout
        :toolbar="false"
        pagination
        :tableData="tableData"
        :loading="loading"
      >
        <template slot="table-columns">
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="avgPrice" label="评价价格"/>
          <el-table-column prop="salesGoodsNum" label="有销量商品"/>
          <el-table-column prop="sales" label="销量"/>
          <el-table-column prop="saleroom" label="销售额"/>
          <el-table-column prop="countGoods" label="商品总数"/>
          <el-table-column prop="residue" label="无销量商品数"/>
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
      </en-tabel-layout>
    </el-card>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { CategoryPicker, ShopPicker } from '@/components'

  export default {
    name: 'generalityOverview',
    components: {
      [CategoryPicker.name]: CategoryPicker,
      [ShopPicker.name]: ShopPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          shop_id: 0,
          cat_id: 0
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null
      }
    },
    created() {
      this.GET_GeneralityOverview()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GeneralityOverview()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GeneralityOverview()
      },

      /** 商品分类发生改变 */
      handleCategoryChanged(data) {
        this.params.cat_id = data.category_id || 0
        this.GET_GeneralityOverview()
      },
      /** 店铺发生改变 */
      handleShopChanged(shop) {
        this.params.shop_id = shop.shop_id
        this.GET_GeneralityOverview()
      },

      /** 获取概括总览数据 */
      GET_GeneralityOverview() {
        this.loading = true
        API_Statistics.getGeneralityOverviewData(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
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
    /deep/ .el-card__body {
      padding-top: 0;
    }
    /deep/ .container {
      padding: 0;
    }
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
