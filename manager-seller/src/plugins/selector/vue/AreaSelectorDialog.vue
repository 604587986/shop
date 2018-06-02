<template>
  <div></div>
</template>

<script>
import $ from 'jquery'
import AreaSelector from '@/plugins/selector/js/jquery.areaSelector.js'
import '../css/areaSelector.css'
export default {
  name: 'EnAreaSelectorDialog',
  props: {
    /** 是否显示 */
    showDialog: {
      type: Boolean,
      default: false
    },

    /** 默认数据 */
    defaultData: {
      type: Array
    },

    /** 请求地址 */
    api: {
      required: true
    },

    /** 映射属性 */
    propertys: {
      type: Object,
      default: {
        /** 等级 */
        level: 'level',

        /** 标签名 */
        local_name: 'local_name',

        /** 父地区id */
        p_regions_id: 'p_regions_id',

        /**  地区id */
        region_id: 'region_id',

        /** 子选项 */
        children: 'children'
      }
    }
  },
  methods: {
    callAreaDialog() {
      AreaSelector.show({
        api: this.api,
        props: this.propertys,
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

<style lang='scss'  type="text/scss" >
</style>
