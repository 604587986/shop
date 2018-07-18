/**
 * Created by Andste on 2018/5/9.
 */

import Vue from 'vue'
import { Foundation } from '~/ui-utils'
import { domain, api } from '~/ui-domain'

export default {
  data() {
    return {
      // 图片上传API
      MixinUploadApi: api.base + '/uploaders',
      // 地区API
      MixinRegionApi: api.base + '/regions/@id/children',
      // 买家端域名
      MixinBuyerDomain: domain.buyer_pc
    }
  },
  methods: {
    /** 返回克隆后的对象 */
    MixinClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    /** 用于修改单条表格数据后，set到tableData中 */
    MixinSetTableData(tableData, idName, id, response) {
      const { data } = tableData
      const index = data.findIndex(item => item[idName] === id)
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
  }
}
