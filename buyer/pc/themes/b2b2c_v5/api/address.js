/**
 * 收货地址相关API
 */

import request from '@/utils/request'

/**
 * 获取收货地址列表
 * @returns {AxiosPromise}
 */
export function getAddressList() {
  return request({
    url: 'address/list',
    method: 'get'
  })
}

/**
 * 添加收货地址
 * @param params
 * @returns {AxiosPromise}
 */
export function addAddress(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: 'address',
    method: 'post',
    data: _formData
  })
}

/**
 * 编辑地址
 * @param id
 * @param params
 * @returns {AxiosPromise}
 */
export function editAddress(id, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: `address/${id}`,
    method: 'post',
    data: _formData
  })
}

/**
 * 删除收货地址
 * @param ids
 * @returns {AxiosPromise}
 */
export function deleteAddress(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `address/${ids}`,
    method: 'delete'
  })
}
