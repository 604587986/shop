import { getToken, setToken, removeToken } from '@/utils/auth'
const shop = {
  state: {
    shopInfo: JSON.parse(localStorage.getItem('shopInfo'))
  },

  mutations: {
    SetShop: (state, shopInfo) => {
      state.shopInfo = shopInfo
    }
  },
  actions: {
    // 存储店铺信息
    SetShop({ commit }, shopInfo) {
      commit('SetShop', shopInfo)
      localStorage.setItem('shopInfo', JSON.stringify(shopInfo))
    }
  }
}

export default shop
