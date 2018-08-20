<template>
  <div>
    <en-table-layout
      pagination
      :tableData="tableData"
      :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns"></div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent"  placeholder="请输入会员名称" />
        </div>
      </div>
      <template slot="table-columns">
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              circle
              @click="handleOperateSee(scope.row)"></el-button>
          </template>
        </el-table-column>
        <!--姓名-->
        <el-table-column prop="sn" label="姓名"/>
        <!--人数-->
        <el-table-column prop="start_time" :formatter="MixinUnixToDate" label="人数"/>
        <!--销售金额-->
        <el-table-column label="销售金额">
          <template slot-scope="scope">{{ scope.row.push_money | unitPrice('￥') }}</template>
        </el-table-column>
        <!--利润额-->
        <el-table-column label="利润额">
          <template slot-scope="scope">{{ scope.row.push_money | unitPrice('￥') }}</template>
        </el-table-column>
        <!--订单数	-->
        <el-table-column prop="order_count" label="订单数	"/>
        <!--提成模板	-->
        <el-table-column prop="order_count" label="提成模板	"/>
        <!--注册时间-->
        <el-table-column prop="start_time" :formatter="MixinUnixToDate" label="注册时间"/>
        <!--修改模式-->
        <el-table-column label="修改模式" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleOperateSee(scope.row)">修改模式</el-button>
          </template>
        </el-table-column>
        <!--营业额统计-->
        <el-table-column label="营业额统计" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleOperateSee(scope.row)">营业额统计</el-button>
          </template>
        </el-table-column>
        <!--利润额统计-->
        <el-table-column label="利润额统计" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleOperateSee(scope.row)">利润额统计</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-table-layout>
  </div>
</template>

<script>
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'distributor-list',
    data() {
      return {
        // 列表loading状态
        loading: false,

        // 列表参数
        params: {
          page_no: 1,
          page_size: 10
        },
        // 列表数据
        tableData: [],

        pageData: []
      }
    },
    mounted() {
      this.GET_AchievementList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_AchievementList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_AchievementList()
      },

      /** 获取个人分销商列表 */
      GET_AchievementList() {
        this.loading = true
        API_distribution.getAchievementList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 查看 */
      handleOperateSee() {

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
    padding: 0 20px;
  }
</style>




