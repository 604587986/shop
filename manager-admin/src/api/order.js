/**
 * 订单相关API
 */

import request from '@/utils/request'
import OrderModel from '@/models/OrderModel'
import OrderLogModel from '@/models/OrderLogModel'
import ProductModel from '@/models/ProductModel'

/**
 * 获取订单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'order-query/admin/order.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new OrderModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 根据订单sn获取订单详情
 * @param sn
 * @returns {Promise<any>}
 */
export function getOrderDetail(sn) {
  return new Promise((resolve, reject) => {
    request({
      url: `order-query/admin/order/${sn}.do`,
      method: 'get',
      loading: false
    }).then(response => {
      const _response = new OrderModel().map(response)
      _response.productList = new ProductModel().map(_response.productList)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 根据订单sn获取订单日志
 * @param sn
 * @returns {Promise<any>}
 */
export function getOrderLog(sn) {
  return new Promise((resolve, reject) => {
    request({
      url: `order-query/admin/order/${sn}/log.do`,
      method: 'get',
      loading: false
    }).then(response => {
      const _response = new OrderLogModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 确认收款
 * @param sn
 * @param params
 * @returns {Promise<any>}
 */
export function confirmPay(sn, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('ordersn', sn)
  return new Promise((resolve, reject) => {
    request({
      url: 'order-opration/admin/order/pay.do',
      method: 'post',
      data: _formData
    })
  })
}

/**
 * 取消订单
 * @param sn
 * @returns {Promise<any>}
 */
export function cancleOrder(sn) {
  const _formData = new FormData()
  _formData.append('reson', '管理员取消')
  return new Promise((resolve, reject) => {
    request({
      url: `order-opration/admin/order/cancel/${sn}.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
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
