/**
 * 库存预警设置相关API
 */

import request from '@/utils/request'

/**
 * 修改库存预警数量
 * @param params
 * @returns {Promise<any>}
 */
export function saveStockWarningNum(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/warning-counts',
      method: 'put',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
