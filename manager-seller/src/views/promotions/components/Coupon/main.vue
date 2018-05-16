<template>
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
      <el-button @click="handleCancelCoupon">取 消</el-button>
      <el-button type="primary" @click="handleReserveCoupon">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as API_coupon from '@/api/coupon'
  export default {
    name: 'main',
    props: {
      /** 是否显示优惠券弹框 */
      couponModelShow: {
        type: Boolean,
        default: false
      },

      /** 当前优惠券Id */
      currentcouponId: {
        type: Number,
        default: 1
      },

      /** 优惠券表单数据 */
      couponModelForm: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      couponModelShow() {
        this.couponShow = this.couponModelShow
      },

      couponModelForm() {
        this.couponForm = { ...this.couponModelForm }
      }
    },
    data() {
      return {
        /** 是否显示优惠券弹框 */
        couponShow: false,

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
    methods: {
      /** 取消 */
      handleCancelCoupon() {
        this.couponShow = false
        this.$emit('saveCoupon', false)
      },

      /** 保存优惠券*/
      handleReserveCoupon() {
        const _params = {
          ...this.couponForm,
          coupon_time_start: this.couponForm.coupon_time_limit[0],
          coupon_time_end: this.couponForm.coupon_time_limit[1]
        }
        if (this.currentcouponId) {
          API_coupon.modifyCoupons(this.currentcouponId, _params).then(() => {
            this.couponShow = false
            this.$message.success('保存成功！')
            this.$emit('saveCoupon', true)
          }).catch((error) => this.$message.error(error))
        } else {
          API_coupon.addCoupons(_params).then(() => {
            this.couponShow = false
            this.$message.success('保存成功！')
            this.$emit('saveCoupon', true)
          }).catch((error) => this.$message.error(error))
        }
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>

</style>
