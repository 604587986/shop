import { login, logout } from '@/api/login'
import Storage from '@/utils/storage'
import { Base64 } from 'js-base64'
import { domain } from '~/ui-domain'

const _user = Storage.getItem('adminUser')
const user = {
  state: {
    user: _user ? JSON.parse(_user) : '',
    accessToken: Storage.getItem('adminAccessToken'),
    refreshToken: Storage.getItem('adminRefreshToken')
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
      Storage.setItem('adminUser', JSON.stringify(user), { domain: domain.cookie })
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
      Storage.setItem('adminAccessToken', token, { expires, domain: domain.cookie })
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
      Storage.setItem('adminRefreshToken', token, { expires, domain: domain.cookie })
    },
    /**
     * 移除用户信息
     * @param state
     * @constructor
     */
    REMOVE_USER: (state) => {
      state.user = ''
      Storage.removeItem('adminUser', { domain: domain.cookie })
    },
    /**
     * 移除访问令牌
     * @param state
     * @constructor
     */
    REMOVE_ACCESS_TOKEN: (state) => {
      state.accessToken = ''
      Storage.removeItem('adminAccessToken', { domain: domain.cookie })
    },
    /**
     * 移除刷新令牌
     * @param state
     * @constructor
     */
    REMOVE_REFRESH_TOKEN: (state) => {
      state.refreshToken = ''
      Storage.removeItem('adminRefreshToken', { domain: domain.cookie })
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
