<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
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
            <span>{{ scope.row.start_time | unixToDate}}</span>
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
              type="primary"
              v-if="scope.row.is_signed === 0"
              @click="handleSignUpTimeLimt(scope.row)">报名
            </el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.is_signed === 1"
              @click="activityGoodsInfo(scope.row)">已报名
            </el-button>
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
      this.GET_ActivityList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ActivityList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ActivityList()
      },

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
        API_activity.getActivityList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 报名 */
      handleSignUpTimeLimt(row) {
        this.$router.push({ path: 'add-time-limit', query: { row }})
      },

      /** 活动商品信息*/
      activityGoodsInfo(row) {
        this.$router.push({ path: '/promotions/activity-goods-data' })
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
