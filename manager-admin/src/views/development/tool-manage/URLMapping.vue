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
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddURLMapping">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="path_regexp" label="URL正则"/>
        <el-table-column prop="path" label="路径"/>
        <el-table-column prop="page_name" label="页面名称"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditURLMapping(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteURLMapping(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="URLMappingForm.id ? '编辑URL映射' : '添加URL映射'" :visible.sync="dialogURLMappingVisible" width="550px" class="url-mapping-form">
      <el-form :model="URLMappingForm" :rules="URLMappingRules" ref="URLMappingForm" label-width="100px">
        <el-form-item label="URL正则" prop="path_regexp">
          <el-input v-model="URLMappingForm.path_regexp"></el-input>
        </el-form-item>
        <el-form-item label="模板路径" prop="path">
          <el-input v-model="URLMappingForm.path"></el-input>
        </el-form-item>
        <el-form-item label="页面名称" prop="page_name">
          <el-input v-model="URLMappingForm.page_name"></el-input>
        </el-form-item>
        <!--<el-form-item label="积分" prop="point">-->
          <!--<el-input v-model="URLMappingForm.point"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="URLMappingForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="HTTP缓存" prop="http_cache">
          <el-radio-group v-model="URLMappingForm.http_cache">
            <el-radio :label="1">缓存</el-radio>
            <el-radio :label="0">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="URLMappingForm.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogURLMappingVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddURLMapping('URLMappingForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_URLMapping from '@/api/URLMapping'
  import { TableLayout, TableSearch } from '@/components'
  export default {
    name: 'URLMapping',
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

        /** 添加、修改URL映射 dialog */
        dialogURLMappingVisible: false,
        /** 添加、修改URL映射 表单*/
        URLMappingForm: {},
        /** 添加、修改URL映射规则 */
        URLMappingRules: {
          path_regexp: [
            { required: true, message: '请输入URL正则匹配', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '请输入模板文件路径', trigger: 'blur' }
          ],
          page_name: [
            { required: true, message: '请输入页面名称', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.GET_URLMappingList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_URLMappingList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_URLMappingList()
      },

      /** 添加URL映射 */
      handleAddURLMapping() {
        this.URLMappingForm = { http_cache: 1 }
        this.dialogURLMappingVisible = true
      },

      /** 修改URL映射 */
      handleEditURLMapping(index, row) {
        this.URLMappingForm = row
        this.dialogURLMappingVisible = true
      },

      /** 删除URL映射 */
      handleDeleteURLMapping(index, row) {
        this.$confirm('确定要删除这些会员吗？', '提示', { type: 'warning' }).then(() => {
          API_URLMapping.deleteURLMapping(row.id).then(response => {
            this.$message.success('删除成功！')
            this.GET_URLMappingList()
          }).catch(error => console.log(error))
        }).catch(error => console.log(error))
      },

      /** 添加、修改URL映射 表单提交 */
      submitAddURLMapping(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.URLMappingForm.id) {
              // 如果有ID，是编辑
              API_URLMapping.editURLMapping(this.URLMappingForm.id, this.URLMappingForm).then(response => {
                this.dialogURLMappingVisible = false
                this.$message.success('修改成功！')
                this.GET_URLMappingList()
              }).catch(error => {
                this.dialogURLMappingVisible = false
                console.log(error)
              })
            } else {
              // 如果没有ID，是添加
              API_URLMapping.addURLMapping(this.URLMappingForm).then(response => {
                this.dialogURLMappingVisible = false
                this.$message.success('保存成功！')
                this.GET_URLMappingList()
              }).catch(error => {
                this.dialogURLMappingVisible = false
                console.log(error)
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取管理员列表 */
      GET_URLMappingList() {
        this.loading = true
        API_URLMapping.getURLMappingList(this.params).then(response => {
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
  .url-mapping-form /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
</style>
