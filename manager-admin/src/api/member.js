/**
 * 会员管理API
 */

import request from '@/utils/request'
import MemberModel from '@/models/MemberModel'
const memberModel = new MemberModel()

/** 获取会员列表 */
export function getMemberList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'members',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = memberModel.map(response.data)
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
  return new Promise((resolve, reject) => {
    request({
      url: 'members',
      method: 'post',
      data: memberModel.params(params)
    }).then(response => resolve(memberModel.map(response))).catch(error => reject(error))
  })
}

/**
 * 获取会员详情
 * @param id
 * @returns {*}
 */
export function getMemberDetail(id) {
  return request({
    url: `members/${id}`,
    method: 'get'
  })
}

/**
 * 修改会员
 * @param id
 * @param params
 * @returns {*}
 */
export function editMember(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `members/${id}`,
      method: 'put',
      data: memberModel.params(params)
    }).then(response => resolve(memberModel.map(response))).catch(error => reject(error))
  })
}

/**
 * 删除会员
 * @param id
 */
export function deleteMember(id) {
  return request({
    url: `members/${id}`,
    method: 'delete'
  })
}

/**
 * 获取会员回收站列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRecycleMemberList(params) {
  params.disabled = -1
  return new Promise((resolve, reject) => {
    request({
      url: 'members',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = memberModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 恢复会员
 * @param id
 */
export function recycleMember(id) {
  return request({
    url: `members/${id}`,
    method: 'post'
  })
}
