/**
 * 咨询管理API
 */

import request from '@/utils/request'
import ConsultationModel from '@/models/ConsultationModel'

/**
 * 获取咨询列表
 * @param params
 * @returns {Promise<any>}
 */
export function getConsultationList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/consultation/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _resposne = response
      _resposne.data = new ConsultationModel().map(response.data)
      resolve(_resposne)
    }).catch(error => reject(error))
  })
}
