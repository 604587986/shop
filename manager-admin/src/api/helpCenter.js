/**
 * 帮助中心相关API
 */

import request from '@/utils/request'

/**
 * 获取帮助中心分类
 */
export function getHelpCenterCategory() {
  return request({
    url: 'cms/admin/cat/list-json-help.do',
    method: 'get',
    loading: false
  })
}

/**
 * 获取帮助中心文章列表
 * @param id
 * @param params
 */
export function getHelpArticleList(id, params) {
  return request({
    url: 'cms/admin/data/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

