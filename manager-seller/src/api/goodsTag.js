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
 * 2018/3/13
 * 作者:杨培
 * 获取标签商品列表
 **/
export function getTagGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/tag/goods-list/' + params.tag_id,
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
 * 2018/3/13
 * 作者:杨培
 * 保存标签商品列表
 **/
export function saveTagGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/tag/tag-goods',
      method: 'post',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
