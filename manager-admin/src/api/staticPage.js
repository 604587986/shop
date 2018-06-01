/**
 * 静态页相关API
 */

import request from '@/utils/request'

/**
 * 获取静态页生成地址
 */
export function getStaticPageAddress() {
  return request({
    url: 'page-create/input',
    method: 'get'
  })
}

/**
 * 保存静态页生成地址
 * @param address
 */
export function saveStaticPageAddress(address) {
  return request({
    url: 'page-create/save',
    method: 'post',
    data: { address }
  })
}

/**
 * 生成静态页
 * @param params
 */
export function createStaticPage(params) {
  return request({
    url: `page-create/create`,
    method: 'post',
    data: params
  })
}
