/**
 * 储存方案相关API
 */

import request from '@/utils/request'

/**
 * 获取储存方案列表
 * @param params
 */
export function getStorageSolutionList(params) {
  return request({
    url: 'system/uploaders',
    method: 'get',
    loading: false,
    params
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
    method: 'put'
  })
}
