<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      row-key="id"
      :stripe="false"
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddHotKeyword">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="id" label="关键字ID"/>
        <el-table-column prop="hot_search_word" label="关键字"/>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.order" controls-position="right" :min="1" :max="99999999"/>
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditHotKeyword(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteHotKeyword(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import * as API_HotKeyword from '@/api/hotKeyword'
  import { TableSearch } from '@/components'

  export default {
    name: 'hotKeyword',
    components: {
      [TableSearch.name]: TableSearch
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
      this.GET_HotKeywordList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_HotKeywordList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_HotKeywordList()
      },

      /** 添加热门关键字 */
      handleAddHotKeyword() {},

      /** 编辑热门关键字 */
      handleEditHotKeyword(index, row) {},

      /** 删除热门关键字 */
      handleDeleteHotKeyword(index, row) {},

      /** 获取回收站会员列表 */
      GET_HotKeywordList() {
        this.loading = true
        API_HotKeyword.getHotKeywords(this.params).then(response => {
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
  .el-input-number {
    max-width: 120px;
  }
</style>
