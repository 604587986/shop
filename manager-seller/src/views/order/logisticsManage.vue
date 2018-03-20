<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="快递模板" name="express">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <div slot="toolbar" class="inner-toolbar">
            <div class="toolbar-btns">
              <el-button type="success" @click="handleAddMould">新增模板</el-button>
            </div>
          </div>
          <template slot="table-columns">
            <!--模板名称-->
            <el-table-column prop="" label="模板名称"/>
            <!--首重（kg）-->
            <el-table-column prop="" label="首重（kg）"/>
            <!--运费（元）-->
            <el-table-column prop="sn" label="运费（元）"/>
            <!--续重（kg）-->
            <el-table-column label="续重（kg）"/>
            <!--运费（元）-->
            <el-table-column prop="receipt_type" label="运费（元）"/>
            <!--模板类型-->
            <el-table-column prop="receipt_type" label="模板类型"/>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleEditMould(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDeleteMould(scope.$index, scope.row)">删除</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="新增模板" name="add">配置管理</el-tab-pane>
      <el-tab-pane label="物流公司" name="logistics">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="logisticsTableData"
          :loading="loading"
        >
          <template slot="table-columns">
            <!--模板名称-->
            <el-table-column prop="logistics_name" label="物流公司"/>
            <!--首重（kg）-->
            <el-table-column label="公司状态">
              <template slot-scope="scope">
                <span v-if="scope.row.logistics_status == 0">未选择</span>
                <span v-if="scope.row.logistics_status == 1" class="company-choosed">已选择</span>
              </template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  v-if="scope.row.logistics_status == 0"
                  @click="handleLogisticsSwitch(scope.row)">开启</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-if="scope.row.logistics_status == 1"
                  @click="handleLogisticsSwitch(scope.row)">关闭</el-button>
              </template>
            </el-table-column>
          </template>
        </en-tabel-layout>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_order from '@/api/order'
  import * as API_logistics from '@/api/expressCompany'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'logisticsManage',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 当前面板的名字*/
        activeName: 'express',

        /** 列表loading状态 */
        loading: false,

        /** 快递模板列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 快递模板列表数据 */
        tableData: null,

        /** 快递模板列表分页数据 */
        pageData: null,

        /** 新增模板表单信息*/
        MouldForm: {

        },

        /** 物流公司列表参数 */
        logisticsParams: {},

        /** 物流公司列表数据 */
        logisticsTableData: null
      }
    },
    mounted() {
      this.GET_ExpressMould()
    },
    methods: {
      /** 切换*/
      handleToggleClick(tab, event) {
        this.activeName = tab.name
        if (this.activeName === 'express') {
          this.GET_ExpressMould()
        } else if (this.activeName === 'add') {
        } else if (this.activeName === 'logistics') {
          this.GET_logisticsList()
        }
      },
      /** 快递模板分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ReceiptHistory()
      },

      /** 快递模板分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ReceiptHistory()
      },

      /** 获取快递模板信息*/
      GET_ExpressMould() {

      },

      /** 编辑模板*/
      handleEditMould() {

      },

      /** 删除模板*/
      handleDeleteMould() {

      },
      /** 新增模板 */
      handleAddMould() {
        this.activeName = 'add'
      },

      /** 保存模板 */
      saveMould() {

      },

      /** 获取物流公司信息*/
      GET_logisticsList() {
        this.loading = true
        API_logistics.getExpressCompanyList(this.logisticsParams).then(response => {
          this.loading = false
          this.logisticsTableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 物流公司信息开启 /关闭 */
      handleLogisticsSwitch(row) {
        const _tip = row.logistics_status === 1 ? '关闭' : '开启'
        this.$confirm(`确定要${_tip}么?`, '确认信息')
          .then(() => this.switchLogistics(row))
          .catch(() => {})
      },
      switchLogistics(row) {
        const _tip = row.logistics_status === 1 ? '关闭' : '开启'
        API_logistics.switchExpressPower(row.logistics_id, row).then(response => {
          this.$message.success(`${_tip}成功`)
          this.GET_logisticsList()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .company-choosed{
    font-weight: bold;
    color: #e90101;
  }
</style>

