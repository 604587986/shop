<template>
  <en-tabel-layout
    :toolbar="false"
    pagination
    :tableData="tableData"
    :loading="loading"
  >
    <template slot="table-columns">
      <el-table-column prop="goods_name" label="商品名称" min-width="450"/>
      <el-table-column prop="shop_name" label="店铺名称"/>
      <el-table-column label="活动价格">
        <template slot-scope="scope">{{ scope.row.seckill_price | unitPrice("￥") }}</template>
      </el-table-column>
      <el-table-column prop="seckill_quantity" label="售空数量" width="100"/>
      <el-table-column label="抢购时刻" width="100">
        <template slot-scope="scope">{{ scope.row.time_line < 10 ? '0' + scope.row.time_line : scope.row.time_line }} : 00</template>
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
</template>

<script>
  import * as API_Seckill from '@/api/seckill'

  export default {
    name: 'seckillPassGoodsList',
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
      this.GET_SeckillPassGoodsList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SeckillPassGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SeckillPassGoodsList()
      },

      /** 获取待审核商品列表 */
      GET_SeckillPassGoodsList() {
        this.loading = true
        API_Seckill.getPassGoodsList(this.$route.params.id).then(response => {
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
