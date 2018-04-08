/**
 * 限时活动相关API
 */

import request from '@/utils/request'
import * as LimitTimeModel from '@/models/LimitTimeModel'

/**
 * 获取限时活动列表
 * @param params
 * @returns {Promise<any>}
 */
export function getLimitTimeActivityList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/limit/time/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new LimitTimeModel.LimitTimeActivitys().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取限时活动商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getLimitTimeGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/limit/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new LimitTimeModel.LimitTimeActivitys().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取限时活动详情
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getLimitTimeActivityDetails(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/limit/time/details/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      const _response = response
      _response.data = new LimitTimeModel.LimitTimeActivitydetails().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 限时活动报名
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function signUpLimitTimeActivity(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/limit/sign/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

