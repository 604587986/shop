/**
 * 优惠券相关API
 */

import request from '@/utils/request'
import * as CouponModel from '@/models/CouponModel'

/**
 * 获取优惠券模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getCouponsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/coupons',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new CouponModel.Coupon().map(response.data)
      resolve(_response)
    })
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
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/coupons/${ids}`,
      method: 'delete',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
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
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/coupons/${ids}`,
      method: 'put',
      loading: false,
      headers: { 'Content-Type': 'application/json' },
      data: new CouponModel.Coupon().params(params)
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 新增优惠券
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function addCoupons(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/coupons',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      loading: false,
      data: new CouponModel.Coupon().params(params)
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查询一个优惠券的详情
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getCouponDetails(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/coupons/${id}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = new CouponModel.Coupon().map(response)
      resolve(_response)
    })
  })
}
