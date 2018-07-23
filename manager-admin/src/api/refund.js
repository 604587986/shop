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
 * @param params
 */
export function refundMoney(sn, params) {
  return request({
    url: `after-sales/refunds/${sn}`,
    method: 'post',
    data: params
  })
}

/**
 * 导出Excel
 * @param params
 */
export function exportRefundExcel(params) {
  params = JSON.parse(JSON.stringify(params))
  params.page_size = 9999999
  return request({
    url: 'after-sales/refund',
    method: 'get',
    params
  })
}
