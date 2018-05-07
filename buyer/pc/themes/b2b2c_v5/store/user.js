import * as API_User from '@/api/user'
import * as API_Passport from '@/api/passport'
import * as types from './mutation-types'
import Storage from '@/utils/storage'
import { Base64 } from 'js-base64'
import Foundation from '@/utils/Foundation'

export const state = () => ({
  user: '',
  accessToken: '',
  refreshToken: ''
})

/** mutations */
export const mutations = {
  /**
   * 保存用户信息
   * @param state
   * @param data
   */
  [types.SET_USER_INFO](state, data) {
    state.user = data
    process.client && Storage.setItem('user', JSON.stringify(data))
  },
  /**
   * 移除用户信息
   * @param state
   * @param data
   */
  [types.REMOVE_USER_INFO](state, data) {
    state.user = ''
    process.client && Storage.removeItem('user')
  },
  /**
   * 设置访问令牌
   * @param state
   * @param token
   */
  [types.SET_ACCESS_TOKEN](state, token) {
    state.accessToken = token
    if (process.client) {
      const access_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1]
      Storage.setItem('accessTokenExpires', access_token_time * 1000)
      Storage.setItem('accessToken', token, {expires: 1})
    }
  },
  /**
   * 移除访问令牌
   * @param state
   */
  [types.REMOVE_ACCESS_TOKEN](state) {
    state.accessToken = ''
    Storage.removeItem('accessTokenExpires')
    process.client && Storage.removeItem('accessToken')
  },
  /**
   * 设置刷新令牌
   * @param state
   * @param token
   */
  [types.SET_REFRESH_TOKEN](state, token) {
    state.refreshToken = token
    if (process.client) {
      const refresh_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1]
      Storage.setItem('refreshTokenExpires', refresh_token_time * 1000)
      Storage.setItem('refreshToken', token)
    }
  },
  /**
   * 移除刷新令牌
   * @param state
   */
  [types.REMOVE_REFRESH_TOKEN](state) {
    state.refreshToken = ''
    Storage.removeItem('refreshTokenExpires')
    process.client && Storage.removeItem('refreshToken')
  }
}

/** actions */
export const actions = {
  /**
   * 获取用户数据
   * @param commit
   * @param params
   */
  getUserDataAction: ({ commit }, uid) => {
    return new Promise((resolve, reject) => {
      API_User.getUserInfo(uid).then(response => {
        commit(types.SET_USER_INFO, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 登录
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  loginAction: ({ commit, dispatch }, params) => {
    return new Promise((resolve, reject) => {
      if (params.login_type === 'quick') {
        const { mobile, captcha } = params.form
        API_Passport.loginByMobile(mobile, captcha).then(loginSccess).catch(error => reject(error))
      } else {
        params.form.uuid = Storage.getItem('uuid')
        API_Passport.login(params.form).then(loginSccess).catch(error => reject(error))
      }
      function loginSccess(res) {
        const { access_token, refresh_token, uid } = res
        commit(types.SET_ACCESS_TOKEN, access_token)
        commit(types.SET_REFRESH_TOKEN, refresh_token)
        API_User.getUserInfo(uid).then(response => {
          commit(types.SET_USER_INFO, response)
          resolve(response)
        }).catch(error => reject(error))
      }
    })
  },
  /**
   * 登出
   * @param commit
   * @returns {Promise<any>}
   */
  logoutAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      API_User.logout().then(() => {
        commit(types.REMOVE_USER_INFO)
        commit(types.REMOVE_ACCESS_TOKEN)
        commit(types.REMOVE_REFRESH_TOKEN)
        resolve()
      }).catch(error => reject(error))
    })
  },
  /**
   * 保存用户信息【修改资料】
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  saveUserInfoAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_User.saveUserInfo(params).then(response => {
        commit(types.SET_USER_INFO, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 移除用户信息
   * @param commit
   */
  removeUserAction: ({ commit }) => {
    commit(types.REMOVE_USER_INFO)
  },
  /**
   * 注册【通过手机号】
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  registerByMobileAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Passport.registerByMobile(params).then(res=> {
        const { access_token, refresh_token, uid } = res
        commit(types.SET_ACCESS_TOKEN, access_token)
        commit(types.SET_REFRESH_TOKEN, refresh_token)
        API_User.getUserInfo(uid).then(response => {
          commit(types.SET_USER_INFO, response)
          resolve(response)
        }).catch(error => reject(error))
      })
    })
  },
  /**
   * 设置accessToken
   * @param commit
   * @param accessToken
   */
  setAccessTokenAction: ({ commit }, accessToken) => {
    commit(types.SET_ACCESS_TOKEN, accessToken)
  },
  /**
   * 移除accessToken
   * @param commit
   */
  removeAccessTokenAction: ({ commit }) => {
    commit(types.REMOVE_ACCESS_TOKEN)
  },
  /**
   * 设置refreshToken
   * @param commit
   * @param refreshToken
   */
  setRefreshTokenAction: ({ commit }, refreshToken) => {
    commit(types.SET_REFRESH_TOKEN, refreshToken)
  },
  /**
   * 移除refreshToken
   * @param commit
   */
  removeRefreshTokenAction: ({ commit }) => {
    commit(types.REMOVE_REFRESH_TOKEN)
  }
}
