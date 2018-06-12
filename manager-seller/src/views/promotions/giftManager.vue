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
          <el-button type="primary" @click="handelAddGifts">新增</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent" />
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="gift_name" label="赠品名称" />
        <el-table-column label="赠品图片" >
          <template slot-scope="scope">
            <img :src="scope.row.gift_image" class="goods-image" alt="">
          </template>
        </el-table-column>
        <el-table-column  label="赠品价格">
          <template slot-scope="scope">
            {{ scope.row.gift_price | unitPrice('￥') }}
          </template>
        </el-table-column>
        <el-table-column prop="gift_real_stock" label="实际库存" />
        <el-table-column prop="gift_usable_stock" label="可用库存" />
        <el-table-column prop="coupon_used_num" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.gift_price | unixToDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="handleEditGifts(scope.row)">修改
            </el-button>
            <el-button
              type="danger"
              @click="handleDeleteGifts(scope.row)">删除
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
    <add-gift
      :currentGiftId="currentGiftId"
      :giftModelShow="giftModelShow"
      @saveGift="saveGift"/>
  </div>
</template>

<script>
  import * as API_Gift from '@/api/gift'
  import { CategoryPicker } from '@/components'
  import { AddGift } from './components'

  export default {
    name: 'giftManager',
    components: {
      [CategoryPicker.name]: CategoryPicker,
      [AddGift.name]: AddGift
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

        /** 赠品弹框显示*/
        giftModelShow: false,

        /** 赠品编辑表单*/
        giftForm: {

          /** 赠品名称 */
          gift_name: '',

          /** 赠品图片 */
          gift_image: '',

          /** 赠品价格 */
          gift_price: 2,

          /** 实际库存 */
          gift_real_stock: 8,

          /** 可用库存 */
          gift_usable_stock: 2,

          /** 创建时间 */
          gift_creat_time: ''
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 当前赠品id */
        currentGiftId: ''
      }
    },
    mounted() {
      this.GET_GiftsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GiftsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GiftsList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_GiftsList()
      },

      /** 获取赠品列表*/
      GET_GiftsList() {
        this.loading = true
        API_Gift.getGiftsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        })
      },

      /** 删除赠品 */
      handleDeleteGifts(row) {
        this.$confirm('确认删除此赠品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API_Gift.deleteGifts(row.gift_id).then(() => {
            this.GET_GiftsList()
            this.$message.success('删除赠品成功！')
          })
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      },

      /** 修改*/
      handleEditGifts(row) {
        this.giftModelShow = true
        this.currentGiftId = row.gift_id
      },

      /** 新增赠品*/
      handelAddGifts() {
        this.giftModelShow = true
      },

      /** 保存结果 */
      saveGift(target) {
        this.giftModelShow = false
        target && this.GET_GiftsList()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

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

