/**
 * 站内消息相关API
 */

import request from '@/utils/request'

/**
 * 获取站内消息列表
 * @param params
 */
export function getNotificationList(params) {
  return request({
    url: 'system/messages',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 发布新的站内消息
 * @param params
 */
export function releaseNotification(params) {
  return request({
    url: 'system/messages',
    method: 'post',
    data: params
  })
}
