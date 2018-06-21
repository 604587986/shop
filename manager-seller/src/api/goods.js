/**
 * 商品管理API
 */

import request from '@/utils/request'
import GoodsModel from '@/models/GoodsModel'
import GoodsBrandModel from '@/models/GoodsBrandModel'

/**
 * 获取商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/goods',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(() => resolve())
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
      url: `/goods/${ids}/recycle`,
      method: 'put',
      data: _params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查询库存商品数据  查询商品sku（规格）信息
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
      const _response = new GoodsModel().map(response)
      resolve(_response)
    })
  })
}

/**
 * 保存库存商品
 * @param goods_id
 * @param params
 * @returns {Promise<any>}
 */
export function reserveStockGoods(goods_id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${goods_id}/quantity`,
      method: 'put',
      data: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 商品发布   查询商品参数，获取所选分类关联的参数信息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsParams(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/category/${ids}/params`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查询草稿箱商品参数
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsDraftParams(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods/${ids}/params`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查询商品品类信息  ids 为category_id 商城商品品类
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
    })
  })
}

/**
 * 查询单个商品信息 商品列表 编辑
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
    })
  })
}

/**
 * 查询单个草稿箱商品信息 草稿箱商品列表 编辑
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
    })
  })
}

/**
 * 品牌列表 ids为categoryid  商品发布，获取所选分类关联的品牌信息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsBrandList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/category/${ids}/brands`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsBrandModel().map(_response)
      resolve(_response)
    })
  })
}

/**
 * 运费模板列表
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getTplList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/ship-templates`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 商家下架商品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function underGoods(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/under`,
      method: 'put',
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 上架正常商品 商品相关API-添加商品
 * @param params
 * @returns {Promise<any>}
 */
export function aboveGoods(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/goods',
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 修改正常商品 编辑商品时用到
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editGoods(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${id}`,
      method: 'put',
      data: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 正常商品 保存草稿 草稿商品相关API-添加商品
 * @param params
 * @returns {Promise<any>}
 */
export function saveDraft(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods`,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 上架草稿箱商品
 * @param params
 * @returns {Promise<any>}
 */
export function aboveDraftGoods(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods/${ids}/market`,
      method: 'put',
      data: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      resolve(response)
    })
  })
}

/** 草稿箱商品 保存草稿 即 修改草稿箱商品 */
export function editDraftGoods(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods/${id}`,
      method: 'put',
      data: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查询草稿箱sku信息
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function draftSku(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/draft-goods/${id}/skus`,
      method: 'get',
      data: params
    }).then(response => {
      const _response = new GoodsModel().map(response)
      resolve(_response)
    })
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
    }).catch(() => resolve())
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
    })
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
      url: '/goods',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(() => resolve())
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
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}/revert`,
      method: 'put',
      data: params
    }).then(response => {
      resolve(response)
    })
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
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${ids}`,
      method: 'delete',
      data: params
    }).then(response => {
      resolve(response)
    })
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
    }).catch(() => resolve())
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
      _response.data = new GoodsModel().map(_response)
      resolve(_response)
    })
  })
}
