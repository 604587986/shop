/**
 * 订单相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取订单列表
 * @param params
 */
export function getOrderList(params) {
  return request({
    url: 'trade/orders',
    method: Method.GET,
    needToken: true,
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
    url: `trade/orders/${order_sn}`,
    method: Method.GET,
    needToken: true
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
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/order/cancel`,
    method: Method.POST,
    needToken: true,
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
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/order/confirm-receipt/${order_sn}`,
    method: Method.POST,
    needToken: true
  })
}
