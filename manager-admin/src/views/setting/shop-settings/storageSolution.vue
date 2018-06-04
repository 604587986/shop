<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      pagination
      :tableData="tableData.data"
      :loading="loading"
    >
      <!--<div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddStorageSolution">添加</el-button>
        </div>
      </div>-->
      <template slot="table-columns">
        <el-table-column prop="name" label="储存方案名称"/>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            {{ scope.row.is_open === 1 ? '已开启' : '已关闭' }}
            <el-button v-if="scope.row.is_open === 0" type="text" @click="handleOpenStorageSolution(scope.$index, scope.row)">开启</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditStorageSolution(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        slot="pagination"
        v-if="tableData"
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
      :title="'修改储存方案 - ' + storageForm.name"
      :visible.sync="dialogStorageVisible"
      width="35%"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="storageForm" :rules="storageRules" ref="storageForm" label-width="140px">
        <template v-for="(config, index) in storageForm.configItems">
          <el-form-item :label="config.text">
            <el-input placeholder="请输入内容" v-model="config.value" clearable/>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogStorageVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitStorageForm('storageForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_StorageSolution from '@/api/storageSolution'

  export default {
    name: 'storageSolution',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },
        tableData: '',

        /** 修改储存方案 表单*/
        storageForm: '',
        /** 修改储存方案 表单规则 */
        storageRules: {},
        /** 修改储存方案 dialog */
        dialogStorageVisible: false
      }
    },
    mounted() {
      this.GET_StorageSolutiontList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_StorageSolutiontList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_StorageSolutiontList()
      },

      /** 添加储存方案 */
      handleAddStorageSolution() {},

      /** 开启储存方案 */
      handleOpenStorageSolution(index, row) {
        API_StorageSolution.openStorageSolutionById(row.id).then(response => {
          this.$message.success('开启成功！')
          this.GET_StorageSolutiontList()
        })
      },

      /** 修改储存方案 */
      handleEditStorageSolution(index, row) {
        this.storageForm = this.MixinClone(row)
        this.dialogStorageVisible = true
      },

      /** 修改储存方案 提交表单 */
      submitStorageForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_StorageSolution.editStorageSolution(this.storageForm.id, this.storageForm).then(response => {
              this.dialogStorageVisible = false
              this.GET_StorageSolutiontList()
              this.$message.success('修改成功！')
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取储存方案列表 */
      GET_StorageSolutiontList() {
        this.loading = true
        API_StorageSolution.getStorageSolutionList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => (this.loading = false))
      }
    }
  }
</script>
