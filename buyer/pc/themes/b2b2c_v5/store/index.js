import * as types from './mutation-types'
import * as API_Common from '@/api/common'
import * as API_Home from '@/api/home'
import * as API_Goods from '@/api/goods'
import uuidv1 from 'uuid/v1'
import Cookie from 'cookie'
import Storage from '@/utils/storage'
import { domain } from "@/ui-domain";

/** state */
export const state = () => ({
  // 导航栏
  navList: [],
  // 分类
  categories: [],
  // 热搜关键词
  hotKeywords: [],
  // uuid
  uuid: '',
  // 站点信息
  site: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置UUID
   * @param state
   * @param uuid
   */
  [types.SET_UUID](state, uuid) {
    state.uuid = uuid
    process.client && Storage.setItem('uuid', uuid, { domain: domain.cookie })
  },
  /**
   * 设置站点cookie
   * @param state
   * @param data
   */
  [types.SET_SITE_DATA](state, data) {
    state.site = data
    process.client && Storage.setItem('site', global.JSON.stringify(data), { domain: domain.cookie })
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
  async nuxtServerInit ({ commit, dispatch }, { req, res }) {
    let _uuid
    let _site
    if (req.headers.cookie) {
      const cookies = Cookie.parse(req.headers.cookie)
      const { user, site } = cookies
      commit('user/SET_USER_INFO', user ? global.JSON.parse(cookies.user) : '')
      commit('user/SET_ACCESS_TOKEN', cookies.accessToken)
      commit('user/SET_REFRESH_TOKEN', cookies.refreshToken)
      _uuid = cookies.uuid
      _site = site
    }
    /***
     * 如果客户端请求携带的cookie中没有uuid
     * 则创建一个uuid
     * 并在res中设置cookie
     */
    if (!_uuid) {
      _uuid = uuidv1()
      res.setHeader('Set-Cookie', [`uuid=${_uuid};Domain=${domain.cookie}`])
    }
    commit('SET_UUID', _uuid)
    // 获取站点信息
    await dispatch('getSiteAction')
    // 获取分类数据
    await dispatch('getCategoriesAction')
    // 获取导航数据
    await dispatch('getNavAction')
    // 获取热搜关键词数据
    await dispatch('getHotKeywordsAction')
  },
  /**
   * 获取站点信息
   * @param commit
   * @returns {Promise<void>}
   */
  async getSiteAction({ commit }) {
    const site = await API_Common.getSiteData()
    commit(types.SET_SITE_DATA, site)
  },
  /**
   * 获取分类列表
   * @param commit
   * @returns {Promise<void>}
   */
  async getCategoriesAction({ commit }) {
    const categories = await API_Home.getCategory()
    commit(types.SET_CATEGORY_DATA, categories)
  },
  /**
   * 获取导航列表
   * @param commit
   * @returns {Promise<void>}
   */
  async getNavAction({ commit }) {
    const nav = await API_Home.getSiteMenu()
    commit(types.SET_NAV_DATA, nav)
  },
  /**
   * 获取热搜关键词
   * @param commit
   * @returns {Promise<void>}
   */
  async getHotKeywordsAction({ commit }) {
    const hotKeywords = await API_Home.getHotKeywords()
    commit(types.SET_HOT_KEYWORDS, hotKeywords)
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
   * 获取UUID
   * @param state
   * @returns {getters.uuid|(function(*))|*}
   */
  uuid: state => state.uuid,
  /**
   * 获取访问令牌
   * @param state
   * @returns {getters.accessToken|(function(*))|string|*}
   */
  accessToken: state => state.user.accessToken,
  /**
   * 获取刷新访问令牌
   * @param state
   * @returns {getters.refreshToken|(function(*))|string|*}
   */
  refreshToken: state => state.user.refreshToken,
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
