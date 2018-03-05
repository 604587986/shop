<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="true"
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="email" label="电子邮箱"/>
        <el-table-column label="注册时间">
          <template slot-scope="scope">{{ scope.row.register_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="上次登录时间">
          <template slot-scope="scope">{{ scope.row.last_login_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column prop="login_count_tm" label="本月登录次数"/>
        <el-table-column prop="sex" label="性别" :formatter="formatterSex"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleRecoverMember(scope.$index, scope.row)">恢复</el-button>
          </template>
        </el-table-column>
      </template>

      <template slot="pagination-toolbar">
        <el-button type="primary" size="mini" @click="recoverMembers">恢复选中</el-button>
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
  import * as API_Member from '@/api/member'
  import { TableLayout } from '@/components'
  export default {
    name: 'memberRecycle',
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
        pageData: null,

        /** 被选数据 */
        selectedData: []
      }
    },
    mounted() {
      this.GET_RecycleMemberList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RecycleMemberList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RecycleMemberList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 恢复会员操作 */
      handleRecoverMember(index, row) {
        this.$confirm('确定要恢复这个会员吗？', '提示', { type: 'warning' }).then(() => {
          this.POST_RecycleMember(row.id)
        }).catch(() => {})
      },

      /** 批量恢复会员操作 */
      recoverMembers() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何会员！')
        } else {
          this.$confirm('确定要恢复这些会员吗？', '提示', { type: 'warning' }).then(() => {
            this.POST_RecycleMember(this.selectedData)
          }).catch(() => {})
        }
      },

      /** 性别格式化 */
      formatterSex(row, column, cellValue) {
        return row.sex === 1 ? '男' : '女'
      },

      /** 获取回收站会员列表 */
      GET_RecycleMemberList() {
        this.loading = true
        API_Member.getRecycleMemberList(this.params).then(response => {
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
      },

      /** 恢复会员 */
      POST_RecycleMember(ids) {
        API_Member.recycleMember(ids).then(response => {
          this.$message.success('会员恢复成功！')
          this.GET_RecycleMemberList()
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
