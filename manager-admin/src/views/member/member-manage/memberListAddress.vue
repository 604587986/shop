<template>
  <div>
    <en-tabel-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="sn" label="收货人"/>
        <el-table-column prop="name" label="所在地区"></el-table-column>
        <el-table-column prop="address" label="详细地址"></el-table-column>
        <el-table-column prop="address" label="手机号码"></el-table-column>
        <el-table-column prop="address" label="默认"></el-table-column>
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
  import * as API_Member from '@/api/member'

  export default {
    name: 'memberListAddress',
    props: ['member-id'],
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
      this.GET_MemberListAddress()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_MemberList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_MemberList()
      },

      /** 获取会员列表 */
      GET_MemberListAddress() {
        this.loading = true
        API_Member.getMemberAddress(this.memberId, this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
