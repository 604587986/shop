import * as API_Order from '@/api/order'
import * as types from './mutation-types'

export const state = () => ({
  orderData: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置订单数据
   * @param state
   * @param data
   */
  [types.SET_ORDER_DATA](state, data) {
    state.orderData = data
  }
}

/** actions */
export const actions = {
  /**
   * 获取订单数据
   * @param commit
   * @param params
   */
  getOrderDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Order.getOrderList(params).then(response => {
        commit(types.SET_ORDER_DATA, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}

/** getters */
export const getters = {
  /**
   * 获取订单数据【带分页，订单列表在data里】
   * @param state
   * @returns {*}
   */
  orderData: state => state.orderData,
  /**
   * 获取订单列表
   * @param state
   */
  orderList: state => {
    return state.orderData.data || []
  }
}
