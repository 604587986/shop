/**
 * 会员管理API
 */

import request from '@/utils/request'
import MemberModel from '@/models/MemberModel'

/** 获取会员列表 */
export function getMemberList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/members',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = new MemberModel().map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加会员
 * @param params
 * @returns {Promise<any>}
 */
export function addMember(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: '/members',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取会员详情
 * @param member_id
 * @returns {*}
 */
export function getMemberDetail(member_id) {
  return request({
    url: `/members/${member_id}`,
    method: 'get'
  })
}

/**
 * 修改会员
 * @param member_id
 * @param params
 * @returns {*}
 */
export function editMember(member_id, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: `/members/${member_id}`,
    method: 'post',
    data: _formData
  })
}

/**
 * 删除会员
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteMembers(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `/members/${ids}`,
    method: 'delete'
  })
}

/**
 * 获取会员回收站列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRecycleMemberList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/member/list-recycle-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = new MemberModel().map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 恢复会员
 * @param ids
 * @returns {Promise<any>}
 */
export function recycleMember(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('member_id', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/member/recycle-regain-member.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
