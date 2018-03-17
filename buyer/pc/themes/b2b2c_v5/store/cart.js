import * as API_Cart from '@/api/cart'
import * as types from './mutation-types'

export const state = () => ({
  cartData: {},
  shopList: [],
  skuList: []
})

/** mutations */
export const mutations = {
  /** 设置购物车数据 */
  [types.SET_CART_DATA](state, data) {
    state.cartData = data
    state.shopList = data.data
    const _skulist = []
    data.data.forEach(item => {
      _skulist.push(...item.skuList)
    })
    state.skuList = _skulist
  }
}

/** actions */
export const actions = {
  /** 获取购物车数据 */
  getCartDataAction: ({ commit }, params) => {
    API_Cart.getCartList(params).then(response => {
      commit(types.SET_CART_DATA, response)
    })
  },
  /** 更新购物车货品数量 */
  updateSkuNumAction: ({ commit, dispatch }, params) => {
    API_Cart.updateSkuNum(params.sku_id, params.num).then(response => {
      dispatch('getCartDataAction')
    })
  },
  /** 移除购物车货品项 */
  removeSkuItemAction: ({ commit, dispatch }, sku_ids) => {
    API_Cart.deleteSkuItem(sku_ids).then(response => {
      dispatch('getCartDataAction')
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
    return state.skuList
  },
  /**
   * 获取shopList
   * @param state
   */
  shopList: state => {
    return state.cartData.data
  },
  /**
   * 购物车所有货品总数
   * @param state
   * @returns {number}
   */
  allCount: state => {
    let _allCount = 0
    state.skuList.forEach(item => _allCount += item.num)
    return _allCount
  },
  /**
   * 购物车已选货品总数
   * @param state
   * @returns {number}
   */
  checkedCount: state => {
    let _checkedCount = 0
    state.skuList.forEach(item => {
      if (item.checked) _checkedCount += item.num
    })
    return _checkedCount
  }
}
