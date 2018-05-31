/**
 * Created by andste.cc@gmail.com on 2018/5/9.
 */

import Vue from 'vue'
import * as API_Common from '@/api/common'
import { Foundation } from '@/framework'

export default {
  data() {
    return {
      /** 图片上传API */
      MixinUploadApi: API_Common.uploadApi
    }
  },
  methods: {
    /** 返回克隆后的对象 */
    MixinClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    /** 用于修改单条表格数据后，set到tableData中 */
    MixinSetTableData(tableData, id, response) {
      const { data } = tableData
      const index = data.findIndex(item => item.id === id)
      Vue.set(data, index, response)
    },
    /** 用于判断表单是否为空 */
    MixinRequired(message, trigger) {
      return { required: true, message, trigger: trigger || 'blur' }
    },
    /** 格式化金钱 */
    MixinFormatPrice(row, column, cellValue, index) {
      return '￥' + Foundation.formatPrice(cellValue)
    },
    /** 格式化时间戳 */
    MixinUnixToDate(row, column, cellValue, index) {
      return Foundation.unixToDate(cellValue)
    }
  },
  computed: {}
}
