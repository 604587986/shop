import * as types from './mutation-types'
import * as API_Common from '@/api/common'

/** state */
export const state = () => ({
  // 导航栏
  navList: [],
  // 分类
  categoryList: []
})

/** mutations */
export const mutations = {
  /** 设置导航栏数据 */
  [types.SET_NAV_DATA](state, data) {
    state.navList = data
  },
  /** 设置分类数据 */
  [types.SET_CATEGORY_DATA](state, data) {
    state.categoryList = data
  }
}

/** actions */
export const actions = {
  /** 获取导航栏数据 */
  getNavData: ({ commit }) => {
    API_Common.getNavList().then(response => {
      commit(types.SET_NAV_DATA, response)
    })
  },
  /** 获取分类数据 */
  getCategoryData: ({ commit }) => {
    API_Common.getCategoryList().then(response => {
      commit(types.SET_CATEGORY_DATA, response)
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
  navList: state => state.navList,
  /**
   * 分类列表
   * @param state
   * @returns {*}
   */
  categoryList: state => state.categoryList
}
