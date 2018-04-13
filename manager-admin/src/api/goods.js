/**
 * 商品管理API
 */

import request from '@/utils/request'
import GoodsModel from '@/models/GoodsModel'

/**
 * 获取商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/goods',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 下架商品
 * @param goods_id
 * @param reason
 * @returns {Promise<any>}
 */
export function underGoods(goods_id, reason) {
  const _formData = new FormData()
  _formData.append('reason', reason)
  return request({
    url: `/goods/${goods_id}/under`,
    method: 'post',
    data: _formData
  })
}

/**
 * 获取待审核商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getAuditGoods(params) {
  params.is_auth = 0
  return new Promise((resolve, reject) => {
    request({
      url: `/goods`,
      method: 'get',
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 审核商品
 * @param goods_id
 * @param params
 * @returns {*}
 */
export function auditGoods(goods_id, params) {
  const _formData = new FormData()
  _formData.append('pass', params.pass)
  _formData.append('message', params.message)
  return request({
    url: `goods/${goods_id}/auth`,
    method: 'post',
    data: _formData
  })
}
