/**
 * 储存方案相关API
 */

import request from '@/utils/request'
import StorageSolutionModel from '@/models/StorageSolutionModel'

const storageSolutionModel = new StorageSolutionModel()

/**
 * 获取储存方案列表
 * @param params
 * @returns {Promise<any>}
 */
export function getStorageSolutionList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'system/uploaders',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = storageSolutionModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加储存方案
 * @param params
 * @returns {*}
 */
export function addStorageSolution(params) {
  return request({
    url: 'system/uploaders',
    method: 'post',
    data: params
  })
}

/**
 * 编辑储存方案
 * @param id
 * @param params
 */
export function editStorageSolution(id, params) {
  return request({
    url: `system/uploaders/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: storageSolutionModel.params(params)
  })
}

/**
 * 获取储存方案配置项
 * @param code
 * @returns {*}
 */
export function getStorageSolutionConfig(code) {
  return request({
    url: `system/uploaders/${code}/setting`,
    method: 'get'
  })
}

/**
 * 开启储存方案
 * @param id
 * @returns {*}
 */
export function openStorageSolutionById(id) {
  return request({
    url: `system/uploaders/${id}/open`,
    method: 'post'
  })
}
