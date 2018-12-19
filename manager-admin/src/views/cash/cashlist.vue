<template>
  <en-table-layout
    :tableData="tableData.data"
    :loading="loading"
  >
    <!-- <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns"></div>
      <div class="toolbar-search">
        <en-table-search
          @search="searchEvent"
          @advancedSearch="advancedSearchEvent"
          advanced
        >
          <template slot="advanced-content">
            <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
              <el-form-item label="商品名称">
                <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input size="medium" v-model="advancedForm.goods_sn" clearable></el-input>
              </el-form-item>
              <el-form-item label="店铺名称">
                <el-input size="medium" v-model="advancedForm.seller_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="商品类别">
                <en-category-picker @changed="categoryChanged"/>
              </el-form-item>
            </el-form>
          </template>
        </en-table-search>
      </div>
    </div> -->

    <template slot="table-columns">
      <el-table-column prop="member_code" label="用户账号" width=""/>
      <el-table-column prop="member_name" label="会员名称" width=""/>
      <el-table-column prop="assistance_money" label="余额" width=""/>
      <el-table-column prop="assistance_money" label="提现金额" width=""/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="">提现</el-button>
        </template>
      </el-table-column>
    </template>

    <el-pagination
      v-if="tableData"
      slot="pagination"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      :current-page="tableData.page_no"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="tableData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.data_total">
    </el-pagination>
  </en-table-layout>
</template>

<script>
/* eslint-disable */
  import * as API_lineup from '@/api/lineup'

  export default {
    name: 'cashList',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 商品列表数据 */
        tableData: '',

        /** 高级搜索数据 */
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          seller_name: '',
          category_path: ''
        }
      }
    },
    mounted() {
      this.GET_CashList()
    },
    activated() {
      this.GET_CashList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_CashList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_CashList()
      },


      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.params.page_no = 1
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_CashList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.keyword
        this.params.page_no = 1
        this.GET_CashList()
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
        this.advancedForm.category_path = data.category_path || ''
      },

      GET_CashList() {
        // this.loading = true
        // API_lineup.getLineupList(this.params).then(response => {
        //   this.loading = false
        //   this.tableData = response
        // }).catch(() => (this.loading = false))
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

  .goods-image {
    width: 50px;
    height: 50px;
  }
  .goods_name {
    color: #4183c4;
    &:hover {
      color: #f42424;
    }
  }
</style>
