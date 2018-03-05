/**
 * 支付方式相关API
 */

import request from '@/utils/request'
import PaymentModel from '@/models/PaymentModel'

/**
 * 获取支付方式列表
 * @param params
 * @returns {Promise<any>}
 */
export function getPaymentList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'order-pay/admin/payment/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new PaymentModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
