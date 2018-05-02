import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.validcode).then(response => {
          // 后台暂时没有返回数据，模拟一个
          response = { data: { token: 'eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOjAsInVpZCI6Miwic3ViIjoiU0VMTEVSIiwic2VsbGVySWQiOjMsInJvbGVzIjpbIkJVWUVSIiwiU0VMTEVSIl0sInNlbGxlck5hbWUiOiLnjovls7Dlupfpk7oxMTEiLCJ1c2VybmFtZSI6ImtpbmdhcGV4In0.rFV567biYKAgNuw1eA4roV8k2d6YyJRLAmIBhi0MxxKDnq_lGvK-GU1J6RmYjzYWwi3G9TyxhMJuV7klWk5o1Q' }}
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          // 后台暂时没有返回数据，模拟一个
          response = {
            data: {
              role: ['admin'],
              username: 'javashop',
              mobile: 18888888888,
              sex: 1,
              email: null,
              avatar: 'http://data.andste.cc/developers/web/temp/images/logo-javashop-app.png'
            }
          }
          if (!response.data) {
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
