/**
 * Created by andste.cc@gmail.com on 2018/7/20.
 * 收款单相关
 */

import request from '@/utils/request'

/**
 * 获取收款单列表
 * @param params
 */
export function getCollectionList(params) {
  return request({
    url: 'trade/orders/pay-log',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 导出收款单
 * @param params
 */
export function exportCollection(params) {
  params = JSON.parse(JSON.stringify(params))
  params.page_size = 9999999
  return request({
    url: 'rade/orders/pay-log',
    method: 'get',
    params
  })
}
