/**
 * Created by andste.cc@gmail.com on 2018/5/9.
 */

import Vue from 'vue'
import * as API_Common from '@/api/common'
import { Foundation } from '~/ui-utils'
import { domain } from '~/ui-domain'

export default {
  data() {
    return {
      // 图片上传API
      MixinUploadApi: API_Common.uploadApi,
      // 地区API
      MixinRegionApi: API_Common.regionApi,
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
    },
    /**
     * 导出数据
     * @param data   要导出的数据
     * @param name   要导出的文件名
     * @param suffix 要导出的数据文件名后缀
     * @param type   要导出的数据类型
     * @constructor
     */
    MixinExportFile(data, name = 'data', suffix = 'xlsx', type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      let blob = new Blob([data], { type })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${name}.${suffix}`
      link.click()
    }
  }
}
