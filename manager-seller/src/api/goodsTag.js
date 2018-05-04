import request from '@/utils/request'
import GoodsTagModel from '@/models/GoodsTagModel'
import GoodsModel from '@/models/GoodsModel'

/**
 * 获取标签列表
 * @param params
 * @returns {Promise<any>}
 */
export function getTagsList(params) {
  return new Promise((resolve, reject) => {
    request({
      // url: '/goods/tags',
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/tag/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsTagModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取标签商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getTagGoodsList(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/tags/${id}/goods`,
      // url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/tag/goods-list/${id}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存标签商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function saveTagGoodsList(tag_id, goods_ids, params) {
  const _params = params
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/tags/${tag_id}/goods/${goods_ids}`,
      method: 'put',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
