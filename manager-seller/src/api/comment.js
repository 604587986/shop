/**
 * 评论管理API
 */

import request from '@/utils/request'
import CommentModel from '@/models/CommentModel'

/**
 * 获取评论列表
 * @param params
 * @returns {Promise<any>}
 */
export function getCommentList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/member/comments',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new CommentModel().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 商家回复评论
 * @param params
 * @returns {Promise<any>}
 */
export function replyComment(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/member/comments/${id}/reply`,
      method: 'post',
      data: params
    }).then(response => resolve(response))
  })
}
