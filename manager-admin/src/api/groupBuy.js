/**
 * 团购相关API
 */

import request from '@/utils/request'
import GroupBuyCategoryModel from '@/models/GroupBuyCategoryModel'

/**
 * 获取团购活动列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupBuyList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-act/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 添加团购活动
 * @param params
 * @returns {Promise<any>}
 */
export function addGroupBuy(params) {
  const _params = {
    act_name: params.name,
    act_start_time: params.start_time,
    act_end_time: params.end_time,
    act_join_end_time: params.apply_deadline
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-act/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除团购活动
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteGroupBuy(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('cat_id', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-act/delete.do' + '?act_id=' + ids[0],
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取团购分类列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupBuyCategoryList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-cat/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GroupBuyCategoryModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加团购分类
 * @param params
 * @returns {Promise<any>}
 */
export function addGroupBuyCategory(params) {
  const _params = {
    cat_name: params.name,
    cat_order: params.order
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-cat/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除团购分类
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteGroupBuyCategory(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('catid', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-cat/batch-delete.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
