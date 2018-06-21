/**
 * 订单相关API
 */

import request from '@/utils/request'
import OrderModel from '@/models/OrderModel'

/**
 * 获取订单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/trade/orders',
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
      url: `/trade/orders/${sn}`,
      method: 'get',
      loading: false
    }).then(response => {
      const _response = new OrderModel().map(response)
      resolve(_response)
    })
  })
}

/**
 * 更新价格  调整价格
 * @param ids
 * @returns {Promise<any>}
 */
export function updateGoodPrice(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `877`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 修改收货人信息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function updateConsigneeInfo(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `877`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 发货
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deliveryGoods(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `877`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 生成电子面单
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function generateElectronicSurface(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `877`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

