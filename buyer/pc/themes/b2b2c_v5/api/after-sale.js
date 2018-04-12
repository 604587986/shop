/**
 * 申请售后相关API
 */

import request from '@/utils/request'

/**
 * 获取售后列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getAfterSale(params) {
  return request({
    url: '/after-sale',
    method: 'get',
    params
  })
}

/**
 * 申请售后
 * @param params
 * @returns {AxiosPromise}
 */
export function applyAfterSale(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: '/after-sale',
    method: 'get',
    data: _formData
  })
}

/**
 * 获取售后详情
 * @param sn
 * @returns {AxiosPromise}
 */
export function getAfterSaleDetail(sn) {
  return request({
    url: `/after-sale/${sn}`,
    method: 'get'
  })
}
