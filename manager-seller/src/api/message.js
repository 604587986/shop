/**
 * 消息相关API
 */

import request from '@/utils/request'
import * as MessagesModel from '@/models/MessagesModel'

/**
 * 获取消息列表
 * @param params
 * @returns {Promise<any>}
 */
export function getMsgsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/messages/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new MessagesModel.Messages().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除消息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteMsgs(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/messages/${ids}`,
      method: 'delete',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 标记消息为已读
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function signMsgs(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/message/sign/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
