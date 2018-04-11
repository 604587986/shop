/**
 * 评论相关API
 * 包含咨询API
 */

import request from '@/utils/request'

/**
 * 获取我的评论列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getComments(params) {
  return request({
    url: '/comments',
    method: 'get',
    params
  })
}

/**
 * 获取我的咨询列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getConsultations(params) {
  return request({
    url: '/consultations',
    method: 'get',
    params
  })
}
