/**
 * 组件相关API
 */

import request from '@/utils/request'
import ComponentModel from '@/models/ComponentModel'

/**
 * 获取组件列表
 * @param params
 * @returns {Promise<any>}
 */
export function getComponentList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/component/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ComponentModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 启用组件
 * @param code
 * @returns {Promise<any>}
 */
export function enabledComponent(code) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/component/start.do',
      method: 'get',
      params: { componentid: code }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 停用组件
 * @param code
 * @returns {Promise<any>}
 */
export function disabledComponent(code) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/component/stop.do',
      method: 'get',
      params: { componentid: code }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 安装组件
 * @param code
 * @returns {Promise<any>}
 */
export function installComponent(code) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/component/install.do',
      method: 'get',
      params: { componentid: code }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 卸载组件
 * @param code
 * @returns {Promise<any>}
 */
export function uninstallComponent(code) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/component/un-install.do',
      method: 'get',
      params: { componentid: code }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
