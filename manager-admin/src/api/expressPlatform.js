/**
 * 快递相关API
 */

import request from '@/utils/request'

/**
 * 获取快递平台列表
 * @param params
 * @returns {Promise<any>}
 */
export function getExpressPlatformList(params) {
  return request({
    url: 'shop/admin/express/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 开启快递平台
 * @param id
 * @returns {Promise<any>}
 */
export function openExpressPlatformById(id) {
  const _params = { id }
  return request({
    url: 'shop/admin/express/set-open.do',
    method: 'get',
    params: _params
  })
}
