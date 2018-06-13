/**
 * 退款单API
 */

import request from '@/utils/request'

/**
 * 获取退款单列表
 * @param params
 */
export function getRefundList(params) {
  return request({
    url: 'after-sale/admin/refund-all.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取售后详情
 * @param sn
 */
export function getRefundDetail(sn) {
  return request({
    url: `after-sale/admin/refund/${sn}.do`,
    method: 'get',
    loading: false
  })
}
