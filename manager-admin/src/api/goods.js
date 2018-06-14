/**
 * 商品管理API
 */

import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 */
export function getGoodsList(params) {
  return request({
    url: '/goods',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 下架商品
 * @param goods_id 商品ID
 * @param reason 下架原因
 * @returns {*}
 */
export function underGoods(goods_id, reason) {
  return request({
    url: `/goods/${goods_id}/under`,
    method: 'put',
    data: { reason }
  })
}

/**
 * 上架商品
 * @param goods_id 商品ID
 * @returns {*}
 */
export function upGoods(goods_id) {
  return request({
    url: `/goods/${goods_id}/up`,
    method: 'put'
  })
}

/**
 * 获取待审核商品列表
 * @param params
 */
export function getAuditGoods(params) {
  params.is_auth = 0
  return request({
    url: `/goods`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 审核商品
 * @param goods_id
 * @param params
 * @returns {*}
 */
export function auditGoods(goods_id, params) {
  return request({
    url: `goods/${goods_id}/auth`,
    method: 'put',
    data: params
  })
}
