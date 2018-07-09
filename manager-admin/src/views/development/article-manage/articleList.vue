<template>
  <div class="article-container">
    <el-tree
      :data="articleCategoryTree"
      :props="{children: 'children',label: 'name'}"
      @node-click="handleNodeClick"
      class="article-tree"
    />
    <en-table-layout
      :tableData="tableData.data"
      :loading="loading"
      border
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns" style="line-height: 32px;font-size: 14px">
          <span>{{ articleCategoryName || '全部'}}</span>-文章列表
        </div>
        <div class="toolbar-search">
          <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="handleAddArticle">添加</el-button>
          <en-table-search @search="searchEvent" placeholder="请输入文章名称" style="display: inline-block;margin-left: 10px"/>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="article_id" label="文章ID"/>
        <el-table-column prop="article_name" label="文章名称"/>
        <el-table-column prop="category_name" label="分类名称"/>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEditArticle(scope.$index, scope.row)">修改</el-button>
            <el-button
              type="danger"
              @click="handleDeleteArticle(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="params.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.data_total">
      </el-pagination>
    </en-table-layout>
    <el-dialog
      :title="articleForm.article_id ? ('编辑文章 - ' + articleForm.article_name) : '添加文章'"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="articleForm" :rules="articleRules" ref="articleForm" label-width="100px">
        <el-form-item label="文章名称" prop="article_name">
          <el-input v-model="articleForm.article_name"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category_id">
          <el-cascader
            :options="articleCategoryTree"
            :props="{children: 'children',label: 'name',value: 'id'}"
            :show-all-levels="false"
            :value="defaultCascaderValue"
            @change="handleCascaderChange"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="文章排序" prop="sort">
          <el-input-number v-model="articleForm.sort" controls-position="right" :min="0" :max="99999"></el-input-number>
        </el-form-item>
        <el-form-item label="文章外链" prop="outside_url">
          <el-input v-model="articleForm.outside_url"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <UE ref="ue" :defaultMsg="articleForm.content"></UE>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitArticleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Article from '@/api/article'
  import { UE } from '@/components'

  export default {
    name: 'articleList',
    components: { UE },
    data() {
      return {
        // 加载中
        loading: false,
        // 参数
        params: {
          page_no: 1,
          page_size: 10,
          name: '',
          category_id: ''
        },
        // 表格数据
        tableData: '',
        // 添加、修改文章 表单
        articleForm: {
          article_name: '',
          content: '',
          category_id: 0
        },
        // 添加、修改文章 表单规则
        articleRules: {
          article_name: [this.MixinRequired('请输入文字名称！')],
          category_id: [this.MixinRequired('请选择文章分类！')],
          content: [this.MixinRequired('请输入文章内容！')]
        },
        // 添加、修改文章 dialog
        dialogVisible: false,
        // 文章分类API
        articleCategoryApi: `${process.env.ADMIN_API}/pages/article-categories/@id/children`,
        // 文章分类树
        articleCategoryTree: [],
        // 被选分类名称
        articleCategoryName: '',
        // 级联选择器默认值
        defaultCascaderValue: []
      }
    },
    mounted() {
      this.GET_ArticleList()
      API_Article.getAritcleCategoryTree().then(response => {
        const rmEmptyChildren = (item) => {
          if (Array.isArray(item.children) && !item.children.length) {
            delete item.children
          }
        }
        this.articleCategoryTree = response.map(item => {
          rmEmptyChildren(item)
          if (item.children) {
            item.children.map(_item => {
              rmEmptyChildren(_item)
              return _item
            })
          }
          return item
        })
      })
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ArticleList()
      },
      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ArticleList()
      },
      /** 添加文章 */
      handleAddArticle() {
        this.articleForm = { sort: 0 }
        this.dialogVisible = true
      },
      /** 修改文章 */
      handleEditArticle(index, row) {
        API_Article.getArticleDetail(row.article_id).then(response => {
          this.articleForm = response
          this.dialogVisible = true
          let d = []
          const { category_id } = response
          this.articleCategoryTree.forEach(item => {
            if (item.id === category_id) {
              d = [item.id]
            } else {
              item.children && item.children.forEach(_item => {
                if (_item.id === category_id) {
                  d = [item.id, _item.id]
                }
              })
            }
          })
          this.defaultCascaderValue = d
        })
      },
      /** 删除文章 */
      handleDeleteArticle(index, row) {
        this.$confirm('确定要删除这篇文章吗？', '提示', { type: 'warning' }).then(() => {
          API_Article.deleteArticle(row.article_id).then(() => {
            this.$message.success('删除成功！')
            this.GET_ArticleList()
          })
        }).catch(() => {})
      },
      /** 搜索事件触发 */
      searchEvent(data) {
        this.params.name = data
        this.GET_ArticleList()
      },
      /** 选择分类 */
      handleNodeClick(data) {
        this.params.category_id = data.id
        this.GET_ArticleList()
        this.articleCategoryName = data.name
      },
      /** 当分类改变时 */
      handleCascaderChange(data) {
        this.articleForm.category_id = data[data.length - 1]
      },
      /** 添加、编辑文章 表单提交 */
      submitArticleForm() {
        this.articleForm.content = this.$refs['ue'].getUEContent()
        this.$refs['articleForm'].validate((valid) => {
          if (valid) {
            const { article_id } = this.articleForm
            if (article_id) {
              API_Article.editArticle(article_id, this.articleForm).then(response => {
                this.dialogVisible = false
                this.$message.success('修改成功！')
                this.MixinSetTableData(this.tableData, 'article_id', article_id, response)
              })
            } else {
              API_Article.addArticle(this.articleForm).then(() => {
                this.dialogVisible = false
                this.$message.success('保存成功！')
                this.GET_ArticleList()
              })
            }
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },
      /** 获取文章列表 */
      GET_ArticleList() {
        this.loading = true
        API_Article.getArticleList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .article-container {
    display: flex;
    padding: 10px;
    background-color: #fff;
  }
  .article-tree {
    padding: 10px;
    width: 300px;
    margin-right: 45px;
    margin-top: 44px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px 0 #ccc;
  }
  /deep/ .el-form-item__content > .el-input {
    width: 220px;
  }
</style>
