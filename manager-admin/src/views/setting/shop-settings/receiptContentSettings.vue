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
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddReceiptContent">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="content" label="发票内容"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditReceiptContent(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteReceiptContent(scope.$index, scope.row)">删除</el-button>
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
  import * as API_Receipt from '@/api/receipt'
  import { TableLayout } from '@/components'
  export default {
    name: 'receiptContentSettings',
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
      this.GET_ReceiptContentList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ReceiptContentList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ReceiptContentList()
      },

      /** 添加发票内容 */
      handleAddReceiptContent() {
        this.$prompt('请输入发票内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输发票内容'
        }).then(({ value }) => {
          API_Receipt.addReceiptContent(value).then(response => {
            this.$message.success('添加成功！')
            this.GET_ReceiptContentList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 编辑发票内容 */
      handleEditReceiptContent(index, row) {
        this.$prompt('请输入发票内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.content,
          inputPattern: /.+/,
          inputErrorMessage: '请输发票内容'
        }).then(({ value }) => {
          if (value === row.content) return
          API_Receipt.editReceiptContent(row.id, value).then(response => {
            this.$message.success('修改成功！')
            this.GET_ReceiptContentList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 删除发票内容 */
      handleDeleteReceiptContent(index, row) {
        this.$confirm('确定要删除这个发票内容吗？', '提示', { type: 'warning' }).then(() => {
          API_Receipt.deleteReceiptContent(row.id).then(response => {
            this.$message.success('删除成功！')
            this.GET_ReceiptContentList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 获取发票内容列表 */
      GET_ReceiptContentList() {
        this.loading = true
        API_Receipt.getReceiptContentList(this.params).then(response => {
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
