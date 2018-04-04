/**
 * 团购商品相关API
 */

import request from '@/utils/request'
import * as GroupBuyModel from '../models/GroupBuyModel'

/**
 * 获取团购商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupBuyGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GroupBuyModel.GroupBuy().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除团购商品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteGroupBuyGoods(ids, params) {
  const _formdata = new FormData()
  Object.keys(params).forEach(key => _formdata.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/group/buy/${ids}`,
      method: 'delete',
      loading: false,
      data: _formdata
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存团购商品详情 更新操作
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveGroupBuyGoods(ids, params) {
  const _formdata = new FormData()
  Object.keys(params).forEach(key => _formdata.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/group/buy/reserve/${ids}`,
      method: 'post',
      loading: false,
      data: _formdata
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 新增团购商品
 * @param params
 * @returns {Promise<any>}
 */
export function addGroupBuyGoods(params) {
  const _formdata = new FormData()
  Object.keys(params).forEach(key => _formdata.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/group/buy/increase',
      method: 'post',
      loading: false,
      data: _formdata
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取团购商品详情
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupBuyGoodsDetails(ids, params) {
  const _formdata = new FormData()
  Object.keys(params).forEach(key => _formdata.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activitys/group/goods/${ids}`,
      method: 'post',
      loading: false,
      data: _formdata
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

