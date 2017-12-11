<template>
  <div></div>
</template>

<script>
import $ from 'jquery'
import '@/plugins/selector/css/jquery.goodsSelector.css'
import '@/plugins/selector/js/jquery.goodsSelector'
export default {
  name: 'GoodsSelectorDialog',
  data() {
    return {
      options: {
        defaultData: this.defaultData,
        maxLength: this.maxLength,
        confirm: data => {
          // 触发回调
          this.$emit('refreshFunc', data)
        },
        callHideDialog: () => {
          this.$emit('hideDialogFunc')
        }
      }
    }
  },
  props: ['defaultData', 'maxLength', 'showDialog', 'mode'],
  methods: {
    callAdminDialog() {
      $.GoodsAdminSelector(this.options)
    },
    callSellerDialog() {
      $.GoodsAdminSelector(this.options)
    }
  },
  mounted() {
    if (this.showDialog) {
      this.mode === 'admin' ? this.callAdminDialog() : this.callSellerDialog()
    }
  },
  watch: {
    showDialog(val) {
      if (!val) {
        // 关闭Dialog
        $('#__GSR__ .cancel').click()
      } else {
        this.mode === 'admin' ? this.callAdminDialog() : this.callSellerDialog()
      }
    }
  }
}
</script>

<style lang='scss'>

</style>