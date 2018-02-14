/**
 * 电子面单相关API
 */

import request from '@/utils/request'
import ElectronicReceiptModel from '@/models/ElectronicReceiptModel'

/**
 * 获取电子面单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getElectronicReceiptList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/waybill/waybill-list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ElectronicReceiptModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 编辑电子面单
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editElectronicReceipt(id, params) {
  const _params = {
    id,
    bill_config: JSON.stringify(params)
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/waybill/save-edit.do',
      method: 'post',
      data: _params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
