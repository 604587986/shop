/**
 * 订单相关API
 */

import request from '@/utils/request'

/**
 * 获取订单列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getOrderList(params) {
  return request({
    url: 'order/list',
    method: 'get',
    params
  })
}

/**
 * 获取订单详情
 * @param sn
 * @returns {AxiosPromise}
 */
export function getOrderDetail(sn) {
  return request({
    url: `order/${sn}`,
    method: 'get'
  })
}
