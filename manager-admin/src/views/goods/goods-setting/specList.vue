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
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddSpecs">添加</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent"/>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>\
        <!--规格名称-->
        <el-table-column prop="name" label="规格名称"/>
        <!--规格类型-->
        <el-table-column label="规格类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeFilter }}</span>
          </template>
        </el-table-column>
        <!--规格备注-->
        <el-table-column prop="memo" label="规格备注"/>

        <!--操作-->
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSpec(scope.$index, scope.row)">修改规格</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSpecVal(scope.$index, scope.row)">修改规格值</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSpec(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="pagination-toolbar">
        <el-button type="danger" size="mini" @click="deleteTheSpecs">删除选中</el-button>
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
    <el-dialog :title="dialogSpecTitle" :visible.sync="dialogSpecVisible" width="500px">
      <el-form :model="specForm" :rules="specRules" ref="specForm" label-width="100px">
        <!--规格名称-->
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="specForm.name"></el-input>
        </el-form-item>
        <!--规格备注-->
        <el-form-item label="规格备注" prop="memo">
          <el-input v-model="specForm.memo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSpecVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSpecForm('specForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_spec from '@/api/spec'
  import { TableLayout, TableSearch } from '@/components'
  export default {
    name: 'specList',
    components: {
      [TableLayout.name]: TableLayout,
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
        pageData: null,

        /** 被选数据 */
        selectedData: [],

        /** 添加、修改规格 dialog */
        dialogSpecVisible: false,

        /** 添加、修改规格 dialog标题 */
        dialogSpecTitle: '添加规格',

        /** 添加、修改规格 表单 */
        specForm: {
          form_type: 'add'
        },

        /** 添加、修改规格 规则 */
        specRules: {
          name: [
            { required: true, message: '请输入规格名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    filters: {
      typeFilter(val) {
        return val ? '图片' : '文字'
      }
    },
    mounted() {
      this.GET_SpecsList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SpecsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SpecsList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 添加规格事件触发 */
      handleAddSpecs() {
        this.specForm = {
          form_type: 'add',
          name: '',
          memo: ''
        }
        this.dialogSpecTitle = '添加规格'
        this.dialogSpecVisible = true
      },

      /** 修改规格事件 */
      handleEditSpec(index, row) {
        this.specForm = {
          form_type: 'edit',
          ...row
        }
        this.dialogSpecTitle = '编辑规格 - ' + row.name
        this.dialogSpecVisible = true
      },

      /** 删除规格事件 */
      handleDeleteSpec(index, row) {
        this.$confirm('确定要删除这个规格吗？', '提示', { type: 'warning' })
          .then(() => { this.DELETE_Specs(row.id) })
          .catch(() => {})
      },

      /** 删除选中 */
      deleteTheSpecs() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何规格！')
        } else {
          this.$confirm('确定要删除这些规格吗？', '提示', { type: 'warning' })
            .then(() => { this.DELETE_Specs(this.selectedData) })
            .catch(() => {})
        }
      },

      /** 修改规格值事件 */
      handleEditSpecVal(index, row) {
        console.log(row)
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_SpecsList()
      },

      /** 添加、修改规格 表单提交 */
      submitSpecForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.specForm.form_type === 'add') {
              API_spec.addSpec(this.specForm).then(response => {
                this.$message.success('添加成功！')
                this.dialogSpecVisible = false
                this.GET_SpecsList()
              }).catch(error => console.log(error))
            } else {
              API_spec.eidtSpec(this.specForm.id, this.specForm).then(response => {
                this.$message.success('保存成功！')
                this.dialogSpecVisible = false
                this.GET_SpecsList()
              }).catch(error => console.log(error))
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取规格列表 */
      GET_SpecsList() {
        this.loading = true
        API_spec.getSpecs(this.params).then(response => {
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

      /** 删除规格 */
      DELETE_Specs(ids) {
        API_spec.deleteSpecs(ids).then(response => {
          this.$message.success('删除成功！')
          this.GET_SpecsList()
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
