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
          const _data = this.mapArea(data, this.propertys)
          this.$emit('confirmFunc', data, _data)
        },
        callHideDialog: () => {
          this.$emit('hideDialogFunc')
        }
      })
    },
    /** 数据反向映射 */
    mapArea(arr, props){
      if (!arr || !Array.isArray(arr) || !props) return arr
      const result = []
      const configurableProps = ['level', 'local_name', 'p_regions_id', 'region_id']
      const childrenProp = props.children || 'children'
      arr.forEach(item => {
        const itemCopy = {}
        configurableProps.forEach(prop => {
          let name = props[prop]
          let value = item[prop]
          if (value === undefined) {
            name = prop
            value = item[prop]
          }
          if(value !== undefined) {
            itemCopy[name] = value
          }
        })
        if (Array.isArray(item[childrenProp])) {
          itemCopy[childrenProp] = this.mapArea(item[childrenProp], props)
        }
        result.push(itemCopy)
      })
      return result
    },

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
