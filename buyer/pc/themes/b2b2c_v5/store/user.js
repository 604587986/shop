import * as API_User from '@/api/user'
import * as types from './mutation-types'

export const state = () => ({
  user: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置用户数据
   * @param state
   * @param data
   */
  [types.SET_USER_DATA](state, data) {
    state.user = data
  },
}

/** actions */
export const actions = {
  /**
   * 获取购物车数据
   * @param commit
   * @param params
   */
  getUserDataAction: ({ commit }, params) => {
    API_Cart.getCartList(params).then(response => {
      commit(types.SET_CART_DATA, response)
    })
  },
}

/** getters */
export const getters = {

}
