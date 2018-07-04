import { logout, getUserInfo } from '@/api/login'
import Storage from '@/utils/storage'

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
      Storage.setItem('user', JSON.stringify(user))
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
    }
  }
}

export default user
