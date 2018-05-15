<template>
  <div>
    <en-tabel-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddExpress">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="name" label="公司名称"/>
        <el-table-column prop="code" label="公司代码"/>
        <el-table-column prop="kd_code" label="快递鸟代码"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditExpress(scope.$index, scope.row)">配置</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="tableData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.data_total">
      </el-pagination>
    </en-tabel-layout>
    <el-dialog
      title="物流公司"
      :visible.sync="dialogExpressVisible"
      width="30%">
      <el-form :model="expressForm" :rules="expressRules" ref="expressForm" label-width="120px">
        <el-form-item label="物流公司名称" prop="name">
          <el-input v-model="expressForm.name"></el-input>
        </el-form-item>
        <el-form-item label="物流公司代码" prop="code">
          <el-input v-model="expressForm.code"></el-input>
        </el-form-item>
        <el-form-item label="快递鸟物流代码" prop="kd_code">
          <el-input v-model="expressForm.kd_code"></el-input>
        </el-form-item>
        <el-form-item label="电子面单" prop="support_waybill">
          <el-radio-group v-model="expressForm.support_waybill">
            <el-radio :label="1">支持</el-radio>
            <el-radio :label="0">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogExpressVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitExpressForm('expressForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Express from '@/api/express'
  import { TableLayout } from '@/components'
  export default {
    name: 'expressSettings',
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
        tableData: '',
        /** 快递公司 表单 */
        expressForm: {},
        /** 快递公司 表单规则 */
        expressRules: {
          name: [this.MixinRequired('请输入物流公司名称！')],
          code: [this.MixinRequired('请输入物流公司代码！')],
          kd_code: [this.MixinRequired('请输入快递鸟物流代码！')]
        },
        /** 快递公司 dialog */
        dialogExpressVisible: false
      }
    },
    mounted() {
      this.GET_ExpressList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ExpressList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ExpressList()
      },

      /** 添加快递公司 */
      handleAddExpress() {
        this.expressForm = { support_waybill: 0 }
        this.dialogExpressVisible = true
      },

      /** 编辑物流公司 */
      handleEditExpress(index, row) {
        this.expressForm = JSON.parse(JSON.stringify(row))
        this.dialogExpressVisible = true
      },

      /** 快递公司 提交表单 */
      submitExpressForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const { id } = this.expressForm
            if (!id) {
              API_Express.addExpress(this.expressForm).then(response => {
                this.dialogExpressVisible = false
                this.$message.success('添加成功！')
                this.GET_ExpressList()
              })
            } else {
              API_Express.editExpress(id, this.expressForm).then(response => {
                this.dialogExpressVisible = false
                this.$message.success('保存成功！')
                this.MixinSetTableData(this.tableData, id, response)
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 获取物流公司列表 */
      GET_ExpressList() {
        this.loading = true
        API_Express.getExpressList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
