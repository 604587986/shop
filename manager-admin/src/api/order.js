import request from '@/utils/request'
import OrderModel from '@/models/OrderModel'

/**
 * 获取订单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/order-query/admin/order.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new OrderModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
