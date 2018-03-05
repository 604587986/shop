/**
 * 消息设置相关API
 */

import request from '@/utils/request'
import MessageSettingModel from '@/models/MessageSettingModel'

/**
 * 获取消息列表
 * @param type 1：店铺消息 1：会员消息 2：其它消息
 * @param params
 * @returns {Promise<any>}
 */
export function getMessageSettingList(type, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `b2b2c/admin/message-template/list-json.do?type=${type}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new MessageSettingModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
