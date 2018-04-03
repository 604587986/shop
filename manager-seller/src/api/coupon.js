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
export function getCouponList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/coupon/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new CouponModel.Coupon().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
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
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/coupon/${ids}`,
      method: 'delete',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 修改优惠券
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function modifyCoupon(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activity/sign/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
