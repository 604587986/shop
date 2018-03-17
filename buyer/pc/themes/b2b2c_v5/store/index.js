import * as types from './mutation-types'
import * as API_Common from '@/api/common'

/** state */
export const state = () => ({
  navList: []
})

/** mutations */
export const mutations = {
  /** 设置导航栏数据 */
  [types.SET_NAV_DATA](state, data) {
    state.navList = data
  }
}

/** actions */
export const actions = {
  /** 获取导航栏数据 */
  getNavData: ({ commit }) => {
    API_Common.getNavList().then(response => {
      commit(types.SET_NAV_DATA, response)
    })
  }
}

/** getters */
export const getters = {
  /**
   * 导航栏列表
   * @param state
   * @returns {*}
   */
  navList: state => state.navList
}
