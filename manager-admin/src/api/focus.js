/**
 * 焦点图相关API
 */

import request from '@/utils/request'

/**
 * 获取焦点图列表
 * @param type
 * @param params
 * @returns {Promise<any>}
 */
export function getFocusList(type, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `cms/admin/focus.do?client_type=${type}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {}).catch(error => reject(error))
  })
}
