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
      url: 'payment/payment-methods',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = new PaymentModel().map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 修改支付方式
 * @param payment_plugin_id 支付方式code
 * @param payment_method 支付方式详细配置
 * payment_method:
 * {
 * "enable_client": [
 *   {
 *     "config_list": [
 *       {
 *         "name": "string",
 *         "value": "string"
 *       }
 *     ],
 *     "is_open": 0,
 *     "key": "string",
 *     "name": "string"
 *   }
 * ],
 * "image": "string",
 * "is_retrace": 0
 * }
 */
export function editPayment(payment_plugin_id, payment_method) {
  return request({
    url: `payment/payment-methods/${payment_plugin_id}`,
    method: 'put',
    headers: { 'Content-Type': 'appliaction/json' },
    data: { payment_method }
  })
}

/**
 * 获取支付方式详情
 * @param payment_plugin_id
 */
export function getPaymentDetail(payment_plugin_id) {
  return request({
    url: `payment/payment-methods/${payment_plugin_id}`,
    method: 'get'
  })
}
