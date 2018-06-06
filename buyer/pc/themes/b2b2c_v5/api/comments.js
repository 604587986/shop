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
    url: 'member/comments',
    method: 'get',
    params
  })
}

/**
 * 订单评论
 * @param params
 */
export function commentsOrder(params) {
  return request({
    url: 'member/comments',
    method: 'post',
    data: params
  })
}

/**
 * 获取我的咨询列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getConsultations(params) {
  return request({
    url: 'member/asks',
    method: 'get',
    params
  })
}

/**
 * 商品咨询
 * @param goods_id
 * @param ask_content
 */
export function consultating(goods_id, ask_content) {
  return request({
    url: 'member/asks',
    method: 'post',
    data: {
      goods_id,
      ask_content
    }
  })
}
