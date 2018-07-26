<template>
  <div class="container">
    <el-form :model="articleForm" :rules="articleRules" ref="articleForm" label-width="100px">
      <el-form-item label="文章名称" prop="article_name" style="width: 500px">
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
      <el-form-item label="文章外链" prop="outside_url" style="width: 500px">
        <el-input v-model="articleForm.outside_url"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <UE ref="ue" :defaultMsg="articleForm.content"></UE>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submitArticleForm">保存文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as API_Article from '@/api/article'
  import { UE } from '@/components'

  export default {
    name: 'addArticle',
    components: { UE },
    data() {
      const { article_id, category } = this.$route.params
      return {
        // 如果是修改，则有值
        article_id,
        // 分类树
        articleCategoryTree: category,
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
        // 级联选择器默认值
        defaultCascaderValue: []
      }
    },
    mounted() {
      if (this.article_id) {
        API_Article.getArticleDetail(this.article_id).then(response => {
          this.articleForm = response
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
      }
    },
    methods: {
      /** 当分类改变时 */
      handleCascaderChange(data) {
        this.articleForm.category_id = data[data.length - 1]
      },
      /** 添加、编辑文章 表单提交 */
      submitArticleForm() {
        this.articleForm.content = this.$refs['ue'].getUEContent()
        this.$refs['articleForm'].validate((valid) => {
          if (valid) {
            const saveScuess = () => {
              this.$message.success('保存成功！')
              this.$route.params.callback()
              this.$store.dispatch('delCurrentViews', {
                view: this.$route,
                $router: this.$router
              })
            }
            const { article_id } = this
            if (article_id) {
              API_Article.editArticle(article_id, this.articleForm).then(saveScuess)
            } else {
              API_Article.addArticle(this.articleForm).then(saveScuess)
            }
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      }
    }
  }
</script>
