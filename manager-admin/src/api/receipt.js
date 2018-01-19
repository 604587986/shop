import request from '@/utils/request'
import ReceiptModel from '@/models/ReceiptModel'

/**
 * 获取发票历史
 * @param params
 * @returns {Promise<any>}
 */
export function getHistoryReceiptList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/receipt/history-list-json.do',
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
