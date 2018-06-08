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
    url: 'members/addresses',
    method: 'get',
    needToken: true
  })
}

/**
 * 添加收货地址
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
export function addAddress(params) {
  return request({
    url: 'members/address',
    method: 'post',
    needToken: true,
    data: params
  })
}

/**
 * 编辑地址
 * @param id 地址ID
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
export function editAddress(id, params) {
  return request({
    url: `members/address/${id}`,
    method: 'put',
    needToken: true,
    data: params
  })
}

/**
 * 删除收货地址
 * @param id
 */
export function deleteAddress(id) {
  return request({
    url: `members/address/${id}`,
    method: 'delete',
    needToken: true
  })
}
