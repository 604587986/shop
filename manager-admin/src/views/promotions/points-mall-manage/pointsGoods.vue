<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.goods_image" :alt="scope.row.goods_name" class="goods-image">
          </template>
        </el-table-column>
        <el-table-column label="排序" width="150">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.order" controls-position="right" size="small" :min="0" :max="99999999"/>
          </template>
        </el-table-column>
        <el-table-column prop="goods_sn" label="商品编号"/>
        <el-table-column prop="shop_name" label="店铺名称"/>
        <el-table-column prop="goods_name" label="商品名称" width="400"/>
        <el-table-column prop="category_name" label="商品分类"/>
        <el-table-column label="商品价格">
          <template slot-scope="scope">{{ scope.row.goods_price | unitPrice("￥") }}</template>
        </el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">{{ scope.row.goods_status | statusFilter }}</template>
        </el-table-column>
        <el-table-column prop="brand_name" label="品牌名称"/>
      </template>

      <template slot="pagination-toolbar">
        <el-button type="primary" size="mini" @click="handleSaveOrder">保存排序</el-button>
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
  import * as API_PointGoods from '@/api/pointGoods'
  import { TableSearch } from '@/components'

  export default {
    name: 'pointsGoods',
    components: {
      [TableSearch.name]: TableSearch
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
      this.GET_PointGoodsList()
    },
    filters: {
      statusFilter(val) {
        switch (val) {
          case 0: return '已下架'
          case 1: return '售卖中'
          case 2: return '预览商品'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_PointGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_PointGoodsList()
      },

      /** 保存排序 */
      handleSaveOrder() {
      },

      /** 获取会员列表 */
      GET_PointGoodsList() {
        this.loading = true
        API_PointGoods.getPointGoodsList(this.params).then(response => {
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
  .goods-image {
    width: 50px;
    height: 50px;
  }
</style>
