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
      // url: '/goods',
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
 * 商品列表 删除商品  商家将商品放入回收站  下架的商品才能放入回收站
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteGoods(ids, params) {
  const _params = {}
  return new Promise((resolve, reject) => {
    request({
      // url: `/goods/${ids}/recycle`,
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/${ids}`,
      method: 'delete',
      data: _params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取库存商品数据
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStockList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/skus`,
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
 * @param goods_id
 * @param params
 * @returns {Promise<any>}
 */
export function reserveStockGoods(goods_id, params) {
  const _params = params
  const _formData = new FormData()
  _params.forEach((key, index) => _formData.append(index, key))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${goods_id}/quantity`,
      method: 'post',
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 *  查询商品分类信息发布商品  ids 为category_id
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCatrgory(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/skus`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 查询单个商品信息 编辑商品列表
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodData(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 商家下架商品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function underGoods(ids, params) {
  const _params = params
  const _formData = new FormData()
  _params.forEach((key, index) => _formData.append(index, key))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/under`,
      method: 'post',
      data: _formData
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
      url: '/goods/draft-goods',
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
 * 删除草稿箱商品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteDraftGoods(ids, params) {
  const _params = {}
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods/${ids}`,
      method: 'delete',
      data: _params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 查询单个草稿箱商品信息 编辑草稿箱商品列表
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodDraftData(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods/${ids}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
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
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function RecycleReductionGoods(ids, params) {
  const _params = params
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/revert`,
      method: 'post',
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 回收站 彻底删除商品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function RecycleDeleteGoods(ids, params) {
  const _params = params
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}`,
      method: 'delete',
      data: _formData
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
      url: '/goods/warning',
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
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getWarningGoodsStockList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/skus`,
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
