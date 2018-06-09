import * as API_Trade from '@/api/trade'
import * as types from './mutation-types'

export const state = () => ({
  shopList: []
})

/** mutations */
export const mutations = {
  /**
   * 设置购物车数据
   * @param state
   * @param data
   */
  [types.SET_CART_DATA](state, data) {
    state.shopList = data
  },
  /**
   * 更新货品数量
   * @param state
   * @param params
   */
  [types.UPDATE_SKU_NUM](state, params) {
    state.shopList.every(shop => {
      let flag = true
      shop.skuList.every(item => {
        if (item.sku_id === params.sku_id) {
          item.num = params.num
          flag = false
        }
        return flag
      })
      return flag
    })
  },
  /**
   * 选择、取消选择货品
   * @param state
   * @param params
   */
  [types.CHECK_SKU_ITEM](state, params) {
    state.shopList.every(shop => {
      let flag = true
      let _checked = 1
      shop.skuList.forEach(item => {
        if (item.sku_id === params.sku_id) {
          item.checked = params.checked
          flag = false
        }
        if (item.checked === 0) _checked = 0
      })
      shop.checked = _checked
      return flag
    })
  },
  /**
   * 选择、取消选择店铺内所有货品
   * @param state
   * @param params
   */
  [types.CHECK_SHOP_SKU](state, params) {
    state.shopList.every(shop => {
      if (shop.shop_id === params.shop_id) {
        shop.checked = params.checked
        shop.skuList.map(sku => {
          sku.checked = params.checked
          return sku
        })
        return false
      }
      return true
    })
  },
  /**
   * 全选、取消全选
   * @param state
   * @param checked
   */
  [types.CHECK_ALL](state, checked) {
    state.shopList = state.shopList.map(shop => {
      shop.checked = checked
      shop.skuList.map(sku => {
        sku.checked = checked
        return sku
      })
      return shop
    })
  },
  /**
   * 删除货品【可能是多个】
   * @param state
   * @param sku_ids
   */
  [types.DELETE_SKU_ITEMS](state, sku_ids) {
    sku_ids = Array.isArray(sku_ids) ? sku_ids : [sku_ids]
    const _shopList = []
    state.shopList.forEach(shop => {
      const _skuList = []
      shop.skuList.forEach(sku => {
        if (!sku_ids.includes(sku.sku_id)) _skuList.push(sku)
      })
      if (_skuList.length > 0) {
        shop.skuList = _skuList
        _shopList.push(shop)
      }
    })
    state.shopList = _shopList
  },
  /**
   * 清空购物车
   * @param state
   */
  [types.CLEAN_CART](state) {
    state.shopList = []
  }
}

/** actions */
export const actions = {
  /**
   * 获取购物车数据
   * @param commit
   * @param params
   */
  getCartDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Trade.getCarts(params).then(response => {
        commit(types.SET_CART_DATA, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 更新购物车货品数量
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  updateSkuNumAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Trade.getCarts(params.sku_id, params.num).then(response => {
        commit(types.UPDATE_SKU_NUM, params)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 选择、取消选择货品
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  checkSkuItemAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Trade.checkAll(params.sku_id, params.checked).then(response => {
        commit(types.CHECK_SKU_ITEM, params)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 选择、取消选择店铺内所有货品
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  checkShopSkuAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Trade.checkShop(params.shop_id, params.checked).then(resposne => {
        commit(types.CHECK_SHOP_SKU, params)
        resolve(resposne)
      }).catch(error => reject(error))
    })
  },
  /**
   * 全选、取消全选
   * @param commit
   * @param checked
   * @returns {Promise<any>}
   */
  checkAllAction: ({ commit }, checked) => {
    return new Promise((resolve, reject) => {
      API_Trade.checkAll(checked).then(response => {
        commit(types.CHECK_ALL, checked)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 删除购物车货品项
   * @param commit
   * @param dispatch
   * @param sku_ids
   * @returns {Promise<any>}
   */
  deleteSkuItemAction: ({ commit, dispatch }, sku_ids) => {
    return new Promise((resolve, reject) => {
      API_Trade.checkAll(sku_ids).then(response => {
        commit(types.DELETE_SKU_ITEMS, sku_ids)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 清空购物车
   * @param commit
   * @returns {Promise<any>}
   */
  cleanCartAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      API_Trade.cleanCarts().then(response => {
        commit(types.CLEAN_CART)
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}

/** getters */
export const getters = {
  /**
   * 获取skuList
   * @param state
   * @returns {Array}
   */
  skuList: state => {
    const _skuList = []
    state.shopList.forEach(item => _skuList.push(...item.skuList))
    return _skuList
  },
  /**
   * 获取shopList
   * @param state
   */
  shopList: state => state.shopList,
  /**
   * 购物车所有货品总数
   * @param state
   * @returns {number}
   */
  allCount: state => {
    let _allCount = 0
    state.shopList.forEach(shop => {
      shop.skuList.forEach(item => _allCount += item.num)
    })
    return _allCount
  },
  /**
   * 购物车已选货品总数
   * @param state
   * @returns {number}
   */
  checkedCount: state => {
    let _checkedCount = 0
    state.shopList.forEach(shop => {
      shop.skuList.forEach(item => {
        if (item.checked) _checkedCount += item.num
      })
    })
    return _checkedCount
  }
}
