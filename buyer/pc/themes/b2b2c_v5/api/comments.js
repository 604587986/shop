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

/**
 * 商品咨询
 * @param goods_id
 * @param content
 */
export function consultating(goods_id, content) {
  const _formData = new FormData()
  _formData.append('content', content)
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/consulting/${goods_id}`,
    method: 'post',
    data: _formData
  })
}
