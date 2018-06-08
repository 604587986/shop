/**
 * 购物车相关API
 */

import request from '@/utils/request'

/**
 * 获取购物车列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getCartList(params) {
  return request({
    url: 'trade/carts',
    method: 'get',
    params
  })
}

/**
 * 更新购物车货品数量
 * @param sku_id 货品sku_id
 * @param num 商品数量
 * @returns {AxiosPromise}
 */
export function updateSkuNum(sku_id, num) {
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/cart/${sku_id}`,
    method: 'post',
    loading: false,
    data: { num }
  })
}

/**
 * 选择、取消选择货品
 * @param sku_id 货品sku_id
 * @param checked 货品选中状态
 * @returns {AxiosPromise}
 */
export function checkSku(sku_id, checked) {
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/cart/check-sku/${sku_id}`,
    method: 'post',
    data: { checked }
  })
}

/**
 * 选择、取消选择店铺内全部商品
 * @param shop_id 店铺ID
 * @param checked 店铺选中状态
 * @returns {AxiosPromise}
 */
export function checkShop(shop_id, checked) {
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/cart/check-shop/${shop_id}`,
    method: 'post',
    data: { checked }
  })
}

/**
 * 全选、取消全选
 * @param checked 全选状态
 * @returns {AxiosPromise}
 */
export function checkAll(checked) {
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/cart/check-all',
    method: 'post',
    data: { checked }
  })
}

/**
 * 移除购物车货品项
 * @param sku_ids 货品sku_id【集合或单个ID】
 * @returns {AxiosPromise}
 */
export function deleteSkuItem(sku_ids) {
  sku_ids = Array.isArray(sku_ids) ? sku_ids.join(',') : sku_ids
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/cart/${sku_ids}`,
    method: 'delete'
  })
}

/**
 * 清空购物车
 * @returns {AxiosPromise}
 */
export function cleanCart() {
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/cart/clean',
    method: 'post'
  })
}
