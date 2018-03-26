/**
 * 分类管理API
 */
import request from '@/utils/request'

/** 添加分类 */
export function addCategory(params) {
  const _formData = new FormData()
  _formData.append('name', params.category_name)
  _formData.append('parent_id', params.parent_id)
  _formData.append('category_order', params.category_order)
  _formData.append('image', params.category_image)
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/categories',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 编辑分类 */
export function editCategory(id, params) {
  const _formData = new FormData()
  _formData.append('name', params.category_name)
  _formData.append('parent_id', params.parent_id)
  _formData.append('category_order', params.category_order)
  _formData.append('image', params.category_image)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 根据分类ID获取分类关联品牌数据 */
export function getBrandByCategoryId(category_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/specs`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 编辑分类关联品牌 */
export function editCategoryBrand(category_id, params) {
  const _formData = new FormData()
  params.forEach(item => {
    _formData.append('choose_brands', item)
  })
  _formData.append('category_id', category_id)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/brands`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 根据分类ID获取分类关联规格数据 */
export function getSpecsByCategoryId(category_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/specs`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 编辑分类关联规格 */
export function editCategorySpecs(category_id, params) {
  const _formData = new FormData()
  params.forEach(item => {
    _formData.append('choose_specs', item)
  })
  _formData.append('category_id', category_id)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/specs`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 删除分类 */
export function deleteCategory(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
