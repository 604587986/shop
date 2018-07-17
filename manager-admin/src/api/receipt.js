/**
 * 发票相关API
 */

import request from '@/utils/request'

/**
 * 获取发票历史
 * @param params
 */
export function getHistoryReceiptList(params) {
  return request({
    url: 'shop/admin/receipt/history-list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取发票内容列表
 * @param params
 */
export function getReceiptContentList(params) {
  return request({
    url: 'systems/receipt-contents',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加发票内容
 * @param content
 */
export function addReceiptContent(content) {
  return request({
    url: 'systems/receipt-contents',
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
    url: `systems/receipt-contents/${id}`,
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
    url: `systems/receipt-contents/${id}`,
    method: 'delete'
  })
}
