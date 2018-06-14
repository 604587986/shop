/**
 * 文章相关API
 */

import request from '@/utils/request'

/**
 * 获取文章模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getArticleModelList(params) {
  return request({
    url: 'cms/admin/model/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加文章模型
 * @param params
 * @returns {Promise<any>}
 */
export function addArticleModel(params) {
  return request({
    url: 'cms/admin/model/save-add.do',
    method: 'post',
    data: params
  })
}

/**
 * 删除文章模型
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteArticleModel(ids) {
  return request({
    url: 'cms/admin/model/check.do',
    method: 'post',
    params: { modelid: ids }
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
