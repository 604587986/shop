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
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gifts/list',
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
export function deleteGifts(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gifts/${ids}`,
      method: 'delete',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存赠品更新
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveGifts(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gifts/reserve/${ids}`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 新增赠品
 * @param params
 * @returns {Promise<any>}
 */
export function addGifts(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/gifts/increase',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
