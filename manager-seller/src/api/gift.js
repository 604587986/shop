/**
 * 赠品管理API
 */

import request from '@/utils/request'
import * as GiftModel from '@/models/GiftModel'

/**
 * 获取赠品品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGiftsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gift/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GiftModel.Gift().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除赠品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteGift(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gift/${ids}`,
      method: 'delete',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存赠品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveGift(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gift/save/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
