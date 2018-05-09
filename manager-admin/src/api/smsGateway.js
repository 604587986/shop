/**
 * 短信网关相关API
 */

import request from '@/utils/request'
import SmsGateway from '@/models/SmsGatewayModel'

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
      const _response = response
      _response.data = new SmsGateway().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加短信网关
 * @param params
 * @returns {*}
 */
export function addSmsGateway(params) {
  return request({
    url: 'system/platforms',
    method: 'post',
    data: params
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
