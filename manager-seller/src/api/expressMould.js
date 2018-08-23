/**
 * 快递模板相关API
 */

import request from '@/utils/request'
import { api } from '~/ui-domain'

/**
 * 运费模版列表
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getTplList(ids, params) {
  return request({
    url: `seller/shops/ship-templates`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 查询单个运费模版
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getSimpleTpl(id, params) {
  return request({
    url: `seller/shops/ship-templates/${id}`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除快递模板
 * @param params
 * @returns {Promise<any>}
 */
export function deleteExpressMould(ids, params) {
  return request({
    url: `seller/shops/ship-templates/${ids}`,
    method: 'delete',
    params
  })
}

/**
 * 更新运费模板
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveExpressMould(ids, params) {
  return request({
    url: `seller/shops/ship-templates/${ids}`,
    method: 'put',
    data: params
  })
}

/**
 * 添加运费模版
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function addExpressMould(params) {
  return request({
    url: 'seller/shops/ship-templates',
    method: 'post',
    data: params
  })
}

/**
 * 获取树形选择器地区信息
 * @param params
 */
export function getAreaList() {
  return request({
    url: `${api.base}/regions/depth/3`,
    method: 'get'
  })
}

