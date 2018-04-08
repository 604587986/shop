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
          <el-button-group>
            <el-button @click="inWarehouse" autofocus>仓库中的商品</el-button>
            <el-button @click="selling">出售中的商品</el-button>
          </el-button-group>
          <el-button @click="publishGoods" type="success">发布商品</el-button>
          <el-button @click="gotoRecycle" type="primary">回收站</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                  <el-input size="medium" v-model="advancedForm.goods_sn"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name"></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                  <en-category-picker @changed="categoryChanged"/>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.image" class="goods-image"/>
          </template>
        </el-table-column>
        <el-table-column prop="sn" label="商品编号" width="180"/>
        <el-table-column prop="seller_name" label="店铺名称" width="120"/>
        <el-table-column prop="name" label="商品名称" align="left" width="450"/>
        <el-table-column prop="category_name" label="商品分类"/>
        <el-table-column label="商品价格" width="120">
          <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column prop="market_enable" label="上架状态" width="80" :formatter="marketStatus"/>
        <el-table-column prop="brand_name" label="品牌"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditGoods(scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteGoods(scope.row)">删除
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleStockGoods(scope.row)">库存
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
    <el-dialog title="库存编辑" :visible.sync="goodsStockshow" width="30%">
      <el-form :model="goodsStockData" v-if="goodsStocknums === 1 ">
        <el-form-item label="库存">
          <el-input auto-complete="off" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="待发货数">
          <el-input auto-complete="off" disabled label-width="100"></el-input>
        </el-form-item>
      </el-form>
      <en-tabel-layout :tableData="goodsStockData" :loading="loading" v-if="goodsStocknums != 1">
        <template slot="table-columns">
          <el-table-column prop="name" label="商品名称"/>
          <el-table-column label="库存" width="120">
            <template slot-scope="scope">
              <el-input auto-complete="off" label-width="100"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="待发货数" width="120"></el-table-column>
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
  import * as API_goods from '@/api/goods'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'goodsList',
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
          page_size: 10,
          goods_status: 0
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
        },

        /** 商品库存显示*/
        goodsStockshow: false,

        /** 库存商品数量*/
        goodsStocknums: 1,

        /** 商品库存列表数据*/
        goodsStockData: null
      }
    },
    mounted() {
      if (this.$route.query) {
        this.params.goods_status = this.$route.query.goodsStatus
      }
      this.GET_GoodsList()
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

      /** 单个商品下架操作确认 */
      handleWithdraw(index, row) {
        this.$confirm('确认下架吗？', '提示')
          .then(() => this.DELETE_Goods(row.id))
          .catch(() => {
          })
      },

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          goods_status: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_GoodsList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.keyword
        this.GET_GoodsList()
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
        this.advancedForm.category_id = data.category_id
      },

      GET_GoodsList() {
        this.loading = true
        API_goods.getGoodsList(this.params).then(response => {
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
      /** 仓库中的商品 */
      inWarehouse() {
        this.params.goods_status = 0
        this.GET_GoodsList()
      },
      /** 出售中的商品 */
      selling() {
        this.params.goods_status = 1
        this.GET_GoodsList()
      },
      /** 发布商品*/
      publishGoods() {
        this.$router.push({ path: '/goods/good-publish' })
      },

      /** 跳转回收站*/
      gotoRecycle() {
        this.$router.push({ path: '/goods/recycle-station' })
      },
      /** 编辑商品 */
      handleEditGoods(row) {
        this.$router.push({ path: '/goods/good-publish', query: { goodsid: row.id }})
      },
      /** 删除商品 */
      handleDeleteGoods(row) {
        this.$confirm('确认删除此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = [row.id]
          API_goods.deleteGoods(ids).then(() => {
            this.GET_GoodsList()
            this.$message.success('删除商品成功！')
          }).catch(() => this.$message.error('删除商品出错，请稍后再试！'))
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      },
      /** 库存 */
      handleStockGoods() {
        this.goodsStockshow = true
        API_goods.getGoodsStockList().then((response) => {
          this.goodsStocknums = response.data.length
          this.goodsStockData = response.data.length === 1 ? response.data[0] : response.data
        }).catch(() => this.$message.error('请求库存数据出错，请稍后再试！'))
      },
      /** 保存库存商品 */
      reserveStockGoods() {
        API_goods.reserveStockGoods().then((response) => {
          this.goodsStockshow = false
          this.$message.success('库存商品保存成功')
        }).catch(() => this.$message.error('库存商品保存出错，请稍后再试！'))
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
