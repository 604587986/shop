import request from '@/utils/request'
import GoodsTagModel from '@/models/GoodsTagModel'
import GoodsModel from '@/models/GoodsModel'

/**
 * 根据分类id 获取规格信息
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function getCategorySkuList(category_id, params) {
  return new Promise((resolve, reject) => {
    request({
      // url: `/goods/categories/${category_id}/specs`,
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/category/sku/list`,
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
 * 根据goods 获取规格信息
 * @param goods_id
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsSkuList(goods_id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/${goods_id}/skus`,
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
 * 保存商家自定义某分类的规格项
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveCustomSkuItem(category_id, params) {
  const _params = {
    ...params
  }
  const _formData = new FormData()
  Object.keys(_params).forEach((key) => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/categories/${category_id}/specs`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存商家自定义某规格的规格值
 * @param spec_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveCustomSkuValue(spec_id, params) {
  const _params = {
    ...params
  }
  const _formData = new FormData()
  Object.keys(_params).forEach((key) => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/specs/${spec_id}/values`,
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
