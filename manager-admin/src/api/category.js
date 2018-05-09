/**
 * 分类管理API
 */
import request from '@/utils/request'

/**
 * 添加分类
 * @param params
 */
export function addCategory(params) {
  const _params = {
    name: params.category_name,
    parent_id: params.parent_id,
    category_order: params.category_order,
    image: params.category_image
  }
  return request({
    url: 'goods/categories',
    method: 'post',
    data: _params
  })
}

/**
 * 编辑分类
 * @param id
 * @param params
 */
export function editCategory(id, params) {
  const _params = {
    name: params.category_name,
    parent_id: params.parent_id,
    category_order: params.category_order,
    image: params.category_image
  }
  return request({
    url: `goods/categories/${id}`,
    method: 'put',
    data: _params
  })
}

/**
 * 根据分类ID获取分类关联品牌数据
 * @param category_id
 * @returns {Promise<any>}
 */
export function getBrandByCategoryId(category_id) {
  return request({
    url: `goods/categories/${category_id}/brands`,
    method: 'get'
  })
}

/**
 * 编辑分类关联品牌
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function editCategoryBrand(category_id, params) {
  const _formData = new FormData()
  params.forEach(item => _formData.append('choose_brands', item))
  _formData.append('category_id', category_id)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/brands`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 根据分类ID获取分类关联规格数据
 * @param category_id
 * @returns {Promise<any>}
 */
export function getSpecsByCategoryId(category_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/specs`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑分类关联规格
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function editCategorySpecs(category_id, params) {
  const _formData = new FormData()
  params.forEach(item => _formData.append('choose_specs', item))
  _formData.append('category_id', category_id)
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/specs`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除分类
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteCategory(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取分类关联的参数
 * @param category_id
 * @returns {Promise<any>}
 */
export function getCategoryParams(category_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `goods/categories/${category_id}/param`,
      method: 'get'
    }).then(response => resolve(response))
  })
}
