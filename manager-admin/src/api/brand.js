/**
 * 品牌管理API
 */

import request from '@/utils/request'
import BrandModel from '@/models/BrandModel'

/**
 * 获取品牌列表
 * @param params
 * @returns {Promise<any>}
 */
export function getBrandList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/brands',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new BrandModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加品牌
 * @param params
 * @returns {Promise<any>}
 */
export function addBrand(params) {
  const _formData = new FormData()
  _formData.append('name', params.name)
  _formData.append('logo', params.logo)
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/brands',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取品牌详情
 * @param id
 * @returns {Promise<any>}
 */
export function getBrandDetail(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/brands/${id}`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑品牌
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editBrand(id, params) {
  const _formData = new FormData()
  _formData.append('name', params.name)
  _formData.append('logo', params.logo)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/brands/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除品牌
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteBrand(ids) {
  ids = Array.isArray(ids) ? ids : [ids]
  return new Promise((resolve, reject) => {
    request({
      url: `goods/brands/${ids.join(',')}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

