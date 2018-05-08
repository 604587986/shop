/**
 * 积分相关API
 */

import request from '@/utils/request'

/**
 * 获取当前会员积分
 * @returns {*}
 */

export function getPoints() {
  return request({
    url: 'members/points/current',
    method: 'get'
  })
}

/**
 * 获取积分明细数据
 * @param params
 * @returns {AxiosPromise}
 */
export function getPointsData(params) {
  return request({
    url: 'members/points',
    method: 'get',
    params
  })
}
