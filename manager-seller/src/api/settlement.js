/**
 * 结算单相关API
 */

import request from '@/utils/request'
import SettleMentModel from '@/models/SettleMentModel'
import OrderModel from '@/models/OrderModel'

/**
 * 获取结算账单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSettleMentList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/order/bills',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SettleMentModel().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 商家查看某详细账单
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getBillDetails(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/order/bills/${ids}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查看本期账单中的订单列表或者退款单列表
 * @param id
 * @param type
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderList(id, type, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/order/bills/${id}/${type}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new OrderModel().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 卖家对账单进行下一步操作 确认结算
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function confirmSettle(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/order/bills/${id}/next`,
      method: 'put',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}
