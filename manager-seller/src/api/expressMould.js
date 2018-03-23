/**
 * 快递模板相关API
 */

import request from '@/utils/request'
import ExpressMouldModel from '@/models/expressMould'

/**
 * 获取快递模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getExpressMouldList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/logistics/tpl/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ExpressMouldModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除快递模板
 * @param params
 * @returns {Promise<any>}
 */
export function deleteExpressMould(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/${ids}`,
      method: 'delete',
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 更新（修改/添加）模板
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveExpressMould(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/logistics/tpl/${ids}`,
      method: 'post',
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

