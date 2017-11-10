import * as types from '../mutation-types'

/** initial state */
const _state = {
  isLogin: false,
  userInfo: null
}

/** getters */
const getters = {
  /** 返回登录状态 */
  isLogin: state => state.isLogin || window.localStorage.getItem('isLogin') === 'true',
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
  }
}

/** mutations */
const mutations = {
  /**
   * 登录成功后
   * 将登录状态标识为true
   * 将用户信息存入localStorage
   * @param state
   * @param userInfo
   */
  [types.LOGIN_SUCCESS](state, userInfo) {
    window.localStorage.setItem('isLogin', true)
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.isLogin = true
    state.userInfo = userInfo
  },

  /**
   * 退出成功后
   * 将登录状态标识为false
   * 将用户信息设为null
   * @param state
   */
  [types.LOGOUT_SUCCESS](state) {
    window.localStorage.removeItem('isLogin')
    window.localStorage.removeItem('userInfo')
    state.isLogin = false
    state.userInfo = null
  }
}

/** export */
export default {
  state: _state,
  getters,
  actions,
  mutations
}
