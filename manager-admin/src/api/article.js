/**
 * 文章相关API
 */

import request from '@/utils/request'
import * as ArticleModel from '@/models/ArticleModel'

/**
 * 获取文章模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getArticleModelList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/model/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ArticleModel.Article().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加文章模型
 * @param params
 * @returns {Promise<any>}
 */
export function addArticleModel(params) {
  const _params = {
    china_name: params.name,
    english_name: params.table_name,
    brief: params.brief
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/model/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除文章模型
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteArticleModel(ids) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/model/check.do',
      method: 'post',
      params: { modelid: ids }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取模型字段列表
 * @param id
 * @returns {Promise<any>}
 */
export function getArticleFieldList(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/model/file-list-json.do',
      method: 'get',
      loading: false,
      params: { modelid: id }
    }).then(response => {
      const _response = response
      _response.data = new ArticleModel.ArticleField().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
