<template>
  <en-tabel-layout
    toolbar
    pagination
    :tableData="goodsData.data"
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
                <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input size="medium" v-model="advancedForm.goods_sn" clearable></el-input>
              </el-form-item>
              <el-form-item label="店铺名称">
                <el-input size="medium" v-model="advancedForm.seller_name" clearable></el-input>
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
      <el-table-column prop="sn" label="商品编号" width="200"/>
      <el-table-column prop="seller_name" label="店铺名称" width="150"/>
      <el-table-column prop="name" label="商品名称" align="left"/>
      <!--<el-table-column prop="category_name" label="商品分类"/>-->
      <el-table-column label="商品价格" width="120">
        <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
      </el-table-column>
      <el-table-column prop="market_enable" label="上架状态" width="80" :formatter="marketStatus"/>
      <!--<el-table-column prop="brand_name" label="品牌"> </el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.market_enable === 0"
            @click="handleWithdraw(scope.$index, scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </template>

    <el-pagination
      v-if="goodsData"
      slot="pagination"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      :current-page="params.page_no"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsData.data_total">
    </el-pagination>
  </en-tabel-layout>
</template>

<script>
  import * as API_goods from '@/api/goods'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'goodsList',
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

        /** 商品列表数据 */
        goodsData: '',

        /** 高级搜索数据 */
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          seller_name: '',
          category_path: ''
        }
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

      /** 单个商品下架操作确认 */
      handleWithdraw(index, row) {
        this.$prompt('请输入下架原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请填写下架原因！'
        }).then(({ value }) => {
          API_goods.underGoods(row.id, value).then(() => {
            this.GET_GoodsList()
            this.$message.success('下架商品成功！')
          })
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
        this.advancedForm.category_path = data.category_path || ''
      },

      GET_GoodsList() {
        this.loading = true
        API_goods.getGoodsList(this.params).then(response => {
          this.loading = false
          this.goodsData = response
        }).catch(() => (this.loading = false))
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

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>
