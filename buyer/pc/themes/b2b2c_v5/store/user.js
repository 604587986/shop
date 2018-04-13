import * as API_User from '@/api/user'
import * as types from './mutation-types'

export const state = () => ({
  user: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置用户数据
   * @param state
   * @param data
   */
  [types.SET_USER_DATA](state, data) {
    state.user = data
  },
  /**
   * 登录
   * @param state
   * @param data
   */
  [types.LOG_IN](state, data) {
    state.user = data
  },
  /**
   * 登出
   * @param state
   */
  [types.LOG_OUT](state) {
    state.user = ''
  },
  /**
   * 保存用户信息【修改资料】
   * @param state
   * @param res
   */
  [types.SAVE_USER_INFO](state, res) {
    state.user = res
  }
}

/** actions */
export const actions = {
  /**
   * 获取购物车数据
   * @param commit
   * @param params
   */
  getUserDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_User.getUserInfo().then(response => {
        commit(types.SET_USER_DATA, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 登出
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  loginAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_User.login(params).then(response => {
        commit(types.LOG_IN, response)
        resolve(response)
      }).catch(error => reject(error))
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
        commit(types.LOG_OUT)
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
