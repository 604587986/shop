/**
 * 系统设置
 */

import request from '@/utils/request'

/**
 * 获取系统设置
 * @param params
 * @returns {Promise<any>}
 */
export function getSystemSetting(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '',
      method: 'get',
      loading: false
    }).then(response => {}).catch(erro => reject(erro))
  })
}
