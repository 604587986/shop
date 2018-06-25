<template>
  <div class="container">
    <en-grade-editor
      ref="gradeEditor"
      :api="categoryApi"
      :params-names="{id: 'id', text: 'name'}"
      :max-level="2"
      :btns="itemBtns"
      @add-click="handleAddCategory"
      typeText="分类"
    />
    <el-dialog
      :title="categoryForm.id ? '编辑分类' : '添加分类'"
      width="500px"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="categoryForm" :rules="catgoryRules" ref="categoryForm" label-width="100px">
        <!--分类名称-->
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <!--上级分类-->
        <el-form-item v-if="parentOptions" label="上级分类" prop="parent_id">
          <el-select v-model="categoryForm.parent_id" placeholder="请选择上级分类">
            <el-option v-for="item in parentOptions" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <!--排序-->
        <el-form-item label="排序" prop="category_order">
          <el-input-number v-model="categoryForm.sort" controls-position="right" :min="0" :max="99999"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCategoryForm('categoryForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Article from '@/api/article'

  export default {
    name: 'articleCategory',
    data() {
      return {
        /** 获取下级分类API */
        categoryApi: process.env.ADMIN_API + '/pages/article-categories/@id/children',
        /** 添加、修改分类 表单 */
        categoryForm: {},
        /** 添加、修改分类 表单规则 */
        catgoryRules: {
          name: [this.MixinRequired('请输入文章分类名称！')]
        },
        /** 添加、修改分类 dialog */
        dialogVisible: false,
        /** 父分类 */
        parentOptions: '',
        itemBtns: [
          { text: '编辑', onClick: this.handleEditCategory },
          { text: '删除', onClick: this.handleDeleteCategory, color: 'red' }
        ]
      }
    },
    methods: {
      /** 添加分类 */
      handleAddCategory(level, parent, parentArray) {
        this.categoryForm = {
          parent_id: parent ? parent.id : 0,
          sort: 0
        }
        this.parentOptions = parentArray
        this.dialogVisible = true
      },
      /** 编辑文章分类 */
      handleEditCategory(category, parent, parentArray) {
        this.categoryForm = this.MixinClone(category)
        this.parentOptions = parentArray
        this.dialogVisible = true
      },
      /** 删除文章分类 */
      handleDeleteCategory(category) {
        this.$confirm('确定要删除这个文章分类吗？', '提示', { type: 'warning' }).then(() => {
          API_Article.deleteAritcleCategory(category.id).then(() => {
            this.$message.success('删除成功！')
            this.$refs['gradeEditor'].refresh('delete')
          })
        }).catch(() => {})
      },
      /** 提交文章分类表单 */
      submitCategoryForm(formName) {
        this.$refs[formName].validate((valid) => {
          const { id } = this.categoryForm
          if (id) {
            API_Article.editArticleCategory(id, this.categoryForm).then(response => {
              this.dialogVisible = false
              this.$message.success('修改成功！')
              this.$refs['gradeEditor'].refresh('edit')
            })
          } else {
            API_Article.addArticleCategory(this.categoryForm).then(() => {
              this.dialogVisible = false
              this.$message.success('添加成功！')
              this.$refs['gradeEditor'].refresh('add')
            })
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    padding: 10px;
    background-color: #fff;
  }
</style>
