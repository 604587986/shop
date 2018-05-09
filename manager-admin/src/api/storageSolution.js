/**
 * 储存方案相关API
 */

import request from '@/utils/request'
import StorageSolutionModel from '@/models/StorageSolutionModel'

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
      const _response = response
      // _response.data = new StorageSolutionModel().map(response.data)
      resolve(_response)
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
