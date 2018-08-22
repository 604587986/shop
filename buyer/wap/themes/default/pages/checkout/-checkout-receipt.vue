<template>
  <van-popup id="receipt" v-model="show" position="bottom" style="height:100%">
    <van-nav-bar title="发票信息" fixed @click-right="$emit('close')">
      <i class="iconfont ea-icon-close" slot="right"/>
    </van-nav-bar>
    <div class="receipt-container">

    </div>
    <div class="big-btn">
      <van-button type="danger">保存</van-button>
    </div>
  </van-popup>
</template>

<script>
  /**
   * 结算页
   * 发票组件
   */
  import * as API_Members from '@/api/members'
  import * as API_Trade from '@/api/trade'
  import { RegExp } from '~/ui-utils'
  export default {
    name: 'checkout-receipt',
    props: ['show', 'receipt'],
    data() {
      return {
        // 发票表单
        receiptForm: {},
        // 会员发票列表
        receipts: [],
        // 发票内容统一设置
        content: '明细',
        // 已选择发票
        selectedReceipt: this.receipt
      }
    },
    mounted() {
      // 获取会员发票列表
      this.GET_ReceiptList()
    },
    methods: {
      /** 确认发票 */
      handleConfirmReceipt(index) {
        if (this.receiptForm.receipt_title !== undefined) {
          this.$message.error('请先保存正在编辑的发票！')
          return false
        }
        if (!this.selectedReceipt.receipt_title) {
          this.$message.error('请选择发票抬头！')
          return false
        }
        let receipt = JSON.parse(JSON.stringify(this.selectedReceipt)) || {}
        receipt.type = receipt.receipt_title === '个人' ? 0 : 1
        API_Trade.setRecepit(receipt).then(() => {
          this.$message.success('设置成功！')
          this.$emit('change', receipt)
          this.$layer.close(index)
        })
      },
      /** 取消发票 */
      handleCancelReceipt() {
        this.$confirm('确定要取消发票吗？', () => {
          API_Trade.cancelReceipt().then(() => {
            this.$message.success('取消成功！')
            this.$emit('change', {})
          })
        })
      },
      /** 获取发票列表 */
      GET_ReceiptList() {
        API_Members.getReceipts().then(response => {
          this.receipts = response.VATORDINARY.reverse()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
  .receipt-container {
    padding-top: 46px;
  }
</style>
