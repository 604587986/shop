import Storage from '@/utils/storage'
import { domain } from '~/ui-domain'
const shop = {
  state: {
    shopInfo: null
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
    }
  }
}

export default shop
