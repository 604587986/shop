/* eslint-disable */

/**
 * 提现管理API
 */

import request from '@/utils/request'

/**
 * 获取提现列表
 * @param params
 */
export function cashList(params) {
  return request({
    url: '/admin/cashwithdrawal',
    method: 'get',
    loading: false,
    params
  })
}
/**
 * 提现
 * @param id
 * @param params
 */
export function confirm(id, params) {
    return request({
      url: `admin/cashwithdrawal/${id}/Operation`,
      method: 'put',
      data: params
    })
  }
  
