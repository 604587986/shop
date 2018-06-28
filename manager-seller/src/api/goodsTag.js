import request from '@/utils/request'

/**
 * 获取标签列表
 * @param params
 * @returns {Promise<any>}
 */
export function getTagsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/goods/tags',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 获取标签商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getTagGoodsList(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/tags/${id}/goods`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 保存标签商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function saveTagGoodsList(tag_id, goods_ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/tags/${tag_id}/goods/${goods_ids}`,
      method: 'put',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}
