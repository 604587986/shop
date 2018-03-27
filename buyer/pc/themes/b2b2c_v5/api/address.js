/**
 * 收货地址相关API
 */

import request from '@/utils/request'

/**
 * 获取收货地址列表
 * @returns {Promise<any>}
 */
export function getAddressList() {
  return new Promise((resolve, reject) => {
    request({
      url: 'address/list',
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 添加收货地址
 * @param params
 * @returns {Promise<any>}
 */
export function addAddress(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'address',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑地址
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editAddress(id, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `address/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除收货地址
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteAddress(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `address/${ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
