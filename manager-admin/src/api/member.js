/**
 * 会员管理API
 */

import request from '@/utils/request'

/**
 * 获取会员列表
 * @param params
 */
export function getMemberList(params) {
  return request({
    url: 'members',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加会员
 * @param params
 */
export function addMember(params) {
  return request({
    url: 'members',
    method: 'post',
    data: params
  })
}

/**
 * 获取会员详情
 * @param id
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
 */
export function editMember(id, params) {
  return request({
    url: `members/${id}`,
    method: 'put',
    data: params
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
 */
export function getRecycleMemberList(params) {
  return request({
    url: 'members',
    method: 'get',
    loading: false,
    params
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

/**
 * 获取会员收货地址列表
 * @param member_id
 * @param params
 */
export function getMemberAddress(member_id, params) {
  return request({
    url: `members/addresses/${member_id}`,
    method: 'get',
    loading: false,
    params
  })
}

export function getMemberListAsk(member_id, params) {
  return request({
    url: ''
  })
}

export function getMemberListComments(member_id, params) {
  return request({
    url: ''
  })
}

/**
 * 获取会员咨询列表
 * @param params
 */
export function getMemberAsks(params) {
  return request({
    url: 'member/asks',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除会员咨询
 * @param ask_id
 */
export function deleteMemberAsk(ask_id) {
  return request({
    url: `member/asks/${ask_id}`,
    method: 'delete'
  })
}

/**
 * 获取会员评论列表
 * @param params
 */
export function getMemberComments(params) {
  return request({
    url: 'member/comments',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除会员评论
 * @param comment_id
 */
export function deleteMemberComments(comment_id) {
  return request({
    url: `member/comments/${comment_id}`,
    method: 'delete'
  })
}
