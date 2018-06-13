import * as API_Address from '@/api/address'
import * as types from './mutation-types'

export const state = () => ({
  address: []
})

/** mutations */
export const mutations = {
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
      commit(types.SET_DEFAULT_ADDRESS, id)
      // API_Address
    })
  }
}
