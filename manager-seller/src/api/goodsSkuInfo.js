import request from '@/utils/request'

/**
 * 根据分类id 获取规格信息
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function getCategorySkuList(category_id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/categories/${category_id}/specs`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存商家自定义某分类的规格项
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveCustomSkuItem(category_id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/categories/${category_id}/specs`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存商家自定义某规格的规格值
 * @param spec_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveCustomSkuValue(spec_id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/specs/${spec_id}/values`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
