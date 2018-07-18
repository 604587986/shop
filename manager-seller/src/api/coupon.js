/**
 * 优惠券相关API
 */

import request from '@/utils/request'

/**
 * 获取优惠券模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getCouponsList(params) {
  return request({
    url: '/promotion/coupons',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除优惠券
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function deleteCoupons(ids, params) {
  return request({
    url: `/promotion/coupons/${ids}`,
    method: 'delete',
    loading: false,
    params
  })
}

/**
 * 保存优惠券 更新操作
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function modifyCoupons(ids, params) {
  return request({
    url: `/promotion/coupons/${ids}`,
    method: 'put',
    loading: false,
    data: params
  })
}

/**
 * 新增优惠券
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function addCoupons(params) {
  return request({
    url: '/promotion/coupons',
    method: 'post',
    loading: false,
    data: params
  })
}

/**
 * 查询一个优惠券的详情
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getCouponDetails(id, params) {
  return request({
    url: `/promotion/coupons/${id}`,
    method: 'get',
    loading: false,
    params
  })
}
