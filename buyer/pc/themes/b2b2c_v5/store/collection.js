import * as API_Collection from '@/api/collection'
import * as types from './mutation-types'

export const state = () => ({
  goodsCollectionData: '',
  shopCollectionData: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置商品收藏数据
   * @param state
   * @param data
   */
  [types.SET_GOODS_COLLECTION](state, data) {
    state.goodsCollectionData = data
  },
  /**
   * 删除商品收藏
   * @param state
   * @param ids
   */
  [types.DELETE_GOODS_COLLECTION](state, ids) {
    if (!Array.isArray(ids)) ids = [ids]
    const _list = []
    state.goodsCollectionData.data.forEach(item => {
      if (!ids.includes(item.goods_id)) _list.push(item)
    })
    state.goodsCollectionData.data = _list
  },
  /**
   * 设置店铺收藏数据
   * @param state
   * @param data
   */
  [types.SET_SHOP_COLLECTION](state, data) {
    state.shopCollectionData = data
  },
  /**
   * 删除店铺收藏
   * @param state
   * @param ids
   */
  [types.DELETE_SHOP_COLLECTION](state, ids) {
    if (!Array.isArray(ids)) ids = [ids]
    const _list = []
    state.shopCollectionData.data.forEach(item => {
      if (!ids.includes(item.shop_id)) _list.push(item)
    })
    state.shopCollectionData.data = _list
  }
}

/** actions */
export const actions = {
  /**
   * 获取商品收藏数据
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  getGoodsCollectionDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Collection.getGoodsCollection(params).then(response => {
        commit(types.SET_GOODS_COLLECTION, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 删除商品收藏
   * @param commit
   * @param ids
   * @returns {Promise<any>}
   */
  deleteGoodsCollectionAction: ({ commit }, ids) => {
    return new Promise((resolve, reject) => {
      API_Collection.deleteGoodsCollection(ids).then(response => {
        commit(types.DELETE_GOODS_COLLECTION, ids)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 获取店铺收藏数据
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  getShopCollectionDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Collection.getShopCollection(params).then(response => {
        commit(types.SET_SHOP_COLLECTION, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 删除店铺收藏
   * @param commit
   * @param ids
   * @returns {Promise<any>}
   */
  deleteShopCollectionAction: ({ commit }, ids) => {
    return new Promise((resolve, reject) => {
      API_Collection.deleteShopCollection(ids).then(response => {
        commit(types.DELETE_SHOP_COLLECTION, ids)
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}


/** getters */
export const getters = {
  /**
   * 获取商品收藏数据【带分页，订单列表在data里】
   * @param state
   * @returns {*}
   */
  goodsCollectionData: state => state.goodsCollectionData,
  /**
   * 获取商品收藏列表
   * @param state
   * @returns {Array}
   */
  goodsCollectionList: state => state.goodsCollectionData.data || [],
  /**
   * 获取店铺收藏数据【带分页，订单列表在data里】
   * @param state
   * @returns {*}
   */
  shopCollectionData: state => state.shopCollectionData,
  /**
   * 获取店铺收藏列表
   * @param state
   * @returns {Array}
   */
  shopCollectionList: state => state.shopCollectionData.data || []
}
