/**
 * 订单相关API
 */

import request from '@/utils/request'

/**
 * 获取订单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'order/list',
      method: 'get',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
