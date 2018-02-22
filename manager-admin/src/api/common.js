/**
 * 公共API
 */

import request from '@/utils/request'

/**
 * 获取图片验证码URL
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(type) {
  return `${process.env.BASE_API}/validcode.do?vtype=${type}&rmd=${new Date().getTime()}`
}

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
