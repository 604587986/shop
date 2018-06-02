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
      url: '/promotion/seckill-applys/seckill',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new LimitTimeModel.LimitTimeActivitys().map(response.data)
      resolve(_response)
    })
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
      url: '/promotion/seckill-applys',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new LimitTimeModel.LimitTimeActivitys().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 获取限时活动详情
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getLimitTimeActivityDetails(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/seckill-applys/${ids}`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      const _response = response
      _response.data = new LimitTimeModel.LimitTimeActivitydetails().map(response.data)
      resolve(_response)
    })
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
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/seckill-applys',
      method: 'post',
      loading: false,
      data: new LimitTimeModel.LimitTimeActivitydetails().params(params)
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 删除限时抢购申请 取消报名
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteLimitTimeActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/seckill-applys/${ids}`,
      method: 'delete',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

