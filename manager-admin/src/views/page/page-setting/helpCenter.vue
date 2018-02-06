<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="help-category">
          <div class="help-category-header">
            <h2>文章分类</h2>
            <el-input
              placeholder="请输入内容"
              size="mini"
              v-model="filterCateTree">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-tree
            :data="categoryData"
            :props="{ children: 'children', label: 'name' }"
            default-expand-all
            :filter-node-method="filterTreeNode"
            @node-click="handleCateNodeClick"
            ref="categoryTree">
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="20">
        <div class="table-wapper">
          <en-tabel-layout
            toolbar
            pagination
            :tableData="tableData"
            :loading="loading"
          >
            <div slot="toolbar" class="inner-toolbar">
              <div class="toolbar-btns">
                <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddHelpArtice">添加</el-button>
              </div>
            </div>

            <template slot="table-columns">
              <el-table-column prop="id" label="ID"/>
              <el-table-column prop="page_title" label="页面标题"/>
              <el-table-column prop="sort" label="排序"/>
              <el-table-column label="添加时间">
                <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEditHelpArtice(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteHelpArtice(scope.$index, scope.row)">删除</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as API_HelpCenter from '@/api/helpCenter'
  import { TableLayout } from '@/components'
  export default {
    name: 'helpCenter',
    components: {
      [TableLayout.name]: TableLayout
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 分类列表loading状态 */
        cate_loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 初始分类ID */
        category_id: 2,

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 分类数据 */
        categoryData: [],

        /** 筛选分类 */
        filterCateTree: ''
      }
    },
    created() {
      this.GET_HelpCenterCategoryList()
      this.GET_HelpArticleList()
    },
    watch: {
      filterCateTree(val) {
        this.$refs.categoryTree.filter(val)
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_HelpArticleList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_HelpArticleList()
      },

      /** 添加帮助中心文章 */
      handleAddHelpArtice() {},

      /** 编辑帮助中心文章 */
      handleEditHelpArtice(index, row) {},

      /** 删除帮助中心文章 */
      handleDeleteHelpArtice(index, row) {},

      /** 分类筛选 */
      filterTreeNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },

      /** 帮助中心分类选择 */
      handleCateNodeClick(data) {
        this.category_id = data.id
        this.params.page_no = 1
        this.GET_HelpArticleList()
      },

      /** 获取帮助中心分类列表 */
      GET_HelpCenterCategoryList() {
        this.cate_loading = true
        API_HelpCenter.getHelpCenterCategory().then(response => {
          this.cate_loading = false
          this.categoryData = response
        }).catch(error => {
          this.cate_loading = false
          console.log(error)
        })
      },

      /** 获取帮助中心文章列表 */
      GET_HelpArticleList() {
        this.loading = true
        API_HelpCenter.getHelpArticleList(this.category_id, this.params).then(response => {
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
  .help-category {
    position: relative;
    width: 100%;
    height: 500px;
    background-color: #fff;

    .help-category-header {
      padding: 0 10px;
      width: 100%;
      height: 43px;
      border-bottom: 1px solid #e6ebf5;
      position: absolute;
      top: 0;
      left: 0;

      h2 {
        float: left;
        font-size: 14px;
        width: 65px;
      }
      .el-input {
        width: 145px;
        float: left;
        position: relative;
        top: 50%;
        margin-top: -14px;
      }
    }

    /deep/ .el-tree {
      margin-top: 35px;
    }
  }

  .table-wapper {
    min-height: 500px;
    background-color: #fff;
  }
</style>
