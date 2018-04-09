/**
 * 发票相关API
 */

import request from '@/utils/request'
import ReceiptModel, { ReceiptContentModel } from '@/models/ReceiptModel'

/**
 * 获取发票历史
 * @param params
 * @returns {Promise<any>}
 */
export function getHistoryReceiptList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/order/receipt/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ReceiptModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取发票内容列表
 * @param params
 * @returns {Promise<any>}
 */
export function getReceiptContentList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/receipt/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ReceiptContentModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
