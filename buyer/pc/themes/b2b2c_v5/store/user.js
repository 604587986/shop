import * as API_User from '@/api/user'
import * as API_Passport from '@/api/passport'
import * as types from './mutation-types'

export const state = () => ({
  user: ''
})

/** mutations */
export const mutations = {
  /**
   * 保存用户信息
   * @param state
   * @param data
   */
  [types.SAVE_USER_INFO](state, data) {
    state.user = data
  },
  /**
   * 移除用户信息
   * @param state
   * @param data
   */
  [types.REMOVE_USER_INFO](state, data) {
    state.user = ''
  }
}

/** actions */
export const actions = {
  /**
   * 获取用户数据
   * @param commit
   * @param params
   */
  getUserDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_User.getUserInfo().then(response => {
        commit(types.SAVE_USER_INFO, response)
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
  loginAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      if (params.login_type === 'quick') {
        API_Passport.loginByMobile()
      } else {
        API_Passport.login(params.form).then(response => {
          console.log(response)
          commit(types.SAVE_USER_INFO, response)
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
        commit(types.SAVE_USER_INFO, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}

/** getters */
export const getters = {
  user: state => state.user
}
