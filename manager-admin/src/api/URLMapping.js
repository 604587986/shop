/**
 * URL映射相关API
 */

import request from '@/utils/request'
import URLMappingModel from '@/models/URLMappingModel'

/**
 * 获取URL映射列表
 * @param params
 * @returns {Promise<any>}
 */
export function getURLMappingList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/themeUri/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new URLMappingModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加URL映射
 * @param params
 * @returns {Promise<any>}
 */
export function addURLMapping(params) {
  const _params = {
    uri: params.path_regexp,
    path: params.path,
    httpcache: params.http_cache,
    pagename: params.page_name,
    point: params.point || 0,
    keywords: params.keywords,
    description: params.description
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/themeUri/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑URL映射
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editURLMapping(id, params) {
  const _params = {
    id: params.id,
    uri: params.path_regexp,
    path: params.path,
    httpcache: params.http_cache,
    pagename: params.page_name,
    point: params.point || 0,
    keywords: params.keywords,
    description: params.description
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/themeUri/save-edit.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteURLMapping(ids) {
  return new Promise((resolve, reject) => {
    request({
      url: `core/admin/themeUri/delete.do?id=${ids}`,
      method: 'post'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
