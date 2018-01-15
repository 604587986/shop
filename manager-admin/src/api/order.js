import request from '@/utils/request'
import OrderModel from '@/models/OrderModel'
import ProductModel from '@/models/ProductModel'

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

/**
 * 根据订单sn获取订单详情
 * @param sn
 * @returns {Promise<any>}
 */
export function getOrderDetail(sn) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://localhost:9090/javashop/order-query/admin/order/${sn}.do`,
      method: 'get',
      loading: false
    }).then(response => {
      const _response = new OrderModel().map(response)
      _response.productList = new ProductModel().map(_response.productList)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
