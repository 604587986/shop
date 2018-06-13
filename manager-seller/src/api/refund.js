/**
 * 退款单API
 */

import request from '@/utils/request'
import * as RefundModel from '@/models/RefundModel'

/**
 * 获取退款/货单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRefundList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/after-sales/refunds',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new RefundModel.Refund().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 退款/货 详情
 * @param sn
 * @returns {Promise<any>}
 */
export function getRefundDetails(sn) {
  return new Promise((resolve, reject) => {
    request({
      url: `/after-sales/refunds/${sn}`,
      method: 'get',
      loading: false
    }).then(response => {
      const _response = response
      _response.refund = new RefundModel.Refund().map(response.refund)
      _response.refund_goods_do = new RefundModel.RefundGoods().map(response.refund_goods_do)
      resolve(_response)
    })
  })
}

/**
 * 卖家审核退款/退货
 * @param sn
 * @param params
 * @returns {Promise<any>}
 */
export function refundAuth(sn, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/after-sales/audits/${sn}`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 卖家执行退款
 * @param sn
 * @param params
 * @returns {Promise<any>}
 */
export function toRefund(sn, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/after-sales/refunds/${sn}`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 入库操作
 * @param sn
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function wareHousing(sn, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/after-sales/stock-ins/${sn}`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}
