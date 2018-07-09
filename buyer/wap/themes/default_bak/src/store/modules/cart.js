/**
 * Created by Andste on 2018/3/8.
 * 购物车模块
 */

const cart = {
  state: {
    cartNum: 10
  },
  mutations: {},
  actions: {},
  getters: {
    cartBadge(state) {
      return state.cartNum > 99 ? '99+' : String(state.cartNum)
    },
    cartNum(state) {
      return state.cartNum
    }
  }
}

export default cart
