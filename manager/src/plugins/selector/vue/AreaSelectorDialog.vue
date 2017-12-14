<template>
  <div></div>
</template>

<script>
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import AreaSelector from '@/plugins/selector/js/jquery.areaSelector.js'
export default {
  name: 'AreaSelectorDialog',
  props: ['defaultData', 'showDialog'],
  methods: {
    callAreaDialog() {
      AreaSelector.show({
        defaultData: this.defaultData,
        confirm: data => {
          this.$emit('confirmFunc', data)
        },
        callHideDialog: () => {
          this.$emit('hideDialogFunc')
        }
      })
    }
  },
  mounted() {
    if (this.showDialog) {
      console.log(1)
      this.callAreaDialog()
    }
  },
  watch: {
    showDialog(val) {
      if (!val) {
        // 关闭Dialog
        $('.area-container').hide()
        $('.cover').css('display', 'none')
      } else {
        console.log(2)
        this.callAreaDialog()
      }
    }
  }
}
</script>

<style lang='scss'>

</style>