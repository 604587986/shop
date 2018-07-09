import * as API_Members from '@/api/members'
import * as API_Passport from '@/api/passport'
import * as types from './mutation-types'
import Storage from '@/utils/storage'
import { Base64 } from 'js-base64'
import { Foundation } from '~/ui-utils'
import * as API_Address from "@/api/address";
import { domain } from '~/ui-domain'

export const state = () => ({
  user: '',
  accessToken: '',
  refreshToken: '',
  address: []
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
    process.client && Storage.setItem('user', JSON.stringify(data), { domain: domain.cookie })
  },
  /**
   * 移除用户信息
   * @param state
   * @param data
   */
  [types.REMOVE_USER_INFO](state, data) {
    state.user = ''
    state.address = []
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
      const access_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(access_token_time)
      Storage.setItem('accessToken', token, { expires, domain: domain.cookie })
    }
  },
  /**
   * 移除访问令牌
   * @param state
   */
  [types.REMOVE_ACCESS_TOKEN](state) {
    state.accessToken = ''
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
      const refresh_token_time = Base64.decode(token).match(/"exp":(\d+)/)[1] * 1000
      const expires = new Date(refresh_token_time)
      Storage.setItem('refreshToken', token, { expires, domain: domain.cookie })
    }
  },
  /**
   * 移除刷新令牌
   * @param state
   */
  [types.REMOVE_REFRESH_TOKEN](state) {
    state.refreshToken = ''
    process.client && Storage.removeItem('refreshToken')
  },
  /**
   * 设置地址数据
   * @param state
   * @param data
   */
  [types.SET_ADDRESS](state, data) {
    state.address = data
  },
  /**
   * 添加地址
   * @param state
   * @param data
   */
  [types.ADD_ADDRESS](state, data) {
    state.address.data.splice(0, 0, data)
  },
  /**
   * 编辑地址
   * @param state
   * @param response
   */
  [types.EDIT_ADDRESS](state, response) {
    const { addr_id } = response
    state.address = state.address.map(item => {
      if (item.addr_id === addr_id) item = response
      return item
    })
  },
  /**
   * 设置默认地址
   * @param state
   * @param id
   */
  [types.SET_DEFAULT_ADDRESS](state, id) {
    state.address = state.address.map(item => {
      item.def_addr = item.addr_id === id
      return item
    })
  },
  /**
   * 删除地址
   * @param state
   * @param id
   */
  [types.DELETE_ADDRESS](state, id) {
    const index = state.address.findIndex(item => item.addr_id === id)
    state.address.splice(index, 1)
  }
}

/** actions */
export const actions = {
  /**
   * 获取用户数据
   * @param commit
   * @param params
   */
  getUserDataAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      API_Members.getUserInfo().then(response => {
        response.birthday *= 1000
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
        API_Members.getUserInfo(uid).then(response => {
          response.birthday *= 1000
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
      API_Members.logout().then(() => {
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
      API_Members.saveUserInfo(params).then(response => {
        response.birthday *= 1000
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
        API_Members.getUserInfo(uid).then(response => {
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
  },
  /**
   * 获取收货地址数据
   * @param commit
   * @returns {Promise<any>}
   */
  getAddressAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      API_Address.getAddressList().then(response => {
        commit(types.SET_ADDRESS, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 添加收货地址
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  addAddressAction: ({ commit, dispatch }, params) => {
    return new Promise((resolve, reject) => {
      API_Address.addAddress(params).then(response => {
        dispatch('getAddressAction')
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 编辑收货地址
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  editAddressAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Address.editAddress(params.addr_id, params).then(response => {
        commit(types.EDIT_ADDRESS, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 删除收货地址
   * @param commit
   * @param id
   * @returns {Promise<any>}
   */
  deleteAddressAction: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      API_Address.deleteAddress(id).then(response => {
        commit(types.DELETE_ADDRESS, id)
        resolve(response)
      }).then(error => reject(error))
    })
  },
  /**
   * 设置默认地址
   * @param commit
   * @param id
   * @returns {Promise<any>}
   */
  setDefaultAddressAction: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      API_Address.setDefaultAddress(id).then((response) => {
        commit(types.SET_DEFAULT_ADDRESS, id)
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}
