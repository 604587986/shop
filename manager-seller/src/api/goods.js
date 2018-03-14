/**
 * 商品管理API
 */

import request from '@/utils/request'
import GoodsModel from '@/models/GoodsModel'

/**
 * 获取商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      // url: 'shop/admin/goods/list-json.do',
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 商品列表 下架商品
 * @param params deleteGoods
 * @returns {Promise<any>}
 */
export function underGoods(params) {
  const _params = {
    goodsId: params.goods_id,
    message: params.message
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/goods/under.do`,
      method: 'post',
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 商品列表 删除商品
 * @param params
 * @returns {Promise<any>}
 */
export function deleteGoods(params) {
  const ids = params.toString()
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/` + ids,
      method: 'delete',
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取库存商品数据
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStockList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存库存商品
 * @param params
 * @returns {Promise<any>}
 */
export function reserveStockGoods(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/reserve`,
      method: 'post',
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取草稿箱商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getDraftGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/draft/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取回收站商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRecycleGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/recycle/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 回收站 还原商品
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function RecycleReductionGoods(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/recycle/revert/`,
      method: 'post',
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 回收站 删除商品
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function RecycleDeleteGoods(params) {
  const ids = params.toString()
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/` + ids,
      method: 'delete',
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取预警商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getWarningGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/warning-list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 查看预警商品库存信息
 * @param params
 * @returns {Promise<any>}
 */
export function getWarningGoodsStockList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
