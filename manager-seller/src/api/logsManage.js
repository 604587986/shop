/**
 * 日志相关API
 */

import request from '@/utils/request'
import * as LogsManageModel from '@/models/LogsManageModel'

/**
 * 获取日志列表
 * @param params
 * @returns {Promise<any>}
 */
export function getLogsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/logs/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new LogsManageModel.Logs().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
