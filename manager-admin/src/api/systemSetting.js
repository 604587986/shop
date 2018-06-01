/**
 * 系统设置
 */

import request from '@/utils/request'

/**
 * 获取系统设置
 */
export function getSystemSetting() {
  return request({
    url: 'settings/system',
    method: 'get',
    loading: false
  })
}

/**
 * 修改系统设置
 * @param params
 */
export function editSystemSetting(params) {
  return request({
    url: 'settings/system',
    method: 'put',
    data: params
  })
}

/**
 * 获取站点设置
 */
export function getSiteSetting() {
  return request({
    url: 'settings/site',
    method: 'get',
    loading: false
  })
}

/**
 * 修改站点设置
 * @param params
 */
export function editSiteSetting(params) {
  return request({
    url: 'settings/site',
    method: 'put',
    data: params
  })
}

/**
 * 获取店铺设置
 */
export function getShopSetting() {
  return request({
    url: '',
    method: 'get',
    loading: false
  })
}

/**
 * 编辑店铺设置
 * @param params
 */
export function editShopSetting(params) {
  return request({
    url: '',
    method: 'put',
    data: params
  })
}

/**
 * 获取订单设置
 */
export function getOrderSetting() {
  return request({
    url: '',
    method: 'get',
    loading: false
  })
}

/**
 * 编辑订单设置
 * @param params
 */
export function editOrderSetting(params) {
  return request({
    url: '',
    method: 'put',
    data: params
  })
}

/**
 * 获取图片设置
 */
export function getImageSetting() {
  return request({
    url: '',
    method: 'get',
    loading: false
  })
}

/**
 * 编辑图片设置
 * @param params
 */
export function editImageSetting(params) {
  return request({
    url: '',
    method: 'put',
    data: params
  })
}
