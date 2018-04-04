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
          <el-button type="success" @click="handelAddGifts">新增</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent" />
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="gift_name" label="赠品名称" />
        <el-table-column label="赠品图片" >
          <template slot-scope="scope">
            <img :src="scope.row.gift_image" alt="">
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
              size="mini"
              type="success"
              @click="handleEditGifts(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
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
    <el-dialog title="新增赠品" :visible.sync="giftShow" width="40%" align="center">
      <el-form :model="giftForm" label-position="right" label-width="160px">
        <el-form-item label="赠品名称">
          <el-input
            auto-complete="off"
            v-model="giftForm.gift_name"
            placeholder="不超过20个字"
            label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="赠品价格">
          <el-input auto-complete="off"  v-model="giftForm.gift_price" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="赠品库存">
          <el-input auto-complete="off"  v-model="giftForm.gift_usable_stock" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="赠品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giftShow = false">取 消</el-button>
        <el-button type="primary" @click="handleReserveGifts">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Gift from '@/api/gift'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'giftManager',
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
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 赠品弹框显示*/
        giftShow: false,

        /** 当前赠品id */
        currentGiftId: '',

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

        /** 存储上传的图片*/
        fileList: []
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
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 删除赠品 */
      handleDeleteGifts(row) {
        this.$confirm('确认删除此优惠券, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API_Gift.deleteGifts(row.gift_id, row).then(() => {
            this.GET_GiftsList()
            this.$message.success('删除赠品成功！')
          }).catch(() => this.$message.error('删除赠品出错，请稍后再试！'))
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      },

      /** 保存赠品*/
      handleReserveGifts() {
        if (this.currentGiftId) {
          // 更新
          API_Gift.saveGifts(this.currentGiftId, this.giftForm).then(() => {
            this.giftShow = false
            this.$message.success('保存成功！')
            this.GET_GiftsList()
          }).catch(() => this.$message.error('保存失败，请稍后再试！'))
        } else {
          // 新增
          API_Gift.addGifts(this.giftForm).then(() => {
            this.giftShow = false
            this.$message.success('保存成功！')
            this.GET_GiftsList()
          }).catch(() => this.$message.error('保存失败，请稍后再试！'))
        }
      },

      /** 修改*/
      handleEditGifts(row) {
        this.giftShow = true
        this.currentGiftId = row.gift_id
        this.giftForm = {
          ...row
        }
      },

      /** 新增赠品*/
      handelAddGifts() {
        this.giftShow = true
        this.currentGiftId = ''
        this.giftForm = {
          gift_name: '',

          gift_image: '',

          gift_price: '',

          gift_real_stock: '',

          gift_usable_stock: '',

          gift_creat_time: ''
        }
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

