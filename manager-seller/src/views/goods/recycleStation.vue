<template>
  <en-tabel-layout
    toolbar
    pagination
    :tableData="tableData"
    :loading="loading"
    :selectionChange="selectionChange"
  >
    <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns">
        <el-button
          size="mini"
          type="danger"
          :disabled="selectionids.length === 0"
          @click="handleDeleteRecycles()">批量删除
        </el-button>
        <el-button
          size="mini"
          type="success"
          :disabled="selectionids.length === 0"
          @click="handlReductionRecycles()">批量还原
        </el-button>
      </div>
      <div class="toolbar-search">
        <en-table-search @search="searchEvent"/>
      </div>
    </div>

    <template slot="table-columns">
      <el-table-column type="selection"/>
      <el-table-column label="图片" >
        <template slot-scope="scope">
          <img :src="scope.row.goods_image" class="goods-image"/>
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="名称" align="left" />
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handlReductionRecycle(scope.row)">还原
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteRecycle(scope.$index, scope.row)">删除
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
</template>

<script>
  import * as API_goods from '@/api/goods'
  import { CategoryPicker } from '@/components'

  export default {
    name: 'recycleStation',
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
          /** 表示回收站商品 */
          disabled: 0
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 已选择的回收站商品 */
        selectionids: []
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.GET_RecycleGoodsList()
        next()
      })
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RecycleGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RecycleGoodsList()
      },

      /** 单个商品彻底删除操作确认 */
      handleDeleteRecycle(index, row) {
        this.$confirm('确认彻底删除吗？', '提示')
          .then(() => this.DELETE_Recycles(row.goods_id))
          .catch(() => {
          })
      },

      /** 批量删除 */
      handleDeleteRecycles() {
        this.selectionids.length !== 0 && this.DELETE_Recycles(this.selectionids)
      },

      /**  回收站单个商品还原 */
      handlReductionRecycle(row) {
        this.$confirm('确认还原吗？', '提示')
          .then(() => this.ReductionGoods(row.goods_id))
          .catch(() => {})
      },

      /** 批量还原 */
      handlReductionRecycles() {
        this.selectionids.length !== 0 && this.ReductionGoods(this.selectionids)
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_RecycleGoodsList()
      },

      GET_RecycleGoodsList() {
        this.loading = true
        API_goods.getRecycleGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },

      /** goods_id*/
      selectionChange(val) {
        this.selectionids = val.map(item => item.goods_id).toString()
      },

      /** 还原回收站商品*/
      ReductionGoods(ids) {
        API_goods.RecycleReductionGoods(ids, {}).then(response => {
          this.$message.success('还原成功')
          this.GET_RecycleGoodsList()
        })
      },

      /** 删除回收站商品 */
      DELETE_Recycles(ids) {
        const _ids = ids.toString()
        API_goods.RecycleDeleteGoods(_ids, {}).then(() => {
          this.GET_RecycleGoodsList()
          this.$message.success('删除商品成功！')
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
