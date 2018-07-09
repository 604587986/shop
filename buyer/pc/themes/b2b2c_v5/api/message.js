/**
 * 站内消息相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取消息列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getMessages(params) {
  params = params || {}
  params.page_size = params.page_size || 5
  return request({
    url: 'members/member-nocice-logs',
    method: Method.GET,
    needToken: true,
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
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/message',
    method: Method.GET,
    params
  })
}

/**
 * 标记消息为已读
 * @param ids
 */
export function messageMarkAsRead(ids) {
  return request({
    url: `members/member-nocice-logs/${ids}/read`,
    method: Method.PUT,
    needToken: true
  })
}

/**
 * 删除消息
 * @param ids
 */
export function deleteMessage(ids) {
  return request({
    url: `members/member-nocice-logs/${ids}}`,
    method: Method.DELETE
  })
}
