<template>
  <div class="bg-shop-summary">
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
                <el-form-item label="商品分类">
                  <en-category-picker @changed="categoryChanged"/>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--商品名称-->
        <el-table-column prop="goods_name" label="商品名称"/>
        <!--价格-->
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_price }}</span>
          </template>
        </el-table-column>
        <!--近30天下单商品数-->
        <el-table-column prop="order_num" label="近30天下单商品数"/>
        <!--近30天下单金额-->
        <el-table-column prop="order_amount" label="近30天下单金额"/>
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
  </div>
</template>

<script>
  import * as API_goods from '@/api/goods'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'goodsDetails',
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
          page_size: 10,
          goods_status: 0
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

        /** 商品库存显示*/
        goodsStockshow: false,

        /** 库存商品数量*/
        goodsStocknums: 1,

        /** 商品库存列表数据*/
        goodsStockData: null
      }
    },
    mounted() {
      if (this.$route.query) {
        this.params.goods_status = this.$route.query.goodsStatus
      }
      this.GET_GoodsList()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.query) {
          vm.goods_status = vm.params.goods_status = vm.$route.query.goods_status
        }
        vm.GET_GoodsList()
        next()
      })
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

      /** 单个商品下架操作确认 */
      handleWithdraw(index, row) {
        this.$confirm('确认下架吗？', '提示')
          .then(() => this.DELETE_Goods(row.id))
          .catch(() => {
          })
      },

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          goods_status: data
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
        API_goods.getGoodsList(this.params).then(response => {
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

  .toolbar-search {
    margin-right: 10px;
  }

</style>

