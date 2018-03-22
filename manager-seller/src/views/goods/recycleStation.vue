<template>
  <en-tabel-layout
    toolbar
    pagination
    :tableData="tableData"
    :loading="loading"
    :selectionChange="selectionChange"
  >
    <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns">
        <el-button
          size="mini"
          type="danger"
          :disabled="selectionids.length === 0"
          @click="handleDeleteRecycles()">批量删除
        </el-button>
        <el-button
          size="mini"
          type="success"
          :disabled="selectionids.length === 0"
          @click="handlReductionRecycles()">批量还原
        </el-button>
      </div>
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
      <el-table-column type="selection"/>
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
        <template slot-scope="scope" width="200">
          <el-button
            size="mini"
            type="success"
            @click="handlReductionRecycle(scope.$index, scope.row)">还原
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteRecycle(scope.$index, scope.row)">删除
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
</template>

<script>
  import * as API_goods from '@/api/goods'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'recycleStation',
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

        /** 已选择的回收站商品 */
        selectionids: []
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

      /** 单个商品删除操作确认 */
      handleDeleteRecycle(index, row) {
        this.$confirm('确认删除吗？', '提示')
          .then(() => this.DELETE_Recycles(row.id))
          .catch(() => {
          })
      },
      /** 批量删除 */
      handleDeleteRecycles() {
        this.selectionids.length !== 0 && this.DELETE_Recycles(this.selectionids)
      },
      /**  回收站单个商品还原 */
      handlReductionRecycle(row) {
        this.$confirm('确认还原吗？', '提示')
          .then(() => this.ReductionGoods(row.id))
          .catch(() => {
          })
      },
      /** 批量还原 */
      handlReductionRecycles() {
        this.selectionids.length !== 0 && this.ReductionGoods(this.selectionids)
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
        this.advancedForm.catidegory_id = data.category_id
      },

      GET_GoodsList() {
        this.loading = true
        API_goods.getRecycleGoodsList(this.params).then(response => {
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

      selectionChange(val) {
        this.selectionids = val.map(item => item.id)
      },
      /** 还原回收站商品*/
      ReductionGoods(ids) {
        API_goods.RecycleReductionGoods({ ids }).then(response => {
          this.$message.success('还原成功')
        }).catch(error => {
          this.$message.success('还原失败，请稍后再试')
          console.log(error)
        })
      },

      /** 删除回收站商品 */
      DELETE_Recycles(ids) {
        API_goods.RecycleDeleteGoods(ids).then(() => {
          this.GET_GoodsList()
          this.$message.success('删除商品成功！')
        }).catch(() => this.$message.error('删除商品出错，请稍后再试！'))
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
