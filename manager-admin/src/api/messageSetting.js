/**
 * 消息设置相关API
 */

import request from '@/utils/request'

/**
 * 获取消息列表
 * @param type 1：店铺消息 1：会员消息 2：其它消息
 * @param params
 * @returns {Promise<any>}
 */
export function getMessageSettingList(type, params) {
  return request({
    url: `b2b2c/admin/message-template/list-json.do?type=${type}`,
    method: 'get',
    loading: false,
    params
  })
}
