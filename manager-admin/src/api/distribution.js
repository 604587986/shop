/**
 * 分销相关API
 */

import request from '@/utils/request'

/**
 * 获取个人提成模板列表
 * @param params
 */
export function getPerAccomplishmentTpl(params) {
  return request({
    url: 'admin/distribution/commission-tpl',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加提成模板
 * @param params
 */
export function addPerTpl(params) {
  return request({
    url: 'admin/distribution/commission-tpl',
    method: 'post',
    loading: false,
    params
  })
}

/**
 * 修改提成模板
 * @param params
 */
export function editPerTpl(params) {
  return request({
    url: `admin/distribution/commission-tpl/${params.id}`,
    method: 'put',
    loading: false,
    params
  })
}

/**
 * 删除提成模板
 * @param id
 */
export function delPerTpl(id) {
  return request({
    url: `admin/distribution/commission-tpl/${id}`,
    method: 'delete',
    loading: false
  })
}

/**
 * 获取提成模板
 * @param id
 */
export function getPerTpl(id) {
  return request({
    url: `admin/distribution/commission-tpl/${id}`,
    method: 'get',
    loading: false
  })
}

/**
 * 获取分销模板升级日志
 */
export function getUpgradeLogs(params) {
  return request({
    url: 'admin/distribution/upgradelog',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 业绩列表
 * @param params
 */
export function getAchievementList(params) {
  return request({
    url: 'admin/distribution/bill/total',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取提现设置
 * @param params
 */
export function getWithDrawSettings() {
  return request({
    url: 'admin/distribution/settings',
    method: 'get',
    loading: false
  })
}

/**
 * 保存提现设置
 * @param params
 */
export function reserveWithDrawSettings(params) {
  return request({
    url: 'admin/distribution/settings',
    method: 'put',
    loading: false,
    params
  })
}

