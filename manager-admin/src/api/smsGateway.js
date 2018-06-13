/**
 * 短信网关相关API
 */

import request from '@/utils/request'

/**
 * 获取短信网关列表
 * @param params
 */
export function getSmsGatewayList(params) {
  return request({
    url: 'system/platforms',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 修改短信网关参数
 * @param id 短信网关ID
 * @param params 短信网关参数
 * @returns {*}
 */
export function editSmsGateway(id, params) {
  return request({
    url: `system/platforms/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 开启短信网关
 * @param id
 * @returns {*}
 */
export function openSmsGatewayById(id) {
  return request({
    url: `/system/platforms/${id}/open`,
    method: 'post'
  })
}
