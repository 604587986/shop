/**
 * 短信网关相关API
 */

import request from '@/utils/request'
import SmsGateway from '@/models/SmsGatewayModel'
const smsGateway = new SmsGateway()

/**
 * 获取短信网关列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSmsGatewayList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'system/platforms',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = smsGateway.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 修改短信网关参数
 * @param id 短信网关ID
 * @param params 短信网关参数
 * @returns {*}
 */
export function editSmsGateway(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `system/platforms/${id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: smsGateway.params(params)
    }).then(response => resolve(smsGateway.map(response))).catch(error => reject(error))
  })
}

/**
 * 开启短信网关
 * @param id
 * @returns {*}
 */
export function openSmsGatewayById(id) {
  return request({
    url: `/system/platforms/${id}/open`,
    method: 'post'
  })
}
