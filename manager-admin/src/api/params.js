/**
 * 参数相关API
 */

import request from '@/utils/request'

/**
 * 添加参数组
 * @param params
 * @returns {Promise<any>}
 */
export function addParamsGroup(params) {
  const _formData = new FormData()
  _formData.append('group_name', params.group_name)
  _formData.append('category_id', params.category_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/parameter-groups',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 修改参数组
 * @param group_id
 * @param params
 * @returns {Promise<any>}
 */
export function editParamsGroup(group_id, params) {
  const _formData = new FormData()
  _formData.append('group_name', params.group_name)
  _formData.append('category_id', params.category_id)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameter-groups/${group_id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除参数组
 * @param group_id
 * @returns {Promise<any>}
 */
export function deleteParamsGroup(group_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameter-groups/${group_id}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 参数组排序
 * @param group_id
 * @param sort_type
 * @returns {Promise<any>}
 */
export function sortParamsGroup(group_id, sort_type) {
  const _formData = new FormData()
  _formData.append('sort_type', sort_type)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameter-groups/${group_id}/sort`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取参数组详情
 * @param id
 * @returns {Promise<any>}
 */
export function getParamsGroupDetail(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameter-groups/${id}`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 添加参数
 * @param params
 * @returns {Promise<any>}
 */
export function addParams(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/parameters',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 *  编辑参数
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editParams(id, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameters/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除参数
 * @param id
 * @returns {Promise<any>}
 */
export function deleteParams(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameters/${id}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 参数排序
 * @param param_id
 * @param sort_type
 * @returns {Promise<any>}
 */
export function sortParams(param_id, sort_type) {
  const _formData = new FormData()
  _formData.append('sort_type', sort_type)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameters/${param_id}/sort`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取参数详情
 * @param id
 * @returns {Promise<any>}
 */
export function getParamDetail(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/parameters/${id}`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}