/**
 * 消息相关API
 */

import request from '@/utils/request'

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
      resolve(response)
    })
  })
}

/**
 * 删除消息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteMsgs(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/messages/${ids}`,
      method: 'delete',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 标记消息为已读
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function signMsgs(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/message/sign/${ids}`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}
