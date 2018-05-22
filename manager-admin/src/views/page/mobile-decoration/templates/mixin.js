/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 */

import Vue from 'vue'

/** mixin */
export default {
  props: {
    /** 数据 */
    data: {
      type: Object,
      default: () => ({})
    },
    /** 是否为编辑模式 */
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    /** 选择图片 */
    selectImg(index) {
      const data = JSON.parse(JSON.stringify(this.data))
      this.$emit('handle-edit', data, index)
    }
  }
}
