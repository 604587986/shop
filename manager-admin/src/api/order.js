/**
 * 订单相关API
 */

import request from '@/utils/request'

/**
 * 获取订单列表
 * @param params
 */
export function getOrderList(params) {
  return request({
    url: 'trade/orders',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 根据订单sn获取订单详情
 * @param order_sn
 */
export function getOrderDetail(order_sn) {
  return request({
    url: `trade/orders/${order_sn}`,
    method: 'get',
    loading: false
  })
}

/**
 * 根据订单sn获取订单日志
 * @param order_sn
 */
export function getOrderLog(order_sn) {
  return request({
    url: `trade/orders/${order_sn}/log`,
    method: 'get',
    loading: false
  })
}

/**
 * 确认收款
 * @param sn
 * @param params
 */
export function confirmPay(sn, params) {
  return request({
    url: 'order-opration/admin/order/pay.do',
    method: 'post',
    data: params
  })
}

/**
 * 取消订单
 * @param sn
 */
export function cancleOrder(sn) {
  return request({
    url: `order-opration/admin/order/cancel/${sn}.do`,
    method: 'post'
  })
}

/**
 * 获取结算单列表
 * @param params
 */
export function getSettlementList(params) {
  return request({
    url: 'order/bills',
    method: 'get'
  })
}

/**
 * 获取结算单详情
 * @param id
 * @returns {Promise<any>}
 */
export function getSettlementDetail(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `order/bills/${id}`,
      method: 'get'
    })
  })
}

/**
 * 获取账单中的订单列表或者退款单列表
 * @param id
 * @param type
 * @returns {Promise<any>}
 */
export function getSettlementOrderList(id, type) {
  return new Promise((resolve, reject) => {
    request({
      url: `order/bills/${id}/${type}`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 对账单进行下一步操作
 * @param id
 */
export function operateSettlement(id) {
  return request({
    url: `order/bills/${id}/next`,
    method: 'put'
  })
}

/**
 * 获取所有周期结算单列表统计
 * @param id
 */
export function getSettlementStatistics(id) {
  return request({
    url: 'order/bills/statistics',
    method: 'get'
  })
}
