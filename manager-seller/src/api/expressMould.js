/**
 * 快递模板相关API
 */

import request from '@/utils/request'
import ExpressMouldModel from '@/models/ExpressMouldModel'

/**
 * 运费模版列表
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getTplList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/ship-templates`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ExpressMouldModel().map(_response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 查询单个运费模版
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getSimpleTpl(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/ship-templates/${id}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = new ExpressMouldModel().map(response)
      resolve(_response)
    })
  })
}

/**
 * 删除快递模板
 * @param params
 * @returns {Promise<any>}
 */
export function deleteExpressMould(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/ship-templates/${ids}`,
      method: 'delete',
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 更新运费模板
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveExpressMould(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/ship-templates/${ids}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 添加运费模版
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function addExpressMould(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/ship-templates',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}
