<template>
  <en-table-layout
    :tableData="tableData.data"
    :loading="loading"
  >
    <template slot="table-columns">
      <el-table-column prop="gb_name" label="团购名称"/>
      <el-table-column prop="gb_title" label="活动标题"/>
      <el-table-column prop="goods_name" label="商品名称"/>
      <el-table-column label="活动开始时间">
        <template slot-scope="scope">{{ scope.row.start_time | unixToDate }}</template>
      </el-table-column>
      <el-table-column label="活动结束时间">
        <template slot-scope="scope">{{ scope.row.end_time | unixToDate }}</template>
      </el-table-column>
      <el-table-column prop="gb_status_text" label="团购活动状态"/>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleViewMember(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </template>

    <el-pagination
      v-if="tableData"
      slot="pagination"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      :current-page="params.page_no"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.data_total">
    </el-pagination>
  </en-table-layout>
</template>

<script>
  import * as API_Promotion from '@/api/promotion'

  export default {
    name: 'groupBuyGoods',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          act_id: this.$route.params.id
        },

        /** 列表数据 */
        tableData: ''
      }
    },
    mounted() {
      this.GET_GroupBuyGoodsList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GroupBuyGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GroupBuyGoodsList()
      },

      /** 查看详情 */
      handleViewMember(index, row) {
        this.$router.push({ path: `/promotions/group-buy-manage/group-buy-goods-info/${row.gb_id}` })
        // this.$router.push({ name: 'groupBuyGoodsInfo', params: row })
      },

      /** 获取团购活动详情商品列表 */
      GET_GroupBuyGoodsList() {
        this.loading = true
        API_Promotion.getGroupBuyGoods(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
