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
 * @param order_sn 订单编号
 * @returns {AxiosPromise}
 */
export function getOrderDetail(order_sn) {
  return request({
    url: `order/${order_sn}`,
    method: 'get'
  })
}

/**
 * 取消订单
 * @param order_sn 订单编号
 * @param reason 取消订单原因
 * @returns {AxiosPromise}
 */
export function cancelOrder(order_sn, reason) {
  const _formData = new FormData()
  _formData.append('reason', reason)
  return request({
    url: `order/cancel`,
    method: 'post',
    data: _formData
  })
}

/**
 * 确认收货
 * @param order_sn 订单编号
 * @returns {AxiosPromise}
 */
export function confirmReceipt(order_sn) {
  return request({
    url: `order/confirm-receipt/${order_sn}`,
    method: 'post'
  })
}
