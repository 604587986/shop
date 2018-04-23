/**
 * 积分相关API
 */

import request from '@/utils/request'

/**
 * 获取积分明细数据
 * @param params
 * @returns {AxiosPromise}
 */
export function getPointsData(params) {
  return request({
    url: 'points/list',
    method: 'get',
    params
  })
}
