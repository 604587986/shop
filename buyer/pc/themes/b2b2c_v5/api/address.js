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
    method: 'get'
  })
}

/**
 * 添加收货地址
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
export function addAddress(params) {
  return request({
    url: 'members/addresses',
    method: 'post',
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
    method: 'post',
    data: params
  })
}

/**
 * 删除收货地址
 * @param ids 地址ID集合【数组或单个ID】
 * @returns {AxiosPromise}
 */
export function deleteAddress(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/address/${ids}`,
    method: 'delete'
  })
}
