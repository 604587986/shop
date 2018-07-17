/**
 * 区域分析API
 */

import request from '@/utils/request'

/**
 * 区域分析列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRegionalAnalysisList(params) {
  return request({
    url: '/statistics/reports/regions/data',
    method: 'get',
    loading: false,
    params
  })
}

