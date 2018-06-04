/**
 * Created by andste.cc@gmail.com on 2018/5/16.
 */

import request from '@/utils/request'

/**
 * 获取模板列表
 * @param type
 */
export function getTplList(type) {
  const url = type === 'mobile'
    ? 'http://localhost:9090/javashop/cms/admin/panel-tpl/mobile.do'
    : ''
  return request({
    url,
    method: 'get',
    loading: false
  })
}

/**
 * 获取楼层数据
 * @param type
 */
export function getFloorList(type) {
  const url = type === 'mobile'
    ? 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/floor/mobile'
    : ''
  return request({
    url,
    method: 'get',
    loading: false
  })
}

/**
 * 获取楼层数据
 * @param client_type
 * @param page_type
 */
export function getFloor(client_type, page_type) {
  return request({
    url: `pages/${client_type}/${page_type}`,
    method: 'get'
  })
}

/**
 * 修改楼层
 * @param client_type
 * @param page_type
 * @param params
 */
export function editFloor(client_type, page_type, params) {
  return request({
    url: `pages/${client_type}/${page_type}`,
    method: 'put',
    data: params
  })
}

/**
 * 获取焦点图列表
 * @param client_type
 */
export function getFocus(client_type) {
  return request({
    url: 'focus-pictures',
    method: 'get',
    params: { client_type }
  })
}

/**
 * 添加焦点图
 * @param params
 */
export function addFocus(params) {
  return request({
    url: 'focus-pictures',
    method: 'post',
    data: params
  })
}

/**
 * 获取焦点图详情
 * @param id
 */
export function getFocusDetail(id) {
  return request({
    url: `focus-pictures/${id}`,
    method: 'get'
  })
}

/**
 * 修改焦点图
 * @param id
 * @param params
 */
export function editFocus(id, params) {
  return request({
    url: `focus-pictures/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除焦点图
 * @param id
 */
export function deleteFocus(id) {
  return request({
    url: `focus-pictures/${id}`,
    method: 'delete'
  })
}
