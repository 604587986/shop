/**
 * 静态页相关API
 */

import request from '@/utils/request'

/**
 * 保存静态页生成地址
 * @param address
 * @returns {Promise<any>}
 */
export function saveStaticPageAddress(address) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/page-create/save.do',
      method: 'post',
      params: { address }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 生成静态页
 * @param params
 * @returns {Promise<any>}
 */
export function createStaticPage(params) {
  // const _formData = new FormData()
  // params.forEach(item => _formData.append('choose_pages', item))
  let qs = ''
  params.forEach(item => {
    qs += `&choose_pages=${item}`
  })
  qs = qs.replace(/&/, '?')
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/page-create/create.do${qs}`,
      method: 'get'
      // data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
