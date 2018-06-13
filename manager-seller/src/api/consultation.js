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
      url: '/members/asks',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _resposne = response
      _resposne.data = new ConsultationModel().map(response.data)
      resolve(_resposne)
    })
  })
}

/**
 * 回复咨询
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function replyConsultationList(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/members/asks/${id}/reply`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}
