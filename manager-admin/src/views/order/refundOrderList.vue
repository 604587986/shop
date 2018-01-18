<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            advancedWidth="465"
            placeholder="请输入订单编号"
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="订单号">
                  <el-input size="medium" v-model="advancedForm.order_sn" clearable></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                  <el-input size="medium" v-model="advancedForm.ship_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="买家名字">
                  <el-input size="medium" v-model="advancedForm.buyer_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="下单日期">
                </el-form-item>
                <el-form-item label="订单状态">
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--退款ID-->
        <el-table-column prop="id" label="售后ID"/>
        <!--售后单号-->
        <el-table-column prop="sn" label="售后单号"/>
        <!--店铺名称-->
        <el-table-column prop="seller_name" label="店铺名称"/>
        <!--申请售后类型-->
        <el-table-column label="申请售后类型">
          <template slot-scope="scope">{{ scope.row.refuse_type | refuseTypeFilter }}</template>
        </el-table-column>
        <!--售后状态-->
        <el-table-column prop="refund_status_text" label="售后状态"/>
        <!--创建时间-->
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <!--申请金额-->
        <el-table-column label="申请金额">
          <template slot-scope="scope">{{ scope.row.refund_price | unitPrice('￥') }}</template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleOperateOrder(scope.$index, scope.row)">操作</el-button>
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
  import * as API_refundOrder from '@/api/refundOrder'
  import { TableLayout, TableSearch, CategoryPick } from '@/components'
  export default {
    name: 'refundOrderList',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPick.name]: CategoryPick
    },
    mounted() {
      this.GET_RefundOrder()
    },
    filters: {
      refuseTypeFilter(val) {
        return val === 'return_money' ? '退款' : '退货'
      }
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

        /** 高级搜索数据 */
        advancedForm: {}
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RefundOrder()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RefundOrder()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_RefundOrder()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {},

      /** 操作订单 */
      handleOperateOrder(index, row) {
        // this.$router.push({ path: `/order/detail/${row.sn}` })
      },

      /** 获取退款单列表数据 */
      GET_RefundOrder() {
        this.loading = true
        API_refundOrder.getRefundList(this.params).then(response => {
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
