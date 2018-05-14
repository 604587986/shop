<template>
  <div>
    <en-tabel-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <!--结算编号-->
        <el-table-column prop="sn" label="结算编号"/>
        <!--起止时间-->
        <el-table-column label="起止时间">
          <template slot-scope="scope">
            {{ scope.row.order_time | unixToDate }} - {{ scope.row.order_time | unixToDate }}
          </template>
        </el-table-column>
        <!--本期应收-->
        <el-table-column label="本期应收">
          <template slot-scope="scope">{{ scope.row.order_amount | unitPrice('￥') }}</template>
        </el-table-column>
        <!--结算状态-->
        <el-table-column prop="order_status_text" label="结算状态"/>
        <!--付款时间-->
        <el-table-column prop="pay_status_text" label="付款时间"/>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOperateOrder(scope.$index, scope.row)">查看详情
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
  import * as API_order from '@/api/order'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'settlementManage',
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
      this.GET_OrderList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_OrderList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_OrderList()
      },

      /** 查看详情 */
      handleOperateOrder(index, row) {
        /** 传递结算单号 */
        this.$router.push({ path: `/order/settlement-detail/${row.sn}` })
      },

      GET_OrderList() {
        this.loading = true
        API_order.getOrderList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
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

  .goods-image {
    width: 50px;
    height: 50px;
  }
</style>


