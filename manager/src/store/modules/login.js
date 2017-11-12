import Vue from 'vue'
import * as types from '../mutation-types'

/** initial state */
const _state = {
  isLogin: false,
  userInfo: null
}

/** getters */
const getters = {
  /** 返回登录状态 */
  isLogin: state => state.isLogin,
  /** 返回当前登录的用户信息 */
  userInfo: state => state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
}

/** actions */
const actions = {
  /** 登录成功 */
  loginSuccess: ({ commit }, props) => {
    commit(types.LOGIN_SUCCESS, props)
  },
  /** 退出成功 */
  logoutSuccess: ({ commit }) => {
    commit(types.LOGOUT_SUCCESS)
  },
  /** 登录状态失效 */
  loginExpired: ({ commit }) => {
    commit(types.LOGIN_EXPIRED)
  }
}

/** mutations */
const mutations = {
  /**
   * 登录成功
   * 将登录状态标识为true
   * 将用户信息存入localStorage
   * 如果有登录状态失效通知，需要关闭
   * @param state
   * @param userInfo
   */
  [types.LOGIN_SUCCESS](state, userInfo) {
    window.localStorage.setItem('isLogin', true)
    userInfo && window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.isLogin = true
    state.userInfo = userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
    window.__loginExpried__ && window.__loginExpried__.close()
  },

  /**
   * 退出成功
   * 将登录状态标识为false
   * 将用户信息设为null
   * @param state
   */
  [types.LOGOUT_SUCCESS](state) {
    window.localStorage.removeItem('isLogin')
    window.localStorage.removeItem('userInfo')
    state.isLogin = false
    state.userInfo = null
  },

  /**
   * 登陆状态失效
   * 先显示登录状态失效通知
   * 再...
   * 将登录状态标识为false
   * 用户信息标识为null
   * 其它按兵不动
   * @param state
   */
  [types.LOGIN_EXPIRED](state) {
    window.__loginExpried__ = Vue.prototype.$notify({
      title: '提示',
      message: '登录状态已失效，请重新登录！',
      type: 'warning',
      duration: 0
    })
    setTimeout(() => {
      window.localStorage.setItem('isLogin', false)
      state.isLogin = false
      state.userInfo = null
    }, 1000)
  }
}

/** export */
export default {
  state: _state,
  getters,
  actions,
  mutations
}
