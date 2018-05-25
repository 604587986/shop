import request from '@/utils/request'
import * as GoodsCategoryModel from '@/models/GoodsCategoryModel'

/**
 * 获取商品分组列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/cats',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsCategoryModel.GoodsCategory().map(_response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除 商品分组
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function deleteGoodsCategory(params) {
  const ids = params.toString()
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/cats/${ids}`,
      method: 'delete'
    })
  })
}

/**
 * 商品分组 添加
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function addGoodsCategory(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/cats',
      method: 'post',
      data: params
    })
  })
}

/**
 * 商品分组 编辑
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function updateGoodsCategory(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/cats/${ids}`,
      method: 'put',
      data: params
    })
  })
}

/**
 * 发布商品 查询商品品类 分级查询（商城商品品类）
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryLevelList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/category/${ids}/children`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsCategoryModel.GoodsCategoryLevel().map(_response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

