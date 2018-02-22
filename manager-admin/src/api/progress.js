/**
 * 进度相关API
 */

import request from '@/utils/request'
import ProgressModel from '@/models/ProgressModel'

/**
 * 查看是否有相同任务正在进行
 * @param id
 * @returns {Promise<any>}
 */
export function hasSameTask(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/progress/has-task.do',
      method: 'get',
      loading: false,
      params: { progressid: id }
    }).then(response => {
      response.data.has_task = response.data.hastask
      resolve(response)
    }).catch(error => reject(error))
  })
}
/**
 * 获取进度条
 * @param id
 * @returns {Promise<any>}
 */
export function getProgressById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/progress/view-progress.do',
      method: 'get',
      loading: false,
      params: { progressid: id }
    }).then(response => {
      const _response = response
      _response.data = new ProgressModel().map(response.data)
      switch (_response.data.status) {
        case 'ing':
          _response.data.status = 'doing'
          break
        case 'complete':
          _response.data.status = 'success'
          break
        case '':
          _response.data.status = 'exception'
          break
      }
      resolve(_response)
    }).catch(error => reject(error))
  })
}
