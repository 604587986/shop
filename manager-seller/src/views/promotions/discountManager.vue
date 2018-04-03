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
            <el-button type="success" @click="addCoupon">新增</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="有效期（在此日期内）">
                  <el-date-picker
                    key="0"
                    v-model="advancedForm.coupon_time_limit"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="coupon_name" label="优惠券名称" />
        <el-table-column prop="coupon_denomination" label="优惠券面额（元）" />
        <el-table-column prop="coupon_use_limit" label="使用限制"  />
        <el-table-column label="使用期限" width="450">
          <template slot-scope="scope">
            {{ scope.row.coupon_time_start | unixToDate('yyyy-MM-dd') }}~
            {{ scope.row.coupon_time_end | unixToDate('yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column prop="coupon_circulation" label="发行量（个）" width="120" />
        <el-table-column prop="coupon_used_num" label="已使用量（个）" />
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditCoupons(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteGoods(scope.row)">删除
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
    <el-dialog title="新增优惠券" :visible.sync="couponShow" width="40%" align="center">
      <el-form :model="couponForm" label-position="right" label-width="160px">
        <el-form-item label="优惠券名称">
          <el-input
            auto-complete="off"
            v-model="couponForm.coupon_name"
            placeholder="请输入10个以内的汉字"
            label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="优惠券面额（元）">
          <el-input auto-complete="off"  v-model="couponForm.coupon_denomination" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="买家需要消费（元）">
          <el-input auto-complete="off"  v-model="couponForm.coupon_use_limit" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="使用期限">
          <el-date-picker
            key="1"
            v-model="couponForm.coupon_time_limit"
            type="daterange"
            range-separator="-"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发行量（个）">
          <el-input auto-complete="off"  v-model="couponForm.coupon_circulation" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="每人限领（个）">
          <el-input auto-complete="off"  v-model="couponForm.coupon_used_num"  label-width="100"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="couponShow = false">取 消</el-button>
        <el-button type="primary" @click="reserveCoupon">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_coupon from '@/api/coupon'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'discountManager',
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

        /** 高级搜索数据 */
        advancedForm: {
          coupon_time_limit: []
        },

        /** 优惠券弹框显示*/
        couponShow: false,

        /** 当前优惠券ID*/
        currentcouponId: '',

        /** 优惠券表单*/
        couponForm: {

          /** 优惠券名称*/
          coupon_name: '',

          /** 优惠券面额（元）*/
          coupon_denomination: 2,

          /** 使用限制（元）*/
          coupon_use_limit: 2,

          /** 使用时限 */
          coupon_time_limit: '2017-02-25',

          /** 发行量（个） */
          coupon_circulation: 2,

          /** 已使用量（个） */
          coupon_used_num: 2
        }
      }
    },
    mounted() {
      this.GET_CouponsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_CouponsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_CouponsList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          goods_status: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_CouponsList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          coupon_time_start: this.advancedForm.coupon_time_limit[0],
          coupon_time_end: this.advancedForm.coupon_time_limit[1]
        }
        delete this.params.keyword
        this.GET_CouponsList()
      },

      GET_CouponsList() {
        this.loading = true
        API_coupon.getCouponList(this.params).then(response => {
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

      /** 删除优惠券 */
      handleDeleteGoods(row) {
        this.$confirm('确认删除此优惠券, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API_coupon.deleteCoupons(row.coupon_id, row).then(() => {
            this.GET_CouponsList()
            this.$message.success('删除优惠券成功！')
          }).catch(() => this.$message.error('删除优惠券出错，请稍后再试！'))
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      },

      /** 保存优惠券*/
      reserveCoupon() {
        const _ids = this.currentcouponId || ''
        const _params = {
          ...this.couponForm,
          coupon_time_start: this.couponForm.coupon_time_limit[0],
          coupon_time_end: this.couponForm.coupon_time_limit[1]
        }
        console.log(_params, 333)
        API_coupon.modifyCoupon(_ids, _params).then(() => {
          this.couponShow = false
          this.$message.success('保存成功！')
          this.GET_CouponsList()
        }).catch(() => this.$message.error('保存失败，请稍后再试！'))
      },

      /** 修改*/
      handleEditCoupons(row) {
        this.couponShow = true
        this.currentcouponId = row.coupon_id
        this.couponForm = {
          ...row,
          coupon_time_limit: [parseInt(row.coupon_time_start) * 1000, parseInt(row.coupon_time_end) * 1000]
        }
      },

      /** 新增优惠券*/
      addCoupon() {
        this.couponShow = true
        this.currentcouponId = ''
        this.couponForm = {
          coupon_name: '',

          coupon_denomination: '',

          coupon_use_limit: '',

          coupon_time_limit: [],

          coupon_circulation: '',

          coupon_used_num: ''
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
