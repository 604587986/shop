/**
 * 申请售后相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取售后列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getAfterSale(params) {
  return request({
    url: 'after-sales/refunds',
    method: Method.GET,
    needToken: true,
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
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/after-sale',
    method: Method.GET,
    needToken: true,
    data: _formData
  })
}

/**
 * 获取售后详情
 * @param sn 订单编号
 * @returns {AxiosPromise}
 */
export function getAfterSaleDetail(sn) {
  return request({
    url: `after-sales/refund/${sn}`,
    method: Method.GET,
    needToken: true
  })
}
