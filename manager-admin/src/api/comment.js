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
      url: 'shop/admin/comments/list-json.do?type=1',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new CommentModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取评论详情
 * @param id
 * @returns {Promise<any>}
 */
export function getCommentDetail(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/comments/detail.do',
      method: 'get',
      params: { commentId: id }
    }).then(response => resolve(response)).catch(error => console.log(error))
  })
}

/**
 * 删除评论
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteComment(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('comment_id', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/comments/delete.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/***** ASK *****/

/**
 * 获取咨询列表
 * @param params
 * @returns {Promise<any>}
 */
export function getAskList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/comments/list-json.do?type=2',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _resposne = response
      _resposne.data = new CommentModel().map(response.data)
      resolve(_resposne)
    }).catch(error => reject(error))
  })
}

/**
 * 获取咨询详情
 * @param id
 * @returns {Promist}
 */
export function getAskDetail(id) {
  return new Promist((resolve, reject) => {
    request({
      url: '',
      method: 'get',
      params: { commentId: id }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除咨询
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteAsk(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('comment_id', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/comments/delete.do',
      method: 'post',
      data: _formData
    })
  })
}
