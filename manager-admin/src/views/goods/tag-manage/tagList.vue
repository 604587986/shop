<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddTag">添加</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent"/>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>
        <!--标签ID-->
        <el-table-column prop="id" label="标签ID"/>
        <!--标签名称-->
        <el-table-column prop="name" label="标签名称"/>
        <!--标签类型-->
        <el-table-column label="标签类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeFilter }}</span>
          </template>
        </el-table-column>

        <!--操作-->
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditTag(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.type === 1"
              @click="handleEditTag(scope.$index, scope.row)">商品</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteTag(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="pagination-toolbar">
        <el-button type="danger" size="mini" @click="deleteTheTags">删除选中</el-button>
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
    <el-dialog
      :title="dialogTagTitle"
      :visible.sync="dialogTagVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px"
    >
      <el-form :model="tagForm" :rules="tagRules" ref="tagForm" label-width="100px">
        <!--标签名称-->
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagForm.name"></el-input>
        </el-form-item>
        <!--标签类型-->
        <el-form-item v-if="tagForm.form_type === 'add'" label="标签类型" prop="type">
          <el-radio v-model="tagForm.type" :label="0">商品标签</el-radio>
          <el-radio v-model="tagForm.type" :label="1">品牌标签</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTagVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTagForm('tagForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_tag from '@/api/tag'

  export default {
    name: 'tagList',
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

        /** 被选数据 */
        selectedData: [],

        /** 添加、修改标签 dialog */
        dialogTagVisible: false,

        /** 添加、修改标签 dialog标题 */
        dialogTagTitle: '添加标签',

        /** 添加、修改标签 表单 */
        tagForm: {
          form_type: 'add'
        },

        /** 添加、修改标签 规则 */
        tagRules: {
          name: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    filters: {
      typeFilter(val) {
        return val ? '品牌标签' : '商品标签'
      }
    },
    mounted() {
      this.GET_TagList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_TagList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_TagList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 添加标签事件触发 */
      handleAddTag() {
        this.tagForm = {
          form_type: 'add',
          name: '',
          type: 0
        }
        this.dialogTagTitle = '添加标签'
        this.dialogTagVisible = true
      },

      /** 修改标签事件 */
      handleEditTag(index, row) {
        this.tagForm = {
          form_type: 'edit',
          ...row
        }
        this.dialogTagTitle = '编辑标签 - ' + row.name
        this.dialogTagVisible = true
      },

      /** 删除标签事件 */
      handleDeleteTag(index, row) {
        this.$confirm('确定要删除这个标签吗？', '提示', { type: 'warning' })
          .then(() => { this.DELETE_Tags(row.id) })
          .catch(() => {})
      },

      /** 删除选中 */
      deleteTheTags() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何标签！')
        } else {
          this.$confirm('确定要删除这些标签吗？', '提示', { type: 'warning' })
            .then(() => { this.DELETE_Tags(this.selectedData) })
            .catch(() => {})
        }
      },

      /** 修改标签值事件 */
      handleEditTagVal(index, row) {
        console.log(row)
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_TagList()
      },

      /** 添加、修改标签 表单提交 */
      submitTagForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.tagForm.form_type === 'add') {
              API_tag.addTag(this.tagForm).then(response => {
                this.dialogTagVisible = false
                this.$message.success('添加成功！')
                this.GET_TagList()
              }).catch(error => console.log(error))
            } else {
              API_tag.eidtTag(this.tagForm.id, this.tagForm).then(response => {
                this.$message.success('保存成功！')
                this.dialogTagVisible = false
                this.GET_TagList()
              }).catch(error => console.log(error))
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取标签列表 */
      GET_TagList() {
        this.loading = true
        API_tag.getTags(this.params).then(response => {
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
      },

      /** 删除标签 */
      DELETE_Tags(ids) {
        API_tag.deleteTags(ids).then(response => {
          this.$message.success('删除成功！')
          this.GET_TagList()
        }).catch(error => console.log(error))
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
    padding: 0 20px;
  }
</style>
