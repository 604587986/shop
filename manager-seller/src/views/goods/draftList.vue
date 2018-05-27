<template>
  <en-tabel-layout
    toolbar
    pagination
    :tableData="tableData"
    :loading="loading"
  >
    <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns">
        <en-category-picker @changed="categoryChanged" :clearable='true'/>
      </div>
      <div class="toolbar-search">
        <en-table-search @search="searchEvent" />
      </div>
    </div>
    <template slot="table-columns">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.goods_image" class="goods-image"/>
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="名称" />
      <el-table-column label="价格">
        <template slot-scope="scope">{{ scope.row.goods_price | unitPrice('￥') }}</template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">{{ scope.row.quantity }}件</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDraftEdit(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDraftDel(scope.row)">删除
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
    name: 'draftList',
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
        pageData: null
      }
    },
    mounted() {
      this.GET_DraftGoodsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_DraftGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_DraftGoodsList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        delete this.params.category_path
        this.GET_DraftGoodsList()
      },

      /** 分类选择组件值发生改变 */
      categoryChanged(data) {
        delete this.params.keyword
        delete this.params.shop_cat_path
        if (data !== '') {
          this.params = {
            ...this.params,
            shop_cat_path: '0|' + data.join('|') + '|'
          }
        }
        this.GET_DraftGoodsList()
      },

      GET_DraftGoodsList() {
        this.loading = true
        API_goods.getDraftGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(() => { this.loading = false })
      },

      /** 草稿箱编辑 */
      handleDraftEdit(row) {
        const _draft_goods_id = row.draft_goods_id || '0'
        // isdraft 草稿箱2
        this.$router.push({ path: '/goods/good-publish', query: { goodsid: _draft_goods_id, isdraft: 2 }})
      },

      /** 草稿箱商品删除 */
      handleDraftDel(row) {
        this.$confirm('确认删除此草稿箱商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API_goods.deleteDraftGoods(row.draft_goods_id, {}).then((response) => {
            this.GET_DraftGoodsList()
            this.$message.success('删除草稿箱商品成功！')
          })
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
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
