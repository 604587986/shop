/**
 * 标签管理API
 */
import request from '@/utils/request'
import TagModel from '@/models/TagModel'

/**
 *
 * @param params
 * @returns {Promise<any>}
 */
export function getTags(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/tag/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new TagModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加标签
 * @param params
 * @returns {Promise<any>}
 */
export function addTag(params) {
  const _params = {
    tag_name: params.name,
    type: params.type || 0
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/tag/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除标签
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function eidtTag(id, params) {
  const _params = {
    tag_id: id,
    tag_name: params.name
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/tag/save-edit.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除标签
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteTags(ids) {
  // if (Array.isArray(ids)) {
  //   ids = ids.join(',')
  // }
  if (!Array.isArray(ids)) {
    ids = [ids]
  }
  const _formData = new FormData()
  ids.forEach(item => _formData.append('tag_id', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/tag/delete.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
