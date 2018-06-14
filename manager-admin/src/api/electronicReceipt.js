/**
 * 电子面单相关API
 */

import request from '@/utils/request'

/**
 * 获取电子面单列表
 * @param params
 */
export function getElectronicReceiptList(params) {
  return request({
    url: 'shop/admin/waybill/waybill-list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 编辑电子面单
 * @param id
 * @param params
 */
export function editElectronicReceipt(id, params) {
  return request({
    url: 'shop/admin/waybill/save-edit.do',
    method: 'post',
    data: params
  })
}
