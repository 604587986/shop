/**
 * 结算单相关API
 */

import request from '@/utils/request'
import SettlementModel from '@/models/SettlementModel'

/**
 * 获取结算单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSettlementList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'order-bill/admin/bill-all.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SettlementModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
