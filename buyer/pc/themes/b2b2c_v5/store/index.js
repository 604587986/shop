import * as types from './mutation-types'
import * as API_Common from '@/api/common'
import * as API_Home from '@/api/home'
import * as API_Goods from '@/api/goods'
import uuidv1 from 'uuid/v1'
import Cookie from 'cookie'
import Storage from '@/utils/storage'

if (!Storage.getItem('uuid') && process.client) {
  Storage.setItem('uuid', uuidv1())
}

/** state */
export const state = () => ({
  // 导航栏
  navList: [],
  // 分类
  categories: [],
  // 热搜关键词
  hotKeywords: [],
  // 站点信息
  site: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置站点cookie
   * @param state
   * @param data
   */
  [types.SET_SITE_DATA](state, data) {
    state.site = data
    process.client && Storage.setItem('site', global.JSON.stringify(data))
  },
  /**
   * 设置分类数据
   * @param state
   * @param data
   */
  [types.SET_CATEGORY_DATA](state, data) {
    state.categories = data
  },
  /**
   * 设置导航栏数据
   * @param state
   * @param data
   */
  [types.SET_NAV_DATA](state, data) {
    state.navList = data
  },
  /**
   * 设置热搜关键词数据
   * @param state
   * @param data
   */
  [types.SET_HOT_KEYWORDS](state, data) {
    state.hotKeywords = data
  }
}

/** actions */
export const actions = {
  /**
   * nuxt服务初始化时调用
   * @param commit
   * @param req
   * @param res
   */
  async nuxtServerInit({ commit, dispatch }, { req, res }) {
    if (req.headers.cookie) {
      const cookies = Cookie.parse(req.headers.cookie)
      const { user, site } = cookies
      await commit('user/SET_USER_INFO', user ? global.JSON.parse(cookies.user) : '')
    }
    // 获取公共数据
    await dispatch('getCommonDataAction')
  },
  /**
   * 获取公共数据
   * @param commit
   * @returns {Promise<void>}
   */
  async getCommonDataAction({ commit }) {
    const commons = await Promise.all([
      // 站点信息
      API_Common.getSiteData(),
      // 导航栏
      API_Home.getSiteMenu(),
      // 分类数据
      API_Home.getCategory(),
      // 热门关键字
      API_Home.getHotKeywords()
    ])
    // 站点信息
    commit(types.SET_SITE_DATA, commons[0])
    // 导航栏
    commit(types.SET_NAV_DATA, commons[1])
    // 分类数据
    commit(types.SET_CATEGORY_DATA, commons[2])
    // 热门关键字
    commit(types.SET_HOT_KEYWORDS, commons[3])
  }
}

/** getters */
export const getters = {
  /**
   * 分类列表
   * @param state
   * @returns {*}
   */
  categories: state => state.categories,
  /**
   * 导航栏
   * @param state
   * @returns {*}
   */
  navList: state => state.navList,
  /**
   * 热搜关键词
   * @param state
   * @returns {*}
   */
  hotKeywords: state => state.hotKeywords,
  /**
   * 获取用户信息
   * @param state
   * @returns {*}
   */
  user: state => state.user.user,
  /**
   * 获取站点信息
   * @param state
   * @returns {getters.site|(function(*))|string}
   */
  site: state => state.site
}
