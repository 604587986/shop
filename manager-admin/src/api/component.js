/**
 * 组件相关API
 */

import request from '@/utils/request'

/**
 * 获取组件列表
 * @param params
 */
export function getComponentList(params) {
  return request({
    url: 'core/admin/component/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 启用组件
 * @param code
 */
export function enabledComponent(code) {
  return request({
    url: 'core/admin/component/start.do',
    method: 'get',
    params: { componentid: code }
  })
}

/**
 * 停用组件
 * @param code
 */
export function disabledComponent(code) {
  return request({
    url: 'core/admin/component/stop.do',
    method: 'get',
    params: { componentid: code }
  })
}

/**
 * 安装组件
 * @param code
 */
export function installComponent(code) {
  return request({
    url: 'core/admin/component/install.do',
    method: 'get',
    params: { componentid: code }
  })
}

/**
 * 卸载组件
 * @param code
 */
export function uninstallComponent(code) {
  return request({
    url: 'core/admin/component/un-install.do',
    method: 'get',
    params: { componentid: code }
  })
}
