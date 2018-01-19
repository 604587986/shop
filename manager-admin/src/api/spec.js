/**
 * 规格管理API
 */
import request from '@/utils/request'
import SpecModel from '@/models/SpecModel'

/**
 *
 * @param params
 * @returns {Promise<any>}
 */
export function getSpecs(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'goods-info/admin/spec.do',
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
  const _params = {
    spec_name: params.name,
    spec_memo: params.memo,
    spec_type: params.type || 0
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => {
    _formData.append(key, _params[key])
  })
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/admin/spec.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除规格
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function eidtSpec(id, params) {
  const _params = {
    spec_name: params.name,
    spec_memo: params.memo,
    spec_type: params.type || 0
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => {
    _formData.append(key, _params[key])
  })
  return new Promise((resolve, reject) => {
    request({
      url: `goods/admin/spec/${id}.do`,
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
  if (Array.isArray(ids)) {
    ids = ids.join(',')
  }
  return new Promise((resolve, reject) => {
    request({
      url: `goods/admin/spec/${ids}.do`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
