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
      url: 'http://localhost:9090/javashop/order-query/admin/order.do',
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
      url: `http://localhost:9090/javashop/order-query/admin/order/${sn}.do`,
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
      url: `http://localhost:9090/javashop/order-query/admin/order/${sn}/log.do`,
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
      url: 'http://localhost:9090/javashop/order-opration/admin/order/pay.do',
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
      url: `http://localhost:9090/javashop/order-opration/admin/order/cancel/${sn}.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
