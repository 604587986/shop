/**
 * SMTP设置相关API
 */

import request from '@/utils/request'
import SmtpModel from '@/models/SmtpModel'

/**
 * 获取smtp列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSmtpList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'smtps',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = new SmtpModel().map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加smtp
 * @param params
 */
export function addSmtp(params) {
  return request({
    url: 'smtps',
    method: 'post',
    data: params
  })
}

/**
 * 修改smtp
 * @param id
 * @param params
 */
export function editSmtp(id, params) {
  return request({
    url: `smtps/${id}`,
    method: 'post',
    data: params
  })
}

/**
 * 删除smtp
 * @param ids
 */
export function deleteSmtp(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `smtps/${ids}`,
    method: 'delete'
  })
}

/**
 * 获取smtp详情
 * @param id
 */
export function getSmtpDetial(id) {
  return request({
    url: `smtps/${id}`,
    method: 'get'
  })
}
