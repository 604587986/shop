/**
 * 规格管理API
 */

import request from '@/utils/request'
import SpecModel from '@/models/SpecModel'
const specModel = new SpecModel()

/**
 * 获取规格列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSpecs(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/specs',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = specModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加规格
 * @param params
 * @returns {*}
 */
export function addSpec(params) {
  const _params = {
    spec_name: params.name,
    spec_memo: params.memo
  }
  return request({
    url: 'goods/specs',
    method: 'post',
    data: specModel.params(params)
  })
}

/**
 * 编辑规格
 * @param id
 * @param params
 * @returns {*}
 */
export function eidtSpec(id, params) {
  return request({
    url: `goods/specs/${id}`,
    method: 'put',
    data: specModel.params(params)
  })
}

/**
 * 删除规格
 * @param ids
 * @returns {*}
 */
export function deleteSpecs(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `goods/specs/${ids}`,
    method: 'delete'
  })
}

/**
 * 获取规格值
 * @param spec_id 规格ID
 * @returns {*}
 */
export function getSpecValues(spec_id) {
  return request({
    url: `goods/specs/${spec_id}/values`,
    method: 'get'
  })
}

/**
 * 保存规格值
 * @param spec_id
 * @param value_list
 * @returns {Promise<any>}
 */
export function saveSpecValues(spec_id, value_list) {
  return request({
    url: `goods/specs/${spec_id}/values`,
    method: 'post',
    data: { value_list }
  })
}
