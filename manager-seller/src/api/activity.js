/**
 * 活动相关API
 */

import request from '@/utils/request'
import * as ActivityModel from '@/models/ActivityModel'

/**
 * 获取活动模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getActivityList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ActivityModel.Activity().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除活动模型
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function deleteActivity(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/${ids}`,
      method: 'delete',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 新增活动
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function addActivity(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/increase',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存活动 更新
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function saveActivity(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/reserve/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 活动报名
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function signUpActivity(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/sign/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
