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
      url: '/core/admin/sms/sms-listJson.do',
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
