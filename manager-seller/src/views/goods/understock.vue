<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns"></div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                  <el-input size="medium" v-model="advancedForm.goods_sn"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name"></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                  <en-category-picker @changed="categoryChanged"/>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.image" class="goods-image"/>
          </template>
        </el-table-column>
        <el-table-column prop="sn" label="商品编号" width="180"/>
        <el-table-column prop="seller_name" label="店铺名称" width="120"/>
        <el-table-column prop="name" label="商品名称" align="left" width="450"/>
        <el-table-column prop="category_name" label="商品分类"/>
        <el-table-column label="商品价格" width="120">
          <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column prop="market_enable" label="上架状态" width="80" :formatter="marketStatus"/>
        <el-table-column prop="brand_name" label="品牌"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleWithdraw(scope.$index, scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
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
    <el-dialog title="库存编辑" :visible.sync="goodsWarningStockshow" width="40%">
      <en-tabel-layout :tableData="goodsWarningStockDate" :loading="loading">
        <template slot="table-columns">
          <el-table-column prop="sn" label="货号"/>
          <el-table-column prop="name" label="商品名称"/>
          <el-table-column prop="balanced" label="可用库存"/>
          <el-table-column prop="balanced" label="库存"/>
        </template>
      </en-tabel-layout>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_goods from '@/api/goods'
  import {TableLayout, TableSearch, CategoryPicker} from '@/components'

  export default {
    name: 'understock',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
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

        /** 高级搜索数据 */
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          shop_name: '',
          category_id: ''
        },

        /** 预警商品库存信息显示*/
        goodsWarningStockshow: false,

        /** 预警商品库存信息*/
        goodsWarningStockDate: null
      }
    },
    mounted() {
      this.GET_GoodsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsList()
      },

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_GoodsList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.keyword
        this.GET_GoodsList()
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
        this.advancedForm.category_id = data.category_id
      },

      GET_GoodsList() {
        this.loading = true
        API_goods.getWarningGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 查看库存信息 */
      handleWithdraw(ids) {
        this.goodsWarningStockshow = true
        API_goods.getWarningGoodsStockList(ids).then((response) => {
          this.goodsWarningStockDate = response.data
        }).catch(() => this.$message.error('查看库存商品信息出错，请稍后再试！'))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-btns {

  }

  .toolbar-search {
    margin-right: 10px;
  }

  /deep/ .toolbar {
    display: none !important;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>
