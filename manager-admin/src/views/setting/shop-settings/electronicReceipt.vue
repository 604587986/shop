<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="name" label="电子面单公司"/>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            {{ scope.row.is_open === 1 ? '已开启' : '已关闭' }}
            <el-button v-if="scope.row.is_open === 0" type="text" @click="handleOpenExpressPlatform(scope.$index, scope.row)">开启</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditElectronicReceipt(scope.$index, scope.row)">设置</el-button>
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
    <el-dialog title="电子面单设置" :visible.sync="dialogElectronicReceiptVisible" width="500px">
      <el-form :model="electronicReceiptForm" :rules="electronicReceiptRules" ref="electronicReceiptForm" label-width="100px">
        <el-form-item label="电商ID" prop="eb_id">
          <el-input v-model="electronicReceiptForm.eb_id"></el-input>
        </el-form-item>
        <el-form-item label="密匙" prop="app_key">
          <el-input v-model="electronicReceiptForm.app_key"></el-input>
        </el-form-item>
        <el-form-item label="请求URL" prop="req_url">
          <el-input v-model="electronicReceiptForm.req_url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogElectronicReceiptVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitElectronicReceiptForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_ElectronicReceipt from '@/api/electronicReceipt'

  export default {
    name: 'electronicReceipt',
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

        /** 电子面单设置 dialog */
        dialogElectronicReceiptVisible: false,

        /** 电子面单设置 表单 */
        electronicReceiptForm: {},
        /** 电子面单设置 表单规则 */
        electronicReceiptRules: {}
      }
    },
    mounted() {
      this.GET_ElectronicReceiptList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ElectronicReceiptList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ElectronicReceiptList()
      },

      /** 设置电子面单 */
      handleEditElectronicReceipt(index, row) {
        const config = JSON.parse(row.config)
        this.electronicReceiptForm = {
          id: row.id,
          eb_id: config['EBusinessID'],
          app_key: config['AppKey'],
          req_url: config['ReqURL']
        }
        this.dialogElectronicReceiptVisible = true
      },

      /** 设置电子面单 表单提交 */
      submitElectronicReceiptForm() {
        this.$refs['electronicReceiptForm'].validate((valid) => {
          if (valid) {
            const { id, eb_id, app_key, req_url } = this.electronicReceiptForm
            const params = {
              EBusinessID: eb_id,
              AppKey: app_key,
              ReqURL: req_url
            }
            API_ElectronicReceipt.editElectronicReceipt(id, params).then(response => {
              this.dialogElectronicReceiptVisible = false
              this.$message.success('修改成功！')
              this.GET_ElectronicReceiptList()
            }).catch(error => console.log(error))
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取电子面单列表 */
      GET_ElectronicReceiptList() {
        this.loading = true
        API_ElectronicReceipt.getElectronicReceiptList(this.params).then(response => {
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
