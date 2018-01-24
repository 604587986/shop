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
