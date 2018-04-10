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
    url: '/coupons',
    method: 'get',
    params
  })
}
