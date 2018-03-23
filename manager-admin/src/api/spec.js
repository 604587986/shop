/**
 * 规格管理API
 */

import request from '@/utils/request'
import SpecModel from '@/models/SpecModel'

/**
 * 获取规格列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSpecs(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/specs',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SpecModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加规格
 * @param params
 * @returns {Promise<any>}
 */
export function addSpec(params) {
  const _formData = new FormData()
  _formData.append('spec_name', params.name)
  _formData.append('spec_memo', params.memo)
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/specs',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function eidtSpec(id, params) {
  const _formData = new FormData()
  _formData.append('spec_name', params.name)
  _formData.append('spec_memo', params.memo)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/specs/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除规格
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteSpecs(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `goods/specs/${ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
