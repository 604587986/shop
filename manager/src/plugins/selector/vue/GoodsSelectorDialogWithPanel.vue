<template>
    <div class='goods-selector-width-panel-container'></div>
</template>

<script>
import $ from 'jquery'
import '@/plugins/selector/css/jquery.goodsSelector.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/plugins/selector/js/jquery.goodsSelector'
export default {
  name: 'GoodsSelectorDialogWithPanel',
  props: ['maxLength', 'defaultData'],
  mounted() {
    $('.goods-selector-width-panel-container').GoodsSellerSelector({
      maxLength: this.maxLength,
      goodsIdList: this.defaultData,
      refresh: data => {
        this.$emit('refreshFunc', data)
      },
      // 把ElementUI的消息函数传进去
      message: (msg, type) => {
        this.$message({
          message: msg,
          type: type
        })
      }
    })
  }
}
</script>

<style lang='scss'>

</style>