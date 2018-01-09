/**
 * 品牌管理API
 */

import request from '@/utils/request'
import BrandModel from '@/models/BrandModel'

/** 获取品牌列表 */
export function getBrandList(params) {
  const _params = {
    keyword: params.keyword,
    page_no: params.page_no,
    page_size: params.page_size
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/brand/list-json.do',
      method: 'get',
      loading: false,
      params: _params
    }).then(response => {
      const _response = response
      _response.data = new BrandModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/** 添加品牌 */
export function addBrand(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => {
    _formData.append(key, params[key])
  })
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/brand/save.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 编辑品牌 */
export function editBrand(id, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => {
    _formData.append(key, params[key])
  })
  _formData.append('brand_id', id)
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/brand/save-edit.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 删除分类 */
export function deleteBrand(ids) {
  if (!Array.isArray(ids)) {
    // ids = ids.join(',')
    ids = [ids]
  }
  const _formData = new FormData()
  ids.forEach(item => {
    _formData.append('brand_id', item)
  })
  return new Promise((resolve, reject) => {
    request({
      url: `http://localhost:9090/javashop/shop/admin/brand/delete.do`,
      // method: 'delete',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

