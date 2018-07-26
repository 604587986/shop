/**
 * Created by Andste on 2018/5/9.
 */

import Vue from 'vue'
import { Foundation } from '~/ui-utils'
import { api, domain } from '~/ui-domain'
import * as XLSX from 'xlsx'

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
  computed: {
    /**
     * 缓存页面数组
     * @returns {default.computed.cachedViews|(function())|Array|*|getters.cachedViews}
     */
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    /**
     * 返回默认时间 + 5分钟
     * 用于日期时间选择器的默认时间
     * @returns {string}
     * @constructor
     */
    MixinDefaultTime() {
      const today = new Date()
      let hours = today.getHours()
      let minutes = today.getMinutes() + 5
      let seconds = today.getSeconds()
      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes
      if (seconds < 10) seconds = '0' + seconds
      return hours + ':' + minutes + ':' + seconds
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
     * 导出Excel
     * @param json   要导出的json数据
     * @param name   要导出的文件名
     * @param type   要导出的数据类型
     * @constructor
     */
    MixinExportJosnToExcel(json, name = 'data', type = 'application/octet-stream') {
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: { }}
      wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(json)
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }
      let blob = new Blob([s2ab(XLSX.write(wb, wopts))], { type })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${name}.xlsx`
      link.click()
      // 释放资源
      setTimeout(() => {
        URL.revokeObjectURL(link.href)
      }, 100)

      function s2ab(s) {
        if (typeof ArrayBuffer !== 'undefined') {
          const buf = new ArrayBuffer(s.length)
          const view = new Uint8Array(buf)
          for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
          return buf
        } else {
          const buf = new Array(s.length)
          for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
          return buf
        }
      }
    }
  }
}
