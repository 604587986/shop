/**
 * 订单相关API
 */

import request from '@/utils/request'

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
      resolve(response)
    })
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
      resolve(response)
    })
  })
}

/**
 * 更新价格  调整价格
 * @param ids
 * @returns {Promise<any>}
 */
export function updateOrderPrice(sn, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/trade/orders/${sn}/price`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 修改收货人信息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function updateConsigneeInfo(sn, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/trade/orders/${sn}/address`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 发货
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deliveryGoods(sn, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/trade/orders/${sn}/delivery`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
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
    })
  })
}

