/**
 * 发票相关API
 */

import request from '@/utils/request'

/**
 * 获取发票历史
 * @param params
 * @returns {Promise<any>}
 */
export function getHistoryReceiptList(params) {
  return request({
    url: '/trade/receipts',
    method: 'get',
    loading: false,
    params
  })
}

