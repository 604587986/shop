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
 * @param order_sn
 * @param pay_price
 */
export function confirmPay(order_sn, pay_price) {
  return request({
    url: `trade/orders/${order_sn}/pay`,
    method: 'post',
    data: { pay_price }
  })
}

/**
 * 取消订单
 * @param order_sn
 */
export function cancleOrder(order_sn) {
  return request({
    url: `trade/orders/${order_sn}/cancelled`,
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
    method: 'get',
    loading: false
  })
}

/**
 * 获取结算单详情
 * @param id
 */
export function getSettlementDetail(id) {
  return request({
    url: `order/bills/${id}`,
    method: 'get'
  })
}

/**
 * 获取账单中的订单列表或者退款单列表
 * @param id
 * @param type
 * @param params
 */
export function getSettlementOrderList(id, type, params) {
  return request({
    url: `order/bills/${id}/${type}`,
    method: 'get',
    loading: false,
    params
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
 * 导出结算单
 * @param bill_id
 */
export function exportBill(bill_id) {
  return request({
    url: `order/bills/${bill_id}/export`,
    method: 'get'
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

/**
 * 获取订单设置
 */
export function getOrderSettings() {
  return request({
    url: 'trade/orders/setting',
    method: 'get'
  })
}

/**
 * 修改订单设置
 * @param params
 */
export function editOrderSettings(params) {
  return request({
    url: 'trade/orders/setting',
    method: 'post',
    data: params
  })
}
