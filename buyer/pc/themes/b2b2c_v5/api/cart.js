/**
 * 购物车相关API
 */

import request from '@/utils/request'

/**
 * 获取购物车列表
 * @param params
 * @returns {Promise<any>}
 */
export function getCartList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cart/list',
      method: 'get',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 更新购物车货品数量
 * @param sku_id
 * @param num
 * @returns {Promise<any>}
 */
export function updateSkuNum(sku_id, num) {
  return new Promise((resolve, reject) => {
    request({
      url: `cart/${sku_id}`,
      method: 'post',
      data: { num }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 选择、取消选择货品
 * @param sku_id
 * @param checked
 * @returns {Promise<any>}
 */
export function checkSku(sku_id, checked) {
  return new Promise((resolve, reject) => {
    request({
      url: `cart/check-sku/${sku_id}`,
      method: 'post',
      data: { checked }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 选择、取消选择店铺内全部商品
 * @param shop_id
 * @param checked
 */
export function checkShop(shop_id, checked) {
  return new Promise((resolve, reject) => {
    request({
      url: `cart/check-shop/${shop_id}`,
      method: 'post',
      data: { checked }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 全选、取消全选
 * @param checked
 * @returns {Promise<any>}
 */
export function checkAll(checked) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cart/check-all',
      method: 'post',
      data: { checked }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 移除购物车货品项
 * @param sku_ids
 * @returns {Promise<any>}
 */
export function deleteSkuItem(sku_ids) {
  sku_ids = Array.isArray(sku_ids) ? sku_ids.join(',') : sku_ids
  return new Promise((resolve, reject) => {
    request({
      url: `cart/${sku_ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 清空购物车
 * @returns {Promise<any>}
 */
export function cleanCart() {
  return new Promise((resolve, reject) => {
    request({
      url: 'cart/clean',
      method: 'post'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
