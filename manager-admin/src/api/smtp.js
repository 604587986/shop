/**
 * SMTP设置相关API
 */

import request from '@/utils/request'
import SmtpModel from '@/models/SmtpModel'
const smtpModel = new SmtpModel()

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
      response.data = smtpModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加smtp
 * @param params
 */
export function addSmtp(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'smtps',
      method: 'post',
      data: smtpModel.params(params)
    }).then(response => resolve(smtpModel.map(response))).catch(error => reject(error))
  })
}

/**
 * 修改smtp
 * @param id
 * @param params
 */
export function editSmtp(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `smtps/${id}`,
      method: 'post',
      data: smtpModel.params(params)
    }).then(response => resolve(smtpModel.map(response))).catch(error => reject(error))
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

/**
 * 发送测试邮件
 * @param params
 */
export function sendTestEmail(params) {
  return request({
    url: 'smtps/send',
    method: 'post',
    data: params
  })
}
