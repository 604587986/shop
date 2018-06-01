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
      url: 'shop/admin/receipt/history-list-json.do',
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
      url: 'receipt-contents',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = new ReceiptContentModel().map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加发票内容
 * @param content
 */
export function addReceiptContent(content) {
  return request({
    url: 'receipt-contents',
    method: 'post',
    data: { content }
  })
}

/**
 * 编辑发票内容
 * @param id
 * @param content
 */
export function editReceiptContent(id, content) {
  return request({
    url: `receipt-contents/${id}`,
    method: 'put',
    data: { content }
  })
}

/**
 * 删除发票内容
 * @param id
 */
export function deleteReceiptContent(id) {
  return request({
    url: `receipt-contents/${id}`,
    method: 'delete'
  })
}
