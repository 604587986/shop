const skuSelector = {
  state: {
    /** sku规格选择标准数据 */
    skuData: [],
    /** sku规格选择 将要提交的数据 */
    skuInfo: []
  },
  mutations: {
    /** 更新选择标准数据 直接替换*/
    UPDATE_SKU_DATA: (state, data) => {
      state.skuData = data
      console.log(state.skuData)
    },
    /** 更新选择将要提交的数据 直接替换*/
    UPDATE_SKU_INFO: (state, info) => {
      state.skuData = info
    }
  },
  actions: {
    updateSkuData({ commit }, data) {
      commit('UPDATE_SKU_DATA', data)
    },

    updateSkuInfo({ commit }, info) {
      commit('UPDATE_SKU_INFO', info)
    }
  }
}

export default skuSelector
