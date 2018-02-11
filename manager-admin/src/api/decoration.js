/**
 * 装修相关API
 */

import request from '@/utils/request'
import * as DecorationModel from '@/models/DecorationModel'

/**
 * 获取模板列表 - PC
 * @param params
 * @returns {Promise<any>}
 */
export function getPCTplList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/panel-tpl.do?client_type=pc',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new DecorationModel.Template().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加模板 - PC
 * @param params
 * @returns {Promise<any>}
 */
export function addPCTpl(params) {
  const _params = {
    tpl_name: params.tpl_name,
    tpl_type: params.tpl_type,
    tpl_content: params,
    client_type: 'pc'
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/panel-tpl.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除模板 - PC
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteTpl(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  return new Promise((resolve, reject) => {
    request({
      url: `cms/admin/panel-tpl/${ids.join(',')}.do`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取楼层列表 - PC
 * @param params
 * @returns {Promise<any>}
 */
export function getPCFloorList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/floor.do?client_type=pc',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new DecorationModel.Floor().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取焦点图列表 - PC
 * @param params
 * @returns {Promise<any>}
 */
export function getPCFocusList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/focus.do?client_type=pc',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new DecorationModel.Focus().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
