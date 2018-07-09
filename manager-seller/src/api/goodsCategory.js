import request from '@/utils/request'

/**
 * 获取店铺分组列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryList() {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/cats',
      method: 'get',
      loading: false
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 删除 商品分组
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function deleteGoodsCategory(params) {
  const ids = params.toString()
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/cats/${ids}`,
      method: 'delete'
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 商品分组 添加
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function addGoodsCategory(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/cats',
      method: 'post',
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 商品分组 编辑
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function updateGoodsCategory(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/cats/${ids}`,
      method: 'put',
      data: params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 发布商品 查询商品品类 分级查询（商城商品品类）
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryLevelList(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/goods/category/${ids}/children`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

