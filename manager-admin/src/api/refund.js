/**
 * 退款单API
 */
import request from '@/utils/request'
import RefundModel from '@/models/RefundModel'
import GoodsModel from '@/models/GoodsModel'

/**
 * 获取退款单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRefundList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'after-sale/admin/refund-all.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new RefundModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取售后详情
 * @param sn
 * @returns {Promise<any>}
 */
export function getRefundDetail(sn) {
  return new Promise((resolve, reject) => {
    request({
      url: `after-sale/admin/refund/${sn}.do`,
      method: 'get',
      loading: false
    }).then(response => {
      const _response = response
      _response.goods = new GoodsModel().map(response.goods)
      _response.refund = new RefundModel().map(response.refund)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
