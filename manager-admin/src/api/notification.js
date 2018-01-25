import request from '@/utils/request'
import NotificationModel from '@/models/NotificationModel'

/**
 * 获取站内通知列表
 * @param params
 * @returns {Promise<any>}
 */
export function getNotificationList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/message/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new NotificationModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 发布新的商城通知
 * @param params
 * @returns {Promise<any>}
 */
export function releaseNotification(params) {
  const _params = {
    msg_title: params.title,
    msg_content: params.content,
    send_type: params.type,
    member_ids: params.ids
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/message/save-message.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
