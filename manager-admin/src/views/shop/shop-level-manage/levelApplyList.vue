<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      :tableData="tableData.data"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="shop_id" label="店铺ID"/>
        <el-table-column prop="shop_name" label="店铺名称"/>
        <el-table-column prop="member_name" label="会员名称"/>
        <el-table-column label="店铺状态">
          <template slot-scope="scope">{{ scope.row.shop_status | statusFilter }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handlePassApply(scope.$index, scope.row)">通过</el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleRejectApply(scope.$index, scope.row)">拒绝</el-button>
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
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'

  export default {
    name: 'levelApplyList',
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
        tableData: ''
      }
    },
    mounted() {
      this.GET_ShopLevelApplyList()
    },
    filters: {
      statusFilter(val) {
        switch (val) {
          case 'refused': return '审核未通过'
          case 'apply': return '待审核'
          case 'open': return '开启中'
          case 'closed': return '已关闭'
          default: return '未知状态'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ShopLevelApplyList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ShopLevelApplyList()
      },

      /** 通过申请 */
      handlePassApply(index, row) {
        this.$confirm('确定要通过申请吗？', '提示', { type: 'warning' }).then(() => {
          API_Shop.auditShopLevelApply(row.shop_id, 0).then(response => {
            this.$message.success('申请已通过！')
            this.GET_ShopLevelApplyList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 拒绝申请 */
      handleRejectApply(index, row) {
        this.$confirm('确定要拒绝申请吗？', '提示', { type: 'warning' }).then(() => {
          API_Shop.auditShopLevelApply(row.shop_id, 2).then(response => {
            this.$message.success('申请已拒绝！')
            this.GET_ShopLevelApplyList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 获取店铺等级申请列表 */
      GET_ShopLevelApplyList() {
        this.loading = true
        API_Shop.getShopLevelApplyList(this.params).then(response => {
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
