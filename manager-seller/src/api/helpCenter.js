/**
 * 帮助中心相关API
 */

import request from '@/utils/request'
import HelpCenterCategoryModel from '@/models/HelpCenterCategoryModel'
import HelpArticleModel from '@/models/HelpArticleModel'

/**
 * 获取帮助中心分类
 * @returns {Promise<any>}
 */
export function getHelpCenterCategory() {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/cat/list-json-help.do',
      method: 'get',
      loading: false
    }).then(response => {
      const _response = response
      _response.data = new HelpCenterCategoryModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取帮助中心文章列表
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getHelpArticleList(id, params) {
  params.catid = id
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/data/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new HelpArticleModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

