/**
 * 分类管理API
 */
import request from '@/utils/request'

/** 添加分类 */
export function addCategory(params) {
  const _params = {
    cattype: 0,
    name: params.category_name,
    image: params.category_image,
    parent_id: params.parent_id,
    category_order: params.category_order,
    list_show: 1
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/goods-info/admin/category/save-add.do',
      method: 'post',
      params: _params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 编辑分类 */
export function editCategory(category_id, params) {
  const _params = {
    category_id: category_id,
    cattype: 0,
    name: params.category_name,
    image: params.category_image,
    parent_id: params.parent_id,
    category_order: params.category_order,
    list_show: 1
  }
  return new Promise((resolve, reject) => {
    request({
      url: `http://localhost:9090/javashop/goods-info/admin/category/save-edit.do`,
      method: 'post',
      params: _params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 根据分类ID获取分类关联品牌数据 */
export function getBrandByCategoryId(category_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://localhost:9090/javashop/goods-info/admin/category/${category_id}/brand.do`,
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
      url: `http://localhost:9090/javashop/goods-info/admin/category/${category_id}/brand.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 根据分类ID获取分类关联规格数据 */
export function getSpecsByCategoryId(category_id) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://localhost:9090/javashop/goods-info/admin/category/${category_id}/spec.do`,
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
      url: `http://localhost:9090/javashop/goods-info/admin/category/${category_id}/spec.do`,
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
      url: `http://localhost:9090/javashop/goods-info/admin/category/delete/${ids}.do`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
