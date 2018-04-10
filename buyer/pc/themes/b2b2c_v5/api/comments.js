/**
 * 评论相关API
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
