<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddArticleModel">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="id" label="模型ID"/>
        <el-table-column prop="name" label="模型名称"/>
        <el-table-column prop="table_name" label="表名"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditArticleModel(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteArticleModel(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="articleModelForm.id ? '编辑文章模型' : '添加文章模型'" :visible.sync="dialogArticleModelVisible" width="550px" class="url-mapping-form">
      <el-form :model="articleModelForm" :rules="articleModelRules" ref="articleModelForm" label-width="100px">
        <el-form-item label="模型名称" prop="name">
          <el-input v-model="articleModelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="表名" prop="table_name">
          <el-input v-model="articleModelForm.table_name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="brief">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="articleModelForm.brief"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogArticleModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddArticleModel('articleModelForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Article from '@/api/article'
  import { TableLayout } from '@/components'
  export default {
    name: 'articleModel',
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
        pageData: null,

        /** 添加、修改文章模型 dialog */
        dialogArticleModelVisible: false,
        /** 添加、修改文章模型 表单*/
        articleModelForm: {},
        /** 添加、修改文章模型规则 */
        articleModelRules: {
          name: [
            { required: true, message: '请输入模型名称', trigger: 'blur' }
          ],
          table_name: [
            { required: true, message: '请输入表名', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.GET_ArticleModelList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ArticleModelList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ArticleModelList()
      },

      /** 添加文章模型 */
      handleAddArticleModel() {
        this.articleModelForm = {}
        this.dialogArticleModelVisible = true
      },

      /** 编辑文章模型 */
      handleEditArticleModel(index, row) {
        this.articleModelForm = row
        this.dialogArticleModelVisible = true
      },

      /** 删除文章模型 */
      handleDeleteArticleModel(index, row) {
        this.$confirm('确定要删除这个模型吗？此操作不可逆！', '提示', { type: 'warning' }).then(() => {
          API_Article.deleteArticleModel(row.id).then(response => {
            this.$message.success('删除成功！')
            this.GET_ArticleModelList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 获取文章模型列表 */
      GET_ArticleModelList() {
        this.loading = true
        API_Article.getArticleModelList(this.params).then(response => {
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

</style>
