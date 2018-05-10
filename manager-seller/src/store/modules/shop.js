const shop = {
  state: {
    shopInfo: {}
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
