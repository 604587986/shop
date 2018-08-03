<template>
  <div id="my-recommend">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li>
          <nuxt-link to="./my-recommend">我推荐的人</nuxt-link>
        </li>
      </ul>
    </div>
    <div>
      <div v-if="referee && referee.length > 0 ">
        <el-table :data="referee" style="width: 100%">
          <el-table-column label="会员" prop="name" align="center"/>
          <el-table-column label="TA的等级" prop="name" align="center"/>
          <el-table-column label="TA的推荐人数" prop="downline"  align="center"/>
          <el-table-column label="TA的返利" prop="rebate_total" align="center"/>
          <el-table-column label="TA的订单" align="center">
            <template slot-scope="scope">
              <el-button size="small" @click="lookDetails(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="member-pagination">
          <el-pagination
            @current-change="handleCurrentPageChange"
            :current-page.sync="pageData.page_no"
            :page-size="pageData.page_size"
            layout="total, prev, pager, next"
            :total="pageData.data_total">
          </el-pagination>
        </div>
      </div>
      <empty-member v-if="!referee || !referee.length">没有推荐人</empty-member>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Table, TableColumn, Pagination } from 'element-ui'
  Vue.use(Table).use(TableColumn).use(Pagination)
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'my-recommend',
    data() {
      return {
        /** 分页请求参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 分页信息 */
        pageData: {
          page_no: 1,
          page_size: 10,
          data_total: 0
        },

        /** 推荐人列表 */
        referee: []
      }
    },
    mounted() {
      this.GET_referee()
    },
    methods: {
      /** 获取推荐人 */
      GET_referee() {
        API_distribution.getRefereeList().then(response => {
          this.referee = response.data
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 当前页数发生改变 */
      handleCurrentPageChange(cur) {
        this.params.page_no = cur
        this.GET_referee()
      },

      /** 查看详情 */
      lookDetails(row) {
        this.$router.push({ path: '/member/distribution/my-performance', query: { member_id: row.id } })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
