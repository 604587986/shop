/**
 * 首页商家商城基本信息API
 */

import request from '@/utils/request'

/**
 * 获取首页统计信息
 * @returns {Promise<any>}
 */
export function getDashboardData() {
  return request({
    url: '/statistics/dashboard/shop',
    method: 'get',
    loading: false
  })
}

/**
 * 获取商城公告
 * @param params
 * @returns {Promise<any>}
 */
export function getNotice(type, params) {
  return request({
    url: `${process.env.BASE_API}/pages/article-categories/${type}/articles`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取首页平台联系方式
 * @param params
 * @returns {Promise<any>}
 */
export function getConcate(params) {
  return request({
    url: `${process.env.BASE_API}/pages/articles`,
    method: 'get',
    loading: false,
    params
  })
}

