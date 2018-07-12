import * as API_Message from '@/api/message'
import * as types from './mutation-types'

export const state = () => ({
  /** 站内消息数据 */
  messageData: '',
  /** 站内未读消息数据 */
  unreadMessageData: ''
})

/** mutations */
export const mutations = {
  /**
   * 设置消息数据
   * @param state
   * @param data
   */
  [types.SET_MESSAGE_DATA](state, data) {
    state.messageData = data
  },
  /**
   * 设置未读消息数据
   * @param state
   * @param data
   */
  [types.SET_UNREAD_MESSAGE_DATA](state, data) {
    state.unreadMessageData = data
  },
  /**
   * 消息标记已读
   * @param state
   * @param ids
   */
  [types.MESSAGE_MARK_AS_READ](state, ids) {
    state.messageData.data.map(item => {
      item.have_read = (ids.includes(item.message_id))
      return item
    })
  }
}

/** actions */
export const actions = {
  /**
   * 获取站内消息数据
   * @param commit
   * @param params
   */
  getMessageDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Message.getMessages(params).then(response => {
        commit(types.SET_MESSAGE_DATA, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 获取站内未读消息数据
   * @param commit
   * @param params
   * @returns {Promise<any>}
   */
  getUnreadMessageDataAction: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API_Message.getMesssagesAsUnread(params).then(response => {
        commit(types.SET_UNREAD_MESSAGE_DATA, response)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 标记站内消息为已读
   * @param commit
   * @param ids
   * @returns {Promise<any>}
   */
  messageMarkAsReadAction: ({ commit }, ids) => {
    ids = Array.isArray(ids) ? ids : [ids]
    return new Promise((resolve, reject) => {
      API_Message.messageMarkAsRead(ids).then(response => {
        commit(types.MESSAGE_MARK_AS_READ, ids)
        resolve(response)
      }).catch(error => reject(error))
    })
  },
  /**
   * 删除站内消息
   * @param commit
   * @param ids
   * @returns {Promise<any>}
   */
  deleteMessageAction: ({ commit, dispatch }, ids) => {
    ids = Array.isArray(ids) ? ids : [ids]
    return new Promise((resolve, reject) => {
      API_Message.deleteMessage(ids).then(response => {
        // commit(types.DELETE_MESSAGE, ids)
        dispatch('getMessageDataAction')
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}

/** getters */
export const getters = {
  /**
   * 获取站内消息数据
   * @param state
   * @returns {*}
   */
  messageData: state => state.messageData,
  /**
   * 获取站内消息【获取到的是当前页】
   * @param state
   * @returns {Array}
   */
  message: state => state.messageData.data || [],
  /**
   * 获取站内未读消息数据
   * @param state
   * @returns {*}
   */
  unreadMessageData: state => state.unreadMessageData,
  /**
   * 获取站内未读消息【获取到的是当前页】
   * @param state
   */
  unreadMessage: state => state.unreadMessageData.data,
  /**
   * 获取站内未读消息数量
   * @param state
   */
  unreadMessageTotal: state => {
    const u_m = state.unreadMessageData
    return u_m ? u_m.data.total : 0
  }
}
