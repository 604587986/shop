<template>
  <div></div>
</template>

<script>
import $ from 'jquery'
import '@/plugins/selector/css/jquery.textSelector.css'
import '@/plugins/selector/js/jquery.textSelector'
export default {
  name: 'TextSelectorDialog',
  data() {
    return {
      options: {
        defaultData: this.defaultData,
        confirm: data => {
          // 触发回调
          this.$emit('confirmFunc', data)
        },
        emitHideDialogFunc: ()=>{
          this.$emit('hideDialogFunc')
        }
      }
    }
  },
  props: ['defaultData', 'showDialog'],
  methods: {
    callTextDialog() {
      $.TextSelector(this.options)
    }
  },
  mounted() {
    if (this.showDialog) {
      this.callTextDialog()
    }
  },
  watch: {
    showDialog(val) {
      if (!val) {
        // 关闭Dialog
        $('#__GSR__ .cancel').click()
      } else {
        this.callTextDialog()
      }
    }
  }
}
</script>

<style lang='scss'>

</style>