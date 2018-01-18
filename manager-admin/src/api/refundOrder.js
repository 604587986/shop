/**
 * 退款单API
 */
import request from '@/utils/request'
import RefundOrderModel from '@/models/RefundOrderModel'

/**
 * 获取退款单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRefundList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/after-sale/admin/refund-all.do',
      method: 'get',
      params
    }).then(response => {
      const _response = response
      _response.data = new RefundOrderModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
