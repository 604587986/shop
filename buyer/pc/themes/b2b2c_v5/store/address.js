import * as API_Address from '@/api/address'
import * as types from './mutation-types'

export const state = () => ({
  address: {}
})

/** mutations */
export const mutations = {
  /**
   * 设置地址数据
   * @param state
   * @param data
   */
  [types.SET_ADDRESS_DATA](state, data) {
    state.address = data
  },
  /**
   * 保存地址
   * @param state
   * @param data
   */
  [types.ADD_ADDRESS](state, data) {
    state.address.data.splice(0, 0, data)
  },
  /**
   * 编辑地址
   * @param state
   * @param params
   */
  [types.EDIT_ADDRESS](state, params) {
    state.address.data = state.address.data.map(item => {
      if (item.address_id === params.address_id) item = params
      return item
    })
  },
  /**
   * 删除地址
   * @param state
   * @param ids
   */
  [types.DELETE_ADDRESS](state, ids) {
    if (!Array.isArray(ids)) ids = [ids]
    const _list = []
    state.address.data.forEach(item => {
      if (!ids.includes(item.address_id)) _list.push(item)
    })
    state.address.data = _list
  }
}

/** actions */
export const actions = {
  /**
   * 获取收货地址数据
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  getAddressDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Address.getAddressList().then(response => {
        commit(types.SET_ADDRESS_DATA, response)
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
  addAddressAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Address.addAddress(params).then(response => {
        commit(types.ADD_ADDRESS, params)
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
        commit(types.EDIT_ADDRESS, params)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 删除收货地址
   * @param commit
   * @param ids
   * @returns {Promise<any>}
   */
  deleteAddressAction: ({ commit }, ids) => {
    return new Promise((resolve, reject) => {
      API_Address.deleteAddress(ids).then(response => {
        commit(types.DELETE_ADDRESS, ids)
        resolve(response)
      }).then(error => reject(error))
    })
  }
}
