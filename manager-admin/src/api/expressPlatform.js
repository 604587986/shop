/**
 * 快递相关API
 */

import request from '@/utils/request'
import ExpressPlatformModel from '@/models/ExpressPlatformModel'

/**
 * 获取快递平台列表
 * @param params
 * @returns {Promise<any>}
 */
export function getExpressPlatformList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/express/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ExpressPlatformModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 开启快递平台
 * @param id
 * @returns {Promise<any>}
 */
export function openExpressPlatformById(id) {
  const _params = { id }
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/express/set-open.do',
      method: 'get',
      params: _params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
