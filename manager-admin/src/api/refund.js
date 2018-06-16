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
    url: 'after-sales/refund',
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
    url: `after-sales/refund/${sn}`,
    method: 'get',
    loading: false
  })
}

/**
 * 平台退款
 * @param sn
 */
export function refundMoney(sn) {
  return request({
    url: `after-sales/refunds/${sn}`,
    method: 'post'
  })
}

/**
 * 导出Excel
 * @param start_time
 * @param end_time
 */
export function exportRefundExcel(start_time, end_time) {
  return request({
    url: 'after-sales/exports/excel',
    method: 'get',
    params: {
      start_time,
      end_time
    }
  })
}
