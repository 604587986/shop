import { logout, getUserInfo } from '@/api/login'
import Storage from '@/utils/storage'
import { Base64 } from 'js-base64'
import { domain } from '~/ui-domain'

const user = {
  state: {
    avatar: '',
    name: ''
  },

  mutations: {
    /**
     * 设置用户信息
     * @param state
     * @param user
     * @constructor
     */
    SET_USER_INFO: (state, user) => {
      state.avatar = user.face
      state.name = user.uname
      const refreshToken = Storage.getItem('refreshToken')
      const refresh_token_time = Base64.decode(refreshToken).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(refresh_token_time)
      Storage.setItem('user', JSON.stringify(user), { expires, domain: domain.cookie })
    },
    /**
     * 登出
     * @param state
     * @constructor
     */
    LOG_OUT: (state) => {
      state.avatar = ''
      state.name = ''
      Storage.removeItem('user')
      Storage.removeItem('accessToken')
      Storage.removeItem('refreshToken')
      Storage.removeItem('shopInfo')
    },
    /**
     * 设置访问令牌
     * @param state
     * @param token
     * @constructor
     */
    SET_ACCESS_TOKEN: (state, token) => {
      const access_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(access_token_time)
      Storage.setItem('accessToken', token, { expires, domain: domain.cookie })
    },
    /**
     * 设置刷新令牌
     * @param state
     * @param token
     * @constructor
     */
    SET_REFRESH_TOKEN: (state, token) => {
      const refresh_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(refresh_token_time)
      Storage.setItem('refreshToken', token, { expires, domain: domain.cookie })
    }
  },

  actions: {
    // 用户名登录
    getUserInfoAction({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          commit('SET_USER_INFO', response)
          resolve(response)
        })
      })
    },
    // 登出
    logOutAction({ commit }) {
      return new Promise(resolve => {
        logout().then(() => {
          commit('LOG_OUT')
          resolve()
        })
      })
    },
    // 移除用户信息、以及Token
    removeUserAction({ commit }) {
      commit('LOG_OUT')
    },
    // 设置访问令牌
    setAccessTokenAction({ commit }, token) {
      commit('SET_ACCESS_TOKEN', token)
    },
    // 设置刷新令牌
    setRefreshTokenAction({ commit }, token) {
      commit('SET_REFRESH_TOKEN', token)
    }
  }
}

export default user
