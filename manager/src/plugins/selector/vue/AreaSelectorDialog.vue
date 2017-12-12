<template>
  <div></div>
</template>

<script>
import $ from 'jquery'
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
        }
      })
    }
  },
  mounted() {
    if (this.showDialog) {
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
        this.callAreaDialog()
      }
    }
  }
}
</script>

<style lang='scss'>

</style>