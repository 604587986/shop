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

/**
 * 添加发票内容
 * @param content
 * @returns {Promise<any>}
 */
export function addReceiptContent(content) {
  const _formData = new FormData()
  _formData.append('receipt_content', content)
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/receipt/add-save.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑发票内容
 * @param id
 * @param content
 * @returns {Promise<any>}
 */
export function editReceiptContent(id, content) {
  const _formData = new FormData()
  _formData.append('contentid', id)
  _formData.append('receipt_content', content)
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/receipt/edit-save.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除发票内容
 * @param id
 * @returns {Promise<any>}
 */
export function deleteReceiptContent(id) {
  const _formData = new FormData()
  _formData.append('contentid', id)
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/receipt/delete.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
