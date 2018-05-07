/**
 * 优惠券相关API
 */

import request from '@/utils/request'

/**
 * 获取优惠券列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getCoupons(params) {
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/coupons',
    method: 'get',
    params
  })
}
