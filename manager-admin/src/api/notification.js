/**
 * 商城通知相关API
 */

import request from '@/utils/request'

/**
 * 获取站内通知列表
 * @param params
 */
export function getNotificationList(params) {
  return request({
    url: 'shop/admin/message/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 发布新的商城通知
 * @param params
 */
export function releaseNotification(params) {
  return request({
    url: 'shop/admin/message/save-message.do',
    method: 'post',
    data: params
  })
}
