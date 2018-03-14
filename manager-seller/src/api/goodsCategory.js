import request from '@/utils/request'
import GoodsCategoryModel from '@/models/GoodsCategoryModel'

/**
 * 获取商品分类列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/category/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsCategoryModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

