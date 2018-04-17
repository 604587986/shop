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
          <!--商品状态 上架 下架-->
          <el-select v-model="marketEnable" placeholder="请选择商品状态" @change="changeGoodsStatus" clearable>
            <el-option key="0" label="未出售（已下架）" :value="0"/>
            <el-option key="1" label="出售中（已上架）" :value="1"/>
          </el-select>
          <!--商品分类 获取分类列表-->
          <en-category-picker @changed="changeGoodsCateGory" :clearable='true'/>
          <el-button @click="publishGoods" type="success">发布商品</el-button>
          <el-button @click="gotoRecycle" type="primary">回收站</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent" />
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.goods_image" class="goods-image"/>
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="名称" />
        <el-table-column label="价格">
          <template slot-scope="scope">{{ scope.row.goods_price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">{{ scope.row.quantity }}件</template>
        </el-table-column>
        <el-table-column label="可用库存">
          <template slot-scope="scope">{{ scope.row.enable_quantity }}件</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <el-table-column prop="market_enable" label="状态" width="80" :formatter="marketStatus"/>
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
        <el-form-item label="库存" prop="quantity">
          <!--v-model="goodsStockData.quantity"-->
          <el-input   auto-complete="off" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="待发货数">
          <!--v-model="goodsStockData.deliver_goods_quantity"-->
          <el-input  auto-complete="off" disabled label-width="100"></el-input>
        </el-form-item>
      </el-form>
      <en-tabel-layout :tableData="goodsStockData" :loading="loading" v-if="goodsStocknums != 1">
        <template slot="table-columns">
          <el-table-column prop="goods_name" label="商品名称"/>
          <el-table-column label="库存" width="120">
            <template slot-scope="scope">
              <!--v-model="scope.row.quantity"-->
              <el-input  auto-complete="off" label-width="100"></el-input>
            </template>
          </el-table-column>
          <!--prop="deliver_goods_quantity"-->
          <el-table-column  label="待发货数" width="120"></el-table-column>
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
  import { TableLayout, TableSearch, CategoryPicker, SkuSelector } from '@/components'

  export default {
    name: 'goodsList',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [SkuSelector.name]: SkuSelector
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

        /** 商品状态 是否上架 0代表已下架，1代表已上架 */
        marketEnable: 0,

        /** 当前商品分类*/
        categoryId: '',

        /** 当前商品id*/
        goodsId: '',

        /** 商品库存显示*/
        goodsStockshow: false,

        /** 库存商品数量*/
        goodsStocknums: 1,

        /** 商品库存列表数据*/
        goodsStockData: null
      }
    },
    mounted() {
      this.GET_GoodsList()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.query) {
          vm.goods_status = vm.params.goods_status = vm.$route.query.goods_status
        }
        vm.GET_GoodsList()
        next()
      })
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

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_GoodsList()
      },

      /** 切换上下架状态*/
      changeGoodsStatus(val) {
        delete this.params.market_enable
        if (val !== '') {
          this.params = {
            ...this.params,
            market_enable: val
          }
        }
        this.GET_GoodsList()
      },

      /** 切换分类*/
      changeGoodsCateGory(data) {
        delete this.params.category_path
        if (data !== '') {
          this.params = {
            ...this.params,
            category_path: data.category_id
          }
        }
        this.GET_GoodsList()
      },

      GET_GoodsList() {
        this.loading = true
        API_goods.getGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.tableData = response.data
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
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
        this.$router.push({ path: '/goods/good-publish', query: { goodsid: row.goods_id }})
      },

      /** 删除商品 */
      handleDeleteGoods(row) {
        this.$confirm('确认删除此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const _ids = [row.goods_id].toString()
          API_goods.deleteGoods(_ids).then(() => {
            this.GET_GoodsList()
            this.$message.success('删除商品成功！')
          }).catch(() => this.$message.error('删除商品出错，请稍后再试！'))
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      },

      /** 库存 */
      handleStockGoods(row) {
        this.goodsId = row.goods_id
        this.goodsStockshow = true
        API_goods.getGoodsStockList().then((response) => {
          this.goodsStocknums = response.data.length
          this.goodsStockData = response.data.length === 1 ? response.data[0] : response.data
        }).catch(() => this.$message.error('请求库存数据出错，请稍后再试！'))
      },

      /** 保存库存商品 */
      reserveStockGoods() {
        const _params = this.goodsStockData.map((elem) => {
          return {
            quantity_count: elem.quantity || 0,
            sku_id: 0
          }
        })
        API_goods.reserveStockGoods(this.goodsId, _params).then((response) => {
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
