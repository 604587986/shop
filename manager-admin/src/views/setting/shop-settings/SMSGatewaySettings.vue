<template>
  <div>
    <en-tabel-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddSmsGateway">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="name" label="平台名称"/>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            {{ scope.row.is_open === 1 ? '已开启' : '已关闭' }}
            <el-button v-if="scope.row.is_open === 0" type="text" @click="handleOpenSmsGateway(scope.$index, scope.row)">开启</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSmsGateway(scope.$index, scope.row)">修改</el-button>
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
    </en-tabel-layout>
    <el-dialog
      :title="smsForm.id ? '编辑SMS' : '添加SMS'"
      :visible.sync="dialogSmsVisible"
      width="500px"
      append-to-body>
      <el-form :model="smsForm" :rules="smsRules" ref="smsForm" size="small" label-width="120px">
        <el-form-item label="平台名称" prop="name">
          <el-input v-model="smsForm.name"/>
        </el-form-item>
        <el-form-item label="平台代码" prop="code">
          <el-input v-model="smsForm.code"/>
        </el-form-item>
        <el-form-item label="是否开启" prop="is_open">
          <el-radio-group v-model="smsForm.is_open">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配置" prop="config">
          <el-input v-model="smsForm.config"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSmsVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSmsForm('smsForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // Andste_TODO 2018/5/10: 未适配API
  import * as API_SmsGateway from '@/api/smsGateway'
  import { TableLayout } from '@/components'
  export default {
    name: 'SMSGatewaySettings',
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
        /** sms 表单 */
        smsForm: { is_open: 0 },
        /** sms 表单规则 */
        smsRules: {},
        /** sms表单 dailog */
        dialogSmsVisible: false
      }
    },
    mounted() {
      this.GET_SmsGatewayList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SmsGatewayList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SmsGatewayList()
      },

      /** 添加短信网关 */
      handleAddSmsGateway() {
        this.dialogSmsVisible = true
      },

      /** 修改短信网关 */
      handleEditSmsGateway(index, row) {},

      /** 开启短信网关 */
      handleOpenSmsGateway(index, row) {
        API_SmsGateway.openSmsGatewayById(row.id).then(response => {
          this.$message.success('开启成功！')
          this.GET_SmsGatewayList()
        }).catch(error => console.log(error))
      },

      /** 获取短信网关列表 */
      GET_SmsGatewayList() {
        this.loading = true
        API_SmsGateway.getSmsGatewayList(this.params).then(response => {
          this.loading = false
          this.tableData = response
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
