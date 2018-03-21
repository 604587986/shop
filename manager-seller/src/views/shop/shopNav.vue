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
          <el-button @click="addShopNav" type="success">新增</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="sn" label="排序" width="180"/>
        <el-table-column prop="seller_name" label="导航名称" width="120"/>
        <el-table-column prop="name" label="是否显示" align="left" width="450">
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditShopNav(scope.row)">编辑</el-button>
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
    <el-dialog title="库存编辑" :visible.sync="goodsStockshow" width="30%">
      <el-form :model="goodsStockData" v-if="goodsStocknums === 1 ">
        <el-form-item label="库存">
          <el-input  auto-complete="off" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="发货数">
          <el-input  auto-complete="off" label-width="100"></el-input>
          <el-input  auto-complete="off" label-width="100"></el-input>
        </el-form-item>
      </el-form>
      <en-tabel-layout :tableData="goodsStockData" :loading="loading" v-if="goodsStocknums != 1">
        <template slot="table-columns">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column label="库存" width="120">
            <template slot-scope="scope">
              <el-input  auto-complete="off" label-width="100"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="发货数" width="120">
            <template slot-scope="scope">
              <el-input  auto-complete="off" label-width="100"></el-input>
            </template>
          </el-table-column>
        </template>
      </en-tabel-layout>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsStockshow = false">取 消</el-button>
        <el-button type="primary" @click="reserveStockGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'shopNav',
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
        params: { },

        /* 新增导航表单**/
        navform: { }
      }
    },
    mounted() {
      this.GET_ShopNavList()
    },
    methods: {
      GET_ShopNavList() {
        this.loading = true
        API_Shop.getShopNavList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 编辑导航 */
      handleEditShopNav() {

      },

      /** 新增导航*/
      addShopNav() {
        API_Shop.addShopNav(this.navform).then(response => {

        }).catch(error => { console.log(error) })
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

  .toolbar-btns {

  }
  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>

