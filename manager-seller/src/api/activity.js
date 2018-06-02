/**
 * 活动相关API
 */

import request from '@/utils/request'
import * as ActivityModel from '@/models/ActivityModel'

/**
 * 获取满减活动列表
 * @param params
 * @returns {Promise<any>}
 */
export function getFullCutActivityList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/full-discounts',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ActivityModel.Activity().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 删除满减活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function deleteFullCutActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/full-discounts/${ids}`,
      method: 'delete',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 新增满减活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function addFullCutActivity(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/full-discounts',
      method: 'post',
      loading: false,
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 修改满减活动内容
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function saveFullCutActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/full-discounts/${ids}`,
      method: 'put',
      loading: false,
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 获取满减单个活动详情
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getFullCutActivityDetails(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/full-discounts/${ids}`,
      method: 'get',
      loading: false,
      data: params
    }).then(response => {
      const _response = new ActivityModel.Activity().map(response)
      resolve(_response)
    })
  })
}

/**
 * 获取单品立减活动列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSingleCutActivityList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/minus',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ActivityModel.Activity().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 删除单品立减活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteSingleCutActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/minus/${ids}`,
      method: 'delete',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 新增单品立减活动
 * @param params
 * @returns {Promise<any>}
 */
export function addSingleCutActivity(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/minus',
      method: 'post',
      loading: false,
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 修改单品立减活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveSingleCutActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/minus/${ids}`,
      method: 'put',
      loading: false,
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 获取一个单品立减活动洗详情
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getSingleCutActivityDetails(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/minus/${ids}`,
      method: 'get',
      loading: false,
      data: params
    }).then(response => {
      const _response = new ActivityModel.Activity().map(response)
      resolve(_response)
    })
  })
}

/**
 * 获取第二件半价活动列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSecondHalfActivityList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/half-prices',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ActivityModel.Activity().map(response.data)
      resolve(_response)
    })
  })
}

/**
 * 删除第二件半价活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteSeconedHalfActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/half-prices/${ids}`,
      method: 'delete',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 新增第二件半价活动
 * @param params
 * @returns {Promise<any>}
 */
export function addSeconedHalfActivity(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/half-prices',
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 修改第二件半价活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveSeconedHalfActivity(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/half-prices/${ids}`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}
