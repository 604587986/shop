<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="group_buy_name" label="团购名称"/>
        <el-table-column prop="name" label="活动名称"/>
        <el-table-column prop="shop_name" label="店铺名称"/>
        <el-table-column label="活动开始时间">
          <template slot-scope="scope">{{ scope.row.start_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="活动结束时间">
          <template slot-scope="scope">{{ scope.row.end_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="团购活动状态" width="120">
          <template slot-scope="scope">{{ scope.row.group_buy_status }}</template>
        </el-table-column>
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
  import * as API_GroupBuy from '@/api/groupBuy'
  import { TableLayout, TableSearch } from '@/components'
  export default {
    name: 'groupBuyGoods',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          actid: this.$route.params.id
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null
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
        // this.$router.push({ path: `/promotions/group-buy-manage/group-buy-goods-info/${row.id}` })
        this.$router.push({ name: 'groupBuyGoodsInfo', params: row })
      },

      /** 获取团购活动详情商品列表 */
      GET_GroupBuyGoodsList() {
        this.loading = true
        API_GroupBuy.getGroupBuyGoodsList(this.params).then(response => {
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
