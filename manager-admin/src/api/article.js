/**
 * 文章相关API
 */

import request from '@/utils/request'

/**
 * 获取文章分类子项
 * @param id
 */
export function getArticleCategoryChildren(id = 0) {
  return request({
    url: `pages/article-categories/${id}/children`,
    method: 'get'
  })
}

/**
 * 添加文章分类
 * @param params
 */
export function addArticleCategory(params) {
  return request({
    url: 'pages/article-categories',
    method: 'post',
    data: params
  })
}

/**
 * 获取文章分类详情
 * @param id
 */
export function getArticleCategoryDetail(id) {
  return request({
    url: `pages/article-categories/${id}`,
    method: 'get'
  })
}

/**
 * 编辑文章分类
 * @param id
 * @param params
 */
export function editArticleCategory(id, params) {
  return request({
    url: `pages/article-categories/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除文章分类列表
 * @param id
 */
export function deleteAritcleCategory(id) {
  return request({
    url: `pages/article-categories/${id}`,
    method: 'delete'
  })
}

/**
 * 获取模型字段列表
 * @param id
 * @returns {Promise<any>}
 */
export function getArticleFieldList(id) {
  return request({
    url: 'cms/admin/model/file-list-json.do',
    method: 'get',
    loading: false,
    params: { modelid: id }
  })
}
