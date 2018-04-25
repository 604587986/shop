/**
 * 站内消息相关API
 */

import request from '@/utils/request'

/**
 * 获取消息列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getMessages(params) {
  params = params || {}
  params.page_size = params.page_size || 5
  return request({
    url: '/message',
    method: 'get',
    params
  })
}

/**
 * 获取站内未读消息
 * @param params
 * @returns {AxiosPromise}
 */
export function getMesssagesAsUnread(params) {
  params = params || {}
  params.page_size = params.page_size || 5
  return request({
    url: '/message',
    method: 'get',
    params
  })
}

/**
 * 标记消息为已读
 * @param ids 消息ID【集合或单个ID】
 * @returns {AxiosPromise}
 */
export function messageMarkAsRead(ids) {
  return request({
    url: `/message/${ids}`,
    method: 'post'
  })
}

/**
 * 删除消息
 * @param ids 消息ID【集合或单个ID】
 * @returns {AxiosPromise}
 */
export function deleteMessage(ids) {
  return request({
    url: `/message/${ids}`,
    method: 'delete'
  })
}
