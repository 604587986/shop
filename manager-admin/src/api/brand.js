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
 */
export function addBrand(params) {
  return request({
    url: 'goods/brands',
    method: 'post',
    data: params
  })
}

/**
 * 获取品牌详情
 * @param id
 */
export function getBrandDetail(id) {
  return request({
    url: `goods/brands/${id}`,
    method: 'get'
  })
}

/**
 * 编辑品牌
 * @param id
 * @param params
 */
export function editBrand(id, params) {
  return request({
    url: `goods/brands/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除品牌
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteBrand(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `goods/brands/${ids}`,
    method: 'delete'
  })
}

