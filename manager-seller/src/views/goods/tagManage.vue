<template>
  <en-tabel-layout
    toolbar
    pagination
    :tableData="tableData"
    :loading="loading"
  >
    <template slot="table-columns">
      <el-table-column prop="id" label="标签ID"/>
      <el-table-column prop="name" label="标签名称"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="addtag(scope.row.id)">标签商品设置
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
  import * as API_goods from '@/api/goodsTag'
  import { TableLayout } from '@/components'

  export default {
    name: 'tagManage',
    components: {
      [TableLayout.name]: TableLayout
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
      this.GET_TagsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_TagsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_TagsList()
      },
      GET_TagsList() {
        this.loading = true
        API_goods.getTagsList(this.params).then(response => {
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

      /** 为商品添加标签 */
      addtag(tag_id) {
        this.$router.push({ name: 'tagAdd', params: { tag_id: tag_id }})
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
