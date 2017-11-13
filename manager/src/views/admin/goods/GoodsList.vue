<template>
  <div class="container" v-loading="loading">
    <el-table
      :data="tableData"
      height="100%"
      border
      stripe
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%; height: calc(100% - 42px)">
      <el-table-column label="商品图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.image" class="goods-image"/>
        </template>
      </el-table-column>
      <el-table-column prop="sn" label="商品编号" width="180"> </el-table-column>
      <el-table-column prop="seller_name" label="店铺名称"> </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        align="left"
        width="450"
      ></el-table-column>
      <el-table-column prop="category_name" label="商品分类"> </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"> </el-table-column>
      <el-table-column
        prop="market_enable"
        label="上架状态"
        width="80"
        :formatter="marketStatus"
      ></el-table-column>
      <el-table-column prop="brand_name" label="品牌"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.market_enable === 0"
            @click="handleWithdraw(scope.$index, scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        v-if="pageData"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import GoodsListModel from './GoodsList.model'
  const goodsListModel = new GoodsListModel()
  export default {
    name: 'GoodsList',
    mounted() {
      this.GET_GoodsList()
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

        /** 列表分页数据 */
        pageData: null,

        /** 列表数据状态 */
        tableData: null
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GoodsList()
      },
      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsList()
      },

      /** 下架操作确认 */
      handleWithdraw(index, row) {
        this.$confirm('确认下架吗？', '提示')
          .then(() => this.DELETE_Goods(row.id))
          .catch(() => {})
      },

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 获取商品列表 */
      GET_GoodsList() {
        this.loading = true
        this.$http.get(`goods/list${this.$Foundation.sequence.get(this.params)}`, { loading: false })
          .then(response => response.data)
          .then(data => {
            this.loading = false
            this.pageData = {
              page_no: data.page_no,
              page_size: data.page_size,
              data_total: data.data_total_count
            }
            this.tableData = goodsListModel.map(data.data)
          })
      },
      /** 下架商品 */
      DELETE_Goods(id) {
        this.$http.delete(`goods/${id}`)
          .then(() => {
            this.GET_GoodsList()
            this.$message.success('下架商品成功！')
          })
          .catch(() => this.$message.error('下架商品出错，请稍后再试！'))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;

    .goods-image {
      width: 55px;
      height: 55px;
    }
  }
  .page {
    height: 32px;
    padding: 5px 20px;
    text-align: right;
    background-color: #ffffff;
  }
</style>
