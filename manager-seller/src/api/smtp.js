/**
 * SMTP设置相关API
 */

import request from '@/utils/request'
import SmtpModel from '@/models/SmtpModel'

/**
 *
 * @param params
 * @returns {Promise<any>}
 */
export function getSmtpList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/smtp/smtp-listJson.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SmtpModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
