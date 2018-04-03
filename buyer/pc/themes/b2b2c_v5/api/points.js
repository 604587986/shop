/**
 * 积分相关API
 */

import request from '@/utils/request'

/**
 * 获取积分明细数据
 * @param params
 * @returns {Promise<any>}
 */
export function getPointsData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'points/list',
      method: 'get',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
