/**
 * 结算单相关API
 */

import request from '@/utils/request'
import SettleMentModel from '@/models/SettleMentModel'

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
    }).catch(error => reject(error))
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
      const _response = response
      _response.data = new SettleMentModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
