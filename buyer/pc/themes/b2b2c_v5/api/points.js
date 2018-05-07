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
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/points/list',
    method: 'get',
    params
  })
}
