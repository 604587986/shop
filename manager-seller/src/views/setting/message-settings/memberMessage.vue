<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="code" label="消息模板代码"/>
        <el-table-column prop="name" label="消息模板名称"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSiteMessage(scope.$index, scope.row)">站内信</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSmsMessage(scope.$index, scope.row)">短信</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEditEmailMessage(scope.$index, scope.row)">邮件</el-button>
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
  </div>
</template>

<script>
  import * as API_MessageSetting from '@/api/messageSetting'
  import { TableLayout } from '@/components'
  export default {
    name: 'memberMessage',
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
        tableData: null,

        /** 列表分页数据 */
        pageData: null
      }
    },
    mounted() {
      this.GET_MessageSettingList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_MessageSettingList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_MessageSettingList()
      },

      /** 设置站内信 */
      handleEditSiteMessage(index, row) {},
      /** 设置短信 */
      handleEditSmsMessage(index, row) {},
      /** 设置邮件 */
      handleEditEmailMessage(index, row) {},

      /** 获取短信网关列表 */
      GET_MessageSettingList() {
        this.loading = true
        API_MessageSetting.getMessageSettingList(2, this.params).then(response => {
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
