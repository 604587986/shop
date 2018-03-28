<template>
  <div>
    <en-tabel-layout
      toolbar
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns"></div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent"></en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="activity_name" label="活动名称"/>
        <el-table-column label="活动时间">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time | unixToDate}} 至 {{ scope.row.end_time | unixToDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名截止时间">
          <template slot-scope="scope">
            <span>{{ scope.row.sign_end_time | unixToDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名条件">
          <template slot-scope="scope">
            <span>{{ scope.row.sign_condition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditTimeLimt(scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteTimeLimit(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_activity from '@/api/activity'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'timeLimit',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {},

        /** 列表数据 */
        tableData: null
      }
    },
    mounted() {
      this.GET_ActivityList()
    },
    methods: {
      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params
        }
        this.GET_ActivityList()
      },

      /** 获取活动信息*/
      GET_ActivityList() {
        this.loading = true
        API_activity.getActivityModelList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 删除满减优惠 */
      handleDeleteTimeLimit(row) {
        this.$confirm('确认删除当前项？', '确认信息')
          .then(() => this.toDelActivity(row))
          .catch(() => {
          })
      },

      /** 执行删除*/
      toDelActivity(row) {
        API_activity.DeleteFullCut(row.activity_id, row).then(() => {
          this.$message.success('删除成功！')
          this.GET_ActivityList()
        }).catch(error => {
          console.log(error)
          this.$message.error('删除失败，请稍后再试！')
        })
      },

      /** 编辑此活动 */
      handleEditTimeLimt() {

      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-btns {

  }

  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>
