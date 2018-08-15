import { login, logout } from '@/api/login'
import Storage from '@/utils/storage'
import { Base64 } from 'js-base64'

const _user = Storage.getItem('admin_user')
const user = {
  state: {
    user: _user ? JSON.parse(_user) : '',
    accessToken: Storage.getItem('admin_access_token'),
    refreshToken: Storage.getItem('admin_refresh_token')
  },

  mutations: {
    /**
     * 设置用户信息
     * @param state
     * @param user
     * @constructor
     */
    SET_USER: (state, user) => {
      state.user = user
      Storage.setItem('admin_user', JSON.stringify(user))
      Storage.setItem('admin_uid', user.id)
    },
    /**
     * 设置访问令牌
     * @param state
     * @param token
     * @constructor
     */
    SET_ACCESS_TOKEN: (state, token) => {
      state.accessToken = token
      const access_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(access_token_time)
      Storage.setItem('admin_access_token', token, { expires })
    },
    /**
     * 设置刷新令牌
     * @param state
     * @param token
     * @constructor
     */
    SET_REFRESH_TOKEN: (state, token) => {
      state.refreshToken = token
      const access_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(access_token_time)
      Storage.setItem('admin_refresh_token', token, { expires })
    },
    /**
     * 移除用户信息
     * @param state
     * @constructor
     */
    REMOVE_USER: (state) => {
      state.user = ''
      Storage.removeItem('admin_user')
      Storage.removeItem('admin_uid')
    },
    /**
     * 移除访问令牌
     * @param state
     * @constructor
     */
    REMOVE_ACCESS_TOKEN: (state) => {
      state.accessToken = ''
      Storage.removeItem('admin_access_token')
    },
    /**
     * 移除刷新令牌
     * @param state
     * @constructor
     */
    REMOVE_REFRESH_TOKEN: (state) => {
      state.refreshToken = ''
      Storage.removeItem('admin_refresh_token')
    }
  },

  actions: {
    // 用户名登录
    loginAction({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          commit('SET_USER', response)
          commit('SET_ACCESS_TOKEN', response.access_token)
          commit('SET_REFRESH_TOKEN', response.refresh_token)
          resolve()
        }).catch(reject)
      })
    },

    // 登出
    logOutAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('REMOVE_USER')
          commit('REMOVE_ACCESS_TOKEN')
          commit('REMOVE_REFRESH_TOKEN')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    /**
     * 设置accessToken
     * @param commit
     * @param accessToken
     */
    setAccessTokenAction: ({ commit }, accessToken) => {
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    /**
     * 设置refreshToken
     * @param commit
     * @param refreshToken
     */
    setRefreshTokenAction: ({ commit }, refreshToken) => {
      commit('SET_REFRESH_TOKEN', refreshToken)
    },

    // 前端 登出
    fedLogOut: ({ commit }) => {
      commit('REMOVE_USER')
      commit('REMOVE_ACCESS_TOKEN')
      commit('REMOVE_REFRESH_TOKEN')
    }
  }
}

export default user
