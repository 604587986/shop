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
