/**
 * 站点数据相关API
 */

import request from '@/utils/request'

/**
 * 导出数据
 * @param type
 * @returns {Promise<any>}
 */
export function outputData(type) {
  const _formData = new FormData()
  _formData.append('type', type)
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/data-export/do-export.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 清除站点示例数据
 * @param type
 * @returns {Promise<any>}
 */
export function clearExampleData(type) {
  const _formData = new FormData()
  _formData.append('type', type)
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/example-data-clean/clean.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
