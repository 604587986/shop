<template>
  <en-table-layout
    :toolbar="false"
    :tableData="tableData.data"
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
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handlePassGoods(scope.$index, scope.row)">通过</el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleRejectGoods(scope.$index, scope.row)">驳回</el-button>
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
  </en-table-layout>
</template>

<script>
  import * as API_Promotion from '@/api/promotion'

  export default {
    name: 'seckillAuditGoodsList',
    data() {
      return {
        // 列表loading状态
        loading: false,
        // 列表参数
        params: {
          page_no: 1,
          page_size: 10,
          status: 'APPLY',
          seckill_id: this.$route.params.id
        },
        // 列表数据
        tableData: ''
      }
    },
    mounted() {
      this.GET_SeckillAuditGoodsList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SeckillAuditGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SeckillAuditGoodsList()
      },

      /** 通过限时抢购商品 */
      handlePassGoods(index, row) {
        this.$confirm('确定要通过这个商品？', '提示', { type: 'warning' }).then(() => {
          // API_Seckill.passSeckillAuditGoods(row.apply_id).then(response => {
          //   this.$message.success('该商品已通过！')
          //   this.GET_SeckillAuditGoodsList()
          // }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 拒绝限时抢购商品 */
      handleRejectGoods(index, row) {
        // this.$confirm('确定要通过这个商品？', '提示', { type: 'warning' }).then(() => {
        //   this.$prompt('请输入拒绝原因', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     inputPattern: /.+/,
        //     inputErrorMessage: '请输入拒绝原因'
        //   }).then(({ value }) => {
        //     API_Seckill.passSeckillAuditGoods(row.apply_id, value).then(response => {
        //       this.$message.success('该商品已拒绝！')
        //       this.GET_SeckillAuditGoodsList()
        //     }).catch(error => console.log(error))
        //   }).catch(() => {})
        // }).catch(() => {})
      },

      /** 获取待审核商品列表 */
      GET_SeckillAuditGoodsList() {
        this.loading = true
        API_Promotion.getSeckillGoods(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
