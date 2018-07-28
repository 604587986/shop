<template>
  <div id="receiptDetail">

  </div>
</template>

<script>
  import * as API_Receipt from '@/api/receipt'

  export default {
    name: 'receiptDetail',
    data() {
      return {
        id: this.$route.params.id,
        receipt: ''
      }
    },
    mounted() {
      this.GET_ReceiptDetail()
      const keys = [
        { label: '订单编号', key: 'order_sn' },
        { label: '发票类型', key: 'receipt_type' },
        { label: '会员名称', key: 'member_name' },
        { label: '发票金额', key: 'receipt_amount' },
        { label: '发票抬头', key: 'receipt_title' },
        { label: '发票内容', key: 'receipt_content' },
        { label: '发票税号', key: 'tax_no' }
      ]
    },
    methods: {
      /** 获取开票详情 */
      GET_ReceiptDetail() {
        API_Receipt.getHistoryReceiptDetail(this.id).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
