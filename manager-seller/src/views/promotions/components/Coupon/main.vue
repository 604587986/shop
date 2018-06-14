<template>
  <el-dialog title="新增优惠券" :visible.sync="couponShow" width="30%">
    <el-form :model="couponForm" label-position="right" :rules="rules"  label-width="160px">
      <el-form-item label="优惠券名称：" prop="coupon_name">
        <el-input
          auto-complete="off"
          v-model="couponForm.coupon_name"
          placeholder="请输入10个以内的汉字"
          maxLength="10"
          label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="优惠券面额（元）：" prop="coupon_denomination">
        <el-input auto-complete="off"  v-model.number="couponForm.coupon_denomination" label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="买家需消费（元）：" prop="coupon_use_limit">
        <el-input auto-complete="off"  v-model.number="couponForm.coupon_use_limit" label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="使用期限：" style="text-align: left">
        <el-date-picker
          v-model="couponForm.coupon_time_limit"
          type="daterange"
          range-separator="-"
          value-format="timestamp"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickoptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发行量（个）：" prop="coupon_circulation">
        <el-input auto-complete="off"  v-model.number="couponForm.coupon_circulation" label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="每人限领（个）：" prop="coupon_limit_num">
        <el-input auto-complete="off"  v-model.number="couponForm.coupon_limit_num"  label-width="100"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelCoupon">取 消</el-button>
      <el-button type="primary" @click="handleReserveCoupon">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as API_coupon from '@/api/coupon'
  export default {
    name: 'Coupon',
    props: {
      /** 是否显示优惠券弹框 */
      couponModelShow: {
        type: Boolean,
        default: false
      },

      /** 当前优惠券Id */
      currentcouponId: {
        type: [Number, String],
        default: () => {
          return ''
        }
      }
    },
    watch: {
      couponModelShow() {
        this.couponShow = this.couponModelShow
      },
      couponShow() {
        !this.couponShow && this.$emit('saveCoupon', false)
      },
      currentcouponId() {
        if (this.currentcouponId) {
          this.GET_couponDetails()
        } else {
          this.couponForm = {
            /** 优惠券名称*/
            coupon_name: '',

            /** 优惠券面额（元）*/
            coupon_denomination: 0,

            /** 使用限制（元）*/
            coupon_use_limit: 0,

            /** 使用时限 */
            coupon_time_limit: [],

            /** 发行量（个） */
            coupon_circulation: 0,

            /** 每人限领 */
            coupon_limit_num: 0
          }
        }
      }
    },
    mounted() {
      if (this.currentcouponId) {
        this.GET_couponDetails
      } else {
        this.couponForm = {
          /** 优惠券名称*/
          coupon_name: '',

          /** 优惠券面额（元）*/
          coupon_denomination: 0,

          /** 使用限制（元）*/
          coupon_use_limit: 0,

          /** 使用时限 */
          coupon_time_limit: [],

          /** 发行量（个） */
          coupon_circulation: 0,

          /** 每人限领 */
          coupon_limit_num: 0
        }
      }
    },
    data() {
      return {
        /** 是否显示优惠券弹框 */
        couponShow: false,

        /** 日期选择器选项 */
        pickoptions: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7
          }
        },

        /** 优惠券表单*/
        couponForm: {

          /** 优惠券名称*/
          coupon_name: '',

          /** 优惠券面额（元）*/
          coupon_denomination: 0,

          /** 使用限制（元）*/
          coupon_use_limit: 0,

          /** 使用时限 */
          coupon_time_limit: [],

          /** 发行量（个） */
          coupon_circulation: 0,

          /** 每人限领 */
          /** 每人限领 */
          coupon_limit_num: 0
        },

        /** 表单校验规则 */
        rules: {
          /** 优惠券名称 */
          coupon_name: [
            { required: true, message: '请输入优惠券名称', trigger: 'blur' }
          ],

          /** 优惠券面额 */
          coupon_denomination: [
            { required: true, message: '请输入优惠券面额', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],

          /** 消费门槛 */
          coupon_use_limit: [
            { required: true, message: '请输入消费门槛金额', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],

          /** 发行量 */
          coupon_circulation: [
            { required: true, message: '请输入发行量', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],

          /** 每人限领 */
          coupon_limit_num: [
            { required: true, message: '请输入每人限领数量', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /** 查询一个优惠券详情 */
      GET_couponDetails() {
        API_coupon.getCouponDetails(this.currentcouponId, {}).then(response => {
          this.couponForm = { ...response }
          this.couponForm.coupon_time_limit = [parseInt(this.couponForm.coupon_time_start) * 1000,
            parseInt(this.couponForm.coupon_time_end) * 1000]
        })
      },

      /** 取消 */
      handleCancelCoupon() {
        this.$emit('saveCoupon', false)
      },

      /** 保存优惠券*/
      handleReserveCoupon() {
        const _params = {
          ...this.couponForm,
          coupon_time_start: this.couponForm.coupon_time_limit[0] / 1000,
          coupon_time_end: this.couponForm.coupon_time_limit[1] / 1000
        }
        delete _params.coupon_time_limit
        if (this.currentcouponId) {
          API_coupon.modifyCoupons(this.currentcouponId, _params).then(() => {
            this.couponShow = false
            this.$message.success('保存成功！')
            this.$emit('saveCoupon', true)
          })
        } else {
          API_coupon.addCoupons(_params).then(() => {
            this.couponShow = false
            this.$message.success('保存成功！')
            this.$emit('saveCoupon', true)
          })
        }
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>
  .el-date-editor {
    width: 100%;
  }
</style>
