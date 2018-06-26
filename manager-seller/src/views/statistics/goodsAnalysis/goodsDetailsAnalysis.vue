<template>
  <div class="bg-shop-summary">
    <en-table-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <div class="conditions">
            <span>店铺分组:</span>
            <en-category-picker size="mini" @changed="changeGoodsCateGory" :clearable='true'/>
          </div>
          <div class="conditions">
            <span>商品名称:</span>
            <el-input size="mini" v-model="advancedForm.goods_name"></el-input>
          </div>
        </div>
        <div class="toolbar-search"></div>
      </div>
      <template slot="table-columns">
        <!--商品名称-->
        <el-table-column prop="goods_name" label="商品名称"/>
        <!--价格-->
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_price }}</span>
          </template>
        </el-table-column>
        <!--近30天下单商品数-->
        <el-table-column prop="order_goods_num" sortable label="近30天下单商品数"/>
        <!--近30天下单金额-->
        <el-table-column prop="order_amount" sortable label="近30天下单金额"/>
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
  </div>
</template>

<script>
  import * as API_goodsDetailsStatistics from '@/api/goodsDetailsStatistics'
  import { CategoryPicker } from '@/components'

  export default {
    name: 'goodsDetails',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          category_id: 0
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 高级搜索数据 */
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          shop_name: '',
          category_id: ''
        }
      }
    },
    mounted() {
      this.GET_GoodsStatistics()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GoodsStatistics()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsStatistics()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          goods_status: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_GoodsStatistics()
      },

      /**  分类选择组件值发生改变 */
      categoryChanged(data) {
        this.advancedForm.category_id = data.category_id
      },

      GET_GoodsStatistics() {
        this.loading = true
        API_goodsDetailsStatistics.getGoodsStatisticsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.tableData = response.data
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
  }

  .toolbar-search {
    margin-right: 10px;
  }

  div.toolbar-btns {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    div {
      span {
        display: inline-block;
        font-size: 14px;
        color: #606266;
      }
    }
    .conditions {
      margin-right: 30px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      span {
        display: block;
        width: 90px;
      }
    }
  }

</style>

