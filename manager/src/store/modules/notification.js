import Vue from 'vue'
import * as types from '../mutation-types'

/** initial state */
const _state = {
  notification_count: 10
}

/** getters */
const getters = {
  /** 通知条数 */
  notification_count: state => state.notification_count
}

/** actions */
const actions = {
  /** 通知被阅读 */
  notificationHaveRead: ({ commit }, props) => {
    commit(types.LOGIN_SUCCESS, props)
  }
}

/** mutations */
const mutations = {
  /**
   * 某条消息被阅读
   * 将此消息标识为已阅读
   * 将未阅读消息条数-1
   * @param state
   * @param notifiction_id
   */
  [types.NOTIFICATION_HAVE_READ](state, notifiction_id) {
    // to do someing...
    state.notification_count -= 1
  }
}

/** export */
export default {
  state: _state,
  getters,
  actions,
  mutations
}
